import { Component, inject, OnInit, signal } from '@angular/core';
import { Characters as CharactersService } from '../../services/characters.service';
import { CharacterModel } from '../../models/character.model';
import { LoaderComponent } from '../../shared/loader-component/loader-component';
import { ErrorComponent } from '../../shared/error-component/error-component';
import { CharacterCard } from '../../shared/character-card/character-card';

@Component({
  selector: 'app-characters',
  imports: [LoaderComponent, ErrorComponent, CharacterCard],
  templateUrl: './characters.html',
  styleUrl: './characters.scss',
})
export class Characters implements OnInit {
  private charactersService = inject(CharactersService);

  characters = signal<CharacterModel['results']>([]);
  selectedCharacter = signal<CharacterModel['results'][0] | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  
  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    this.loading.set(true);
    this.error.set(null);

    this.charactersService.getCharacters(this.currentPage()).subscribe({
      next: (data) => {
        this.characters.set(data.results);
        this.totalPages.set(data.info.pages);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Erreur lors du chargement des personnages.');
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  onSearch(event: Event): void {
    const name = (event.target as HTMLInputElement).value.trim();

    if(!name) {
      this.getCharacters();
      return;
    }

    this.loading.set(true);

    this.charactersService.getCharactersByName(name).subscribe({
      next: (data) => {
        this.characters.set(data.results);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Aucun personnage trouvé avec ce nom.');
        this.characters.set([]);
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
      this.getCharacters();

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((p) => p - 1);
      this.getCharacters();

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
