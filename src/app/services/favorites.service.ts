import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private storageKey = "favoriteCharacters";
  private favoritesSignal = signal<number[]>(this.loadFavorites());
  favorites = this.favoritesSignal.asReadonly();

  toggleFavorite(id: number): void {
    const current = this.favoritesSignal();

    if (current.includes(id)) {
      const updated = current.filter(favId => favId !== id);
      this.updateStorage(updated);
    } else {
      const updated = [...current, id];
      this.updateStorage(updated);
    }
  }

  isFavorite(id: number): boolean {
    return this.favoritesSignal().includes(id);
  }

  private updateStorage(data: number[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
    this.favoritesSignal.set(data);
  }

  private loadFavorites(): number[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }
}