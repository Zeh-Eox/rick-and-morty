import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CharacterModel } from '../models/character.model';

@Injectable({
  providedIn: 'root',
})
export class Characters {
  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getCharacters(page: number = 1) {
    return this.httpClient.get<CharacterModel>(`${this.apiUrl}/character?page=${page}`);
  }

  getCharacter(id: number) {
    return this.httpClient.get<CharacterModel>(`${this.apiUrl}/character/${id}`);
  }

  getCharactersByName(name: string) {
    return this.httpClient.get<CharacterModel>(`${this.apiUrl}/character?name=${name}`);
  }
}