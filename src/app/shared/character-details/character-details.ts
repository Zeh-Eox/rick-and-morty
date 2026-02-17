import { Component, inject, OnInit, signal } from '@angular/core';
import { Characters } from '../../services/characters.service';
import { CharacterModel } from '../../models/character.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-character-details',
  imports: [],
  templateUrl: './character-details.html',
  styleUrl: './character-details.scss',
})
export class CharacterDetails implements OnInit {
  private charactersService = inject(Characters);
  private route = inject(ActivatedRoute);

  character = signal<CharacterModel['results'][0] | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id') ? parseInt(params.get('id')!, 10) : null;
      if (id) {
        this.fetchCharacterDetails(id);
      }
    });
  }

  fetchCharacterDetails(id: number): void {
    this.loading.set(true);
    this.error.set(null);
    this.charactersService.getCharacter(id).subscribe({
      next: (character) => {
        this.character.set(character as any);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load character details. Please try again.');
        this.loading.set(false);
      },
    });
  }

  goBack(): void {
    window.history.back();
  }
}
