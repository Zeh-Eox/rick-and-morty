import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { Character } from '../../models/character.model';
import { LoaderComponent } from '../../shared/loader-component/loader-component';
import { ErrorComponent } from '../../shared/error-component/error-component';
import { CharacterCard } from '../../shared/character-card/character-card';
import { Pagination } from '../../shared/pagination/pagination';

// Objet qui regroupe tous les filtres actifs
interface Filters {
  status: string;
  gender: string;
  species: string;
  name: string;
}

@Component({
  selector: 'app-characters',
  imports: [LoaderComponent, ErrorComponent, CharacterCard, Pagination],
  templateUrl: './characters.html',
  styleUrl: './characters.scss',
})
export class Characters implements OnInit {
  private charactersService = inject(CharactersService);

  characters = signal<Character[]>([]);
  selectedCharacter = signal<Character | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);

  // Filtres centralisés
  filters = signal<Filters>({ status: '', gender: '', species: '', name: '' });

  // Un filtre est actif si au moins un champ est renseigné
  isFilterActive = computed(() =>
    Object.values(this.filters()).some(v => v !== '')
  );

  ngOnInit(): void {
    this.fetchCharacters();
  }

  // Méthode unique qui appelle le service avec tous les filtres + page
  fetchCharacters(): void {
    this.loading.set(true);
    this.error.set(null);

    const { status, gender, species, name } = this.filters();

    this.charactersService
      .getCharacters(this.currentPage(), { status, gender, species, name })
      .subscribe({
        next: (data) => {
          this.characters.set(data.results);
          this.totalPages.set(data.info.pages);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Aucun personnage trouvé.');
          this.characters.set([]);
          this.totalPages.set(1);
          this.loading.set(false);
          console.error(err);
        },
      });
  }

  // Met à jour un filtre et relance depuis la page 1
  setFilter(key: keyof Filters, value: string): void {
    this.filters.update(f => ({ ...f, [key]: value }));
    this.currentPage.set(1);
    this.fetchCharacters();
  }

  onSearch(event: Event): void {
    const name = (event.target as HTMLInputElement).value.trim();
    this.setFilter('name', name);
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.fetchCharacters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  resetFilters(): void {
    this.filters.set({ status: '', gender: '', species: '', name: '' });
    this.currentPage.set(1);
    this.fetchCharacters();
  }
}