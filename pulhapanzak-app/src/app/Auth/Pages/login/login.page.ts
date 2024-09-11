import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginDto } from '../../Models/login.dto';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonLabel,
  IonNote,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  ToastController, IonButtons, IonBackButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, 
    CommonModule,
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonInputPasswordToggle,
    IonItem,
    IonLabel,
    IonNote,
    IonSpinner,
    IonTitle,
    IonToolbar,
    ReactiveFormsModule,
    IonText,
  ],
})
export class LoginPage {
  private _authService: AuthService = inject(AuthService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private _router: Router = inject(Router);
  private _toastController: ToastController = inject(ToastController);
  disabled: boolean = false;
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  spinner: boolean = false;

  get isEmailInvalid(): boolean {
    const control: AbstractControl | null = this.loginForm.get('email');
    return control ? control.hasError('email') && control.touched : false;
  }

  get isEmailRequired(): boolean {
    const control: AbstractControl | null = this.loginForm.get('email');
    return control ? control.hasError('required') && control.touched : false;
  }

  get isPasswordRequired(): boolean {
    const control: AbstractControl | null = this.loginForm.get('password');
    return control ? control.invalid && control.touched : false;
  }

  get isFormInvalid(): boolean {
    return this.loginForm.invalid;
  }

  onSubmit(): void {
    if (!this.isFormInvalid) {
      this.disabled = true;
      this.spinner = true;
      const login: LoginDto = this.loginForm.value as LoginDto;

      this._authService
        .login(login)
        .then(async () => {
          this.spinner = false;
          this.disabled = false;
          await this.showAlert('Login successful');
          this._router.navigate(['tabs/home']);
          this.resetForm();
        })
        .catch(async (error) => {
          console.error(error);
          this.spinner = false;
          this.disabled = false;
          await this.showAlert('Invalid email or password', true);
        });
    }
  }
  

  resetForm(): void {
    this.loginForm.reset();
  }
  async showAlert(message: string, isError: boolean = false): Promise<void> {
    const toast = await this._toastController.create({
      message: message,
      duration: 2000,
      color: isError ? 'danger' : 'success',
    });
    toast.present();
  }

   goToRegister(): void {
    this._router.navigate(['/register']);
  }

   async onForgotPassword(): Promise<void> {
    const email = this.loginForm.get('email')?.value;

    if (!email) {
      await this.showAlert('Por favor, ingresa tu correo electrónico', true);
      return;
    }

    try {
      await this._authService.resetPassword(email);
      await this.showAlert('Correo de restablecimiento enviado. Revisa tu bandeja de entrada.');
    } catch (error) {
      console.error(error);
      await this.showAlert('Error al enviar el correo de restablecimiento', true);
    }
  }
}
