import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

import { addIcons } from 'ionicons';
import {
  lockClosedOutline,
  callOutline,
  cardOutline,
  personCircleOutline,
  mailOutline,
} from 'ionicons/icons';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonText,
  IonIcon,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonSpinner,
  
  IonTitle,
  IonToolbar,
  ToastController,
} from '@ionic/angular/standalone';
import { UserDto } from '../../Models/user.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonText,
    IonIcon,
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonNote,
    IonSpinner,
    IonTitle,
    IonToolbar,
    ReactiveFormsModule,
    IonIcon,
  ],
})
export class RegisterPage {
  constructor() {
    addIcons({
      mailOutline,
      personCircleOutline,
      lockClosedOutline,
      cardOutline,
      callOutline,
    });
  }
  
  private _authService: AuthService = inject(AuthService);

   private formBuilder: FormBuilder = inject(FormBuilder);
  private _router: Router = inject(Router);
  private _toastController: ToastController = inject(ToastController);
  disabled: boolean = false;
  registerForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    dni: ['', [Validators.required]], 
    phone: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  
  spinner: boolean = false;

  get isNameRequired(): boolean {
    const control: AbstractControl | null = this.registerForm.get('name');
    return control ? control.hasError('required') && control.touched : false;
  }
  get isApellidoRequired(): boolean {
    const control: AbstractControl | null = this.registerForm.get('apellido');
    return control ? control.hasError('required') && control.touched : false;
  }
  get isDniRequired(): boolean {
    const control: AbstractControl | null = this.registerForm.get('dni');
    return control ? control.hasError('required') && control.touched : false;
  }

  get isPhoneRequired(): boolean {
    const control: AbstractControl | null = this.registerForm.get('phone');
    return control ? control.hasError('required') && control.touched : false;
  }


  get isPhoneMinLegthError(): boolean {
    const control: AbstractControl | null = this.registerForm.get('phone');
    return control ? control.hasError('minlength') && control.touched : false;
  }

  get isEmailInvalid(): boolean {
    const control: AbstractControl | null = this.registerForm.get('email');
    return control ? control.hasError('email') && control.touched : false;
  }

  get isEmailRequired(): boolean {
    const control: AbstractControl | null = this.registerForm.get('email');
    return control ? control.hasError('required') && control.touched : false;
  }

  get isPasswordRequired(): boolean {
    const control: AbstractControl | null = this.registerForm.get('password');
    return control ? control.invalid && control.touched : false;
  }

  get isFormInvalid(): boolean {
    return this.registerForm.invalid;
  }

  onSubmit(): void {
    if (!this.isFormInvalid) {
      this.disabled = true;
      this.spinner = true;
      let newUser: UserDto = this.registerForm.value as UserDto;

      this._authService
        .signUp(newUser)
        .then(async (result) => {
          newUser.uid = result.user.uid;

          await this._authService
            .createUserInFirestore(newUser)
            .then(async () => {
              this.spinner = false;
              this.disabled = false;
              await this.showAlert('User created successfully');
              this._router.navigate(['/tabs/home']);
              this.resetForm();
            });
        })
        .catch(async (error) => {
          console.error(error);
          this.spinner = false;
          this.disabled = false;
          await this.showAlert(
            'Ha ocurrido un error, vuelva a intentarlo',
            true
          );
        });
    }
  }
    resetForm(): void {
    this.registerForm.reset();
  }
  goTologin(): void {
    this._router.navigate(['/login']);
  }

  async showAlert(message: string, isError: boolean = false): Promise<void> {
    const toast = await this._toastController.create({
      message: message,
      duration: 2000,
      color: isError ? 'danger' : 'success',
    });
    toast.present();
  }
}
