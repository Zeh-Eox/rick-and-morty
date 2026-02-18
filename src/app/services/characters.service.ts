import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Character, CharacterModel } from '../models/character.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getCharacters(page: number = 1) {
    return this.httpClient.get<CharacterModel>(`${this.apiUrl}/character?page=${page}`);
  }

  getCharacter(id: number) {
    return this.httpClient.get<Character>(`${this.apiUrl}/character/${id}`);
  }

  getCharactersByName(name: string) {
    return this.httpClient.get<CharacterModel>(`${this.apiUrl}/character?name=${name}`);
  }

  getCharactersByStatus(status: string) {
    return this.httpClient.get<CharacterModel>(`${this.apiUrl}/character?status=${status}`);
  }

  getCharactersBySpecies(species: string) {
    return this.httpClient.get<CharacterModel>(`${this.apiUrl}/character?species=${species}`);
  }

  getCharactersByGender(gender: string) {
    return this.httpClient.get<CharacterModel>(`${this.apiUrl}/character?gender=${gender}`);
  }
}