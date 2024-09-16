import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthService } from './Auth/Services/auth.service';
import { DeviceDto } from './Auth/Models/device.dto';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private userId: string | null = null;

  ngOnInit(): void {
    this.authService.getCurrentUserId().then((userId: string | null) => {
      this.userId = userId;
      this.initizalizePushNotifications();
    });
  }

  initizalizePushNotifications(): void {
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      if (this.userId) {
        const device: DeviceDto = {
          userId: this.userId,
          deviceId: token.value,
        };
        this.authService.createDevice(device);
      }
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('pushNotificationReceived ->', notification);
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('pushNotificationActionPerformed ->', notification);
      }
    );
  }
}
