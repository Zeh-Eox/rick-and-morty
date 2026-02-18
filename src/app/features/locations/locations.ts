import { Component, inject, OnInit, signal } from '@angular/core';
import { LocationsService } from '../../services/locations.service';
import { Location } from '../../models/location.model';
import { LocationCard } from '../../shared/location-card/location-card';
import { LoaderComponent } from '../../shared/loader-component/loader-component';
import { ErrorComponent } from '../../shared/error-component/error-component';
import { Pagination } from "../../shared/pagination/pagination";

@Component({
  selector: 'app-locations',
  imports: [LocationCard, LoaderComponent, ErrorComponent, Pagination],
  templateUrl: './locations.html',
  styleUrl: './locations.scss',
})
export class Locations implements OnInit {
  private locationsService = inject(LocationsService);

  locations = signal<Location[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations(): void {
    this.loading.set(true);
    this.error.set(null);

    this.locationsService.getLocations(this.currentPage()).subscribe({
      next: (data) => {
        this.locations.set(data.results);
        this.totalPages.set(data.info.pages);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Erreur lors du chargement des lieux.');
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.getLocations();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
