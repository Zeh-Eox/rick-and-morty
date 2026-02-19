import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { EpisodesService } from '../../services/episodes.service';
import { Episode, EpisodeModel } from '../../models/episode.model';
import { CommonModule } from '@angular/common';
import { Pagination } from '../../shared/pagination/pagination';
import { LoaderComponent } from "../../shared/loader-component/loader-component";
import { ErrorComponent } from '../../shared/error-component/error-component';
import { EpisodeCard } from '../../shared/episode-card/episode-card';

@Component({
  selector: 'app-episodes',
  imports: [CommonModule, Pagination, LoaderComponent, ErrorComponent, EpisodeCard],
  templateUrl: './episodes.html',
  styleUrl: './episodes.scss',
})
export class Episodes implements OnInit {
  private episodesService = inject(EpisodesService);

  allEpisodes = signal<Episode[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  selectedSeason = signal<boolean>(false);

  seasons = signal<number[]>([]);

  getSeasonNumber(episodeCode: string): number {
    const match = episodeCode.match(/S(\d+)/i);
    return match ? parseInt(match[1], 10) : 0;
  }

  selectSeason(value: string): void {
    if(value == "") {
      this.getEpisodes();
      this.selectedSeason.set(false);
      return;
    }
    this.selectedSeason.set(true);
    this.allEpisodes.set(this.episodesService.filterSeason(parseInt(value)));
  }

  ngOnInit(): void {
    this.episodesService.getAllEpisodes();
    this.seasons = this.episodesService.seasons;
    this.getEpisodes();
  }

  getEpisodes(): void {
    this.loading.set(true);
    this.error.set(null);

    this.episodesService.getEpisodes(this.currentPage()).subscribe({
      next: (data) => {
        this.allEpisodes.set(data.results);
        this.totalPages.set(data.info.pages);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Erreur lors du chargement des épisodes.');
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.getEpisodes();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
