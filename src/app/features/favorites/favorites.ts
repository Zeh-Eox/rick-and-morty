import { Component, inject, signal, effect } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { Characters } from '../../services/characters.service';
import { Character } from '../../models/character.model';
import { LoaderComponent } from '../../shared/loader-component/loader-component';
import { CharacterCard } from '../../shared/character-card/character-card';

@Component({
  selector: 'app-favorites',
  imports: [LoaderComponent, CharacterCard],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class Favorites {
  private favoritesService = inject(FavoritesService);
  private charactersService = inject(Characters);

  noFavorites = signal<string>("Aucun Personnage Favori Pour Le Moment.");

  favoritesCharacters = signal<Character[]>([]);
  loading = signal<boolean>(false);

  constructor() {
    effect(() => {
      const favoriteIds = this.favoritesService.favorites();
      this.loadFavoritesCharacters(favoriteIds);
    });
  }

  loadFavoritesCharacters(ids: number[]) {
    this.favoritesCharacters.set([]);

    if (ids.length === 0) {
      return;
    }

    this.loading.set(true);

    ids.forEach((id) => {
      this.charactersService.getCharacter(id).subscribe((character) => {
        this.favoritesCharacters.update((chars) => [...chars, character]);
        this.loading.set(false);
      });
    });
  }
}
