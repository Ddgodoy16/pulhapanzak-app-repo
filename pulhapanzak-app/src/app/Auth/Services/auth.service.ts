import { inject, Injectable } from '@angular/core';
import { LoginDto } from '../Models/login.dto';
import { UserDto } from '../Models/user.dto';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  UserCredential,
  sendPasswordResetEmail,
  } from '@angular/fire/auth';
  import {
    CollectionReference,
    Firestore,
    collection,
    doc,
    DocumentReference,
    setDoc,
    getDoc,
   
  } from '@angular/fire/firestore';

  const PATH: string = 'users';

  @Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    private _auth: Auth = inject(Auth);
    private _firestore: Firestore = inject(Firestore);
    private _collection: CollectionReference = collection(this._firestore, PATH);
  
    async isUserLoggued(): Promise<boolean> {
      return new Promise<boolean>((resolve) => {
        this._auth.onAuthStateChanged((user: User | null) => {
          console.log('user ->', user);
          if (user) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    }
  
    private async getCurrentUser(): Promise<User | null> {
      return new Promise<User | null>((resolve) => {
        this._auth.onAuthStateChanged((user: User | null) => {
          console.log('user ->', user);
          if (user) {
            resolve(user);
          } else {
            resolve(null);
          }
        });
      });
    }
  
    async login(model: LoginDto): Promise<UserCredential> {
      const isUserLoggued: boolean = await this.isUserLoggued();
      if (isUserLoggued) return Promise.reject('User is loggued');
  
      return await signInWithEmailAndPassword(
        this._auth,
        model.email,
        model.password
      );
    }
  
    async signUp(model: LoginDto): Promise<UserCredential> {
      const isUserLoggued: boolean = await this.isUserLoggued();
      if (isUserLoggued) return Promise.reject('User is loggued');
  
      return await createUserWithEmailAndPassword(
        this._auth,
        model.email,
        model.password
      );
    }
  
    async signOut(): Promise<void> {
      const isUserLoggued: boolean = await this.isUserLoggued();
      if (isUserLoggued) {
        return await this._auth.signOut();
      }
  
      return Promise.reject('User not found');
    }



  // Método para enviar un correo de restablecimiento de contraseña
  async resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this._auth, email);
  }

  // Método para crear un usuario en Firestore con un UID específico
  async createUserInFirestore(user: UserDto): Promise<void> {
    const docRef: DocumentReference = doc(this._collection, user.uid);
    console.log(docRef)
    console.log({
      name: user.name,
      apellido: user.apellido,
      dni: user.dni,
      phone: user.phone,
      email: user.email,
      photo: '',
      uid: docRef.id, 
      isActive: true,
    })
    
    await setDoc(docRef, {
        name: user.name,
        apellido: user.apellido,
        dni: user.dni,
        phone: user.phone,
        email: user.email,
        photo: '',
        uid: docRef.id, 
        isActive: true,
      });
  }

  

  // Método para crear un usuario en Firestore con un UID generado por Firestore
  async createUser(user: UserDto): Promise<void> {
    const docRef: DocumentReference = doc(this._collection);
    await setDoc(docRef, {
      name: user.name,
      apellido: user.apellido,
      dni: user.dni,
      phone: user.phone,
      email: user.email,
      photo: '',
      uid: docRef.id,
      isActive: true,
    });
  }

  async getUserById(): Promise<UserDto | null> {
    try {
      const user = await this.getCurrentUser();
      const docRef = doc(this._firestore, PATH, user?.uid ?? '');
      const userSnapshot = await getDoc(docRef);
      if (userSnapshot.exists()) {
        return userSnapshot.data() as UserDto;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}
