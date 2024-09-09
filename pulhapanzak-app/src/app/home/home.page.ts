import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../Auth/Services/auth.service';
import { Router } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  ToastController,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar],
})
export class HomePage implements OnInit {
  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  private _toastController: ToastController = inject(ToastController);

  async ngOnInit(): Promise<void> {
    await this._authService
      .getUserById()
      .then(async (user) => {
        console.log('user ->', user);
      })
      .catch(async () => await this.showAlert('Ha ocurrido un error', true));

    }
    async logOut(): Promise<void> {
      await this._authService
        .signOut()
        .then(async () => {
          this._router.navigate(['/login']);
          await this.showAlert(
            'Ha cerrado sesión correctamente, te esperamos pronto'
          );
        })
        .catch(async () => {
          await this.showAlert('Ha ocurrido un error', true);
        });
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
