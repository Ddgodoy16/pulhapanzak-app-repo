import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';   


export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<Character[]>   
 {
    return this.http.get<Character[]>(this.apiUrl);   

  }
}