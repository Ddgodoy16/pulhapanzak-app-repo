import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  imageOutline,
  personOutline,
} from 'ionicons/icons';
import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs, IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonTitle, IonToolbar, IonHeader, IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs],
})
export class TabsPage {
  constructor() {
    addIcons({
      homeOutline,
      imageOutline,
      personOutline,
    });
  }
}
