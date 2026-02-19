import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Episode, EpisodeModel } from "../models/episode.model";
import { EMPTY, forkJoin, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {
  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private allEpisodes = signal<Episode[]>([]);
  seasons = signal<number[]>([]);

  getEpisodes(page: number = 1) {
    return this.httpClient.get<EpisodeModel>(`${this.apiUrl}/episode?page=${page}`);
  }

  getEpisode(id: number) {
    return this.httpClient.get<Episode>(`${this.apiUrl}/episode/${id}`);
  }

  getAllEpisodes(): void {
  this.getEpisodes(1).pipe(
    switchMap((res) => {
      // Seed with page 1 results
      this.allEpisodes.update((list) => [...list, ...res.results]);

      const totalPages = res.info.pages;

      if (totalPages <= 1) return EMPTY;

      // Build observables for pages 2..N and fetch in parallel
      const pageRequests = Array.from(
        { length: totalPages - 1 },
        (_, i) => this.getEpisodes(i + 2)
      );

      return forkJoin(pageRequests);
    })
  ).subscribe({
    next: (responses) => {
      // responses is an array of results from pages 2..N
      const allResults = responses.flatMap((res) => res.results);
      this.allEpisodes.update((list) => [...list, ...allResults]);

      this.numberOfSeasons()
    },
    error: (err) => console.error('Error fetching episodes:', err),
  });
}

  filterSeason(seasonNumber: number): Episode[] {
    return this.allEpisodes().filter(ep => {
      return ep.episode.startsWith(`S${seasonNumber.toString().padStart(2, '0')}`);
    });
  }

  numberOfSeasons() {
    const seasons = new Set(this.allEpisodes().map(ep => {
      const match = ep.episode.match(/S(\d+)/i);
      return match ? parseInt(match[1], 10) : null;
    })); 

    const seasonCount = seasons.size;
    this.seasons.set(Array.from({ length: seasonCount}, (_, i) => i + 1));
  }
}