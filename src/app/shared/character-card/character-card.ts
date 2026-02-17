import { Component, inject, Input, signal } from '@angular/core';
import { CharacterModel } from '../../models/character.model';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LucideAngularModule, Star } from 'lucide-angular';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-character-card',
  imports: [RouterLink, TranslatePipe, LucideAngularModule],
  templateUrl: './character-card.html',
  styleUrl: './character-card.scss',
})
export class CharacterCard {
  @Input() character!: CharacterModel['results'][0];
  @Input() selectedId: number | null = null;

  private favoritesService = inject(FavoritesService);

  readonly StarIcon = Star;
  isFavorite = () => this.favoritesService.isFavorite(this.character.id);

  toggleFavorite(): void {
    this.favoritesService.toggleFavorite(this.character.id);
  }
}
