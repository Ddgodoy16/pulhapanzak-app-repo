import { Injectable } from '@angular/core';
import { Gallery } from '../model/galery.dto';
import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private readonly PATH = 'galleries'; 
  private _collection = collection(this._firestore, this.PATH);

  constructor(private _firestore: Firestore) {}

   
    async getGalleryByQuery(): Promise<Gallery[]> {
      try {
      
        
        
  const galleryQuery = query(
          
          
  
   
  this._collection,
          
      
  
         
  
     
  where('active', '==', true), 
          
        
  where('createdBy', '==', 'Elvin Godoy'), 
          
          
  orderBy('createdAt', 'desc') 
        );
  
        const querySnapshot = await getDocs(galleryQuery);
  
        if (querySnapshot.empty) {
          
     
  console.log('No se encontró ninguna galería');
          
          
  return []; 
        }
  
       
        
        
  const galleries: Gallery[] = querySnapshot.docs.map(doc => doc.data() as Gallery);
        
       
  return galleries;
      } 
      
  catch (error) {
        console.error('Error al obtener galerías:', error);
        
      
  throw error;
      }
    }
  }