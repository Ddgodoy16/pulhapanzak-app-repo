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
  IonTabs,  IonToolbar, } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [ IonToolbar,  IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs],
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
