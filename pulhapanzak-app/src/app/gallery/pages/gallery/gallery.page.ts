import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { GalleryService } from '../../service/gallery.service';
import { Gallery } from '../../model/galery.dto';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  standalone: true,
  imports: [IonContent, IonGrid, IonRow, IonCol, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})



export class GalleryPage implements OnInit {
  public galleries: Gallery[] = []; 

  constructor(private galleryService: GalleryService) {}

  async ngOnInit() {
    await this.loadGallery();
  }

  async loadGallery() {
    try {
      const galleries = await this.galleryService.getGalleryByQuery();

      if (galleries.length > 0) {
        this.galleries = galleries; 
        console.log('Galerías encontradas:', galleries);

        
        galleries.forEach(gallery => {
          const photoUrl = gallery['photo'] || 'URL no disponible';
          console.log('URL de la foto:', photoUrl);
        });
      } else {
        console.log('No se encontró ninguna galería');
      }
    } catch (error) {
      console.error('Error al obtener las galerías:', error);
    }
  }
}