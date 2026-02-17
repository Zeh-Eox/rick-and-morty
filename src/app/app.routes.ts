import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/characters/characters').then(m => m.Characters)
  },
  {
    path: 'character/:id',
    loadComponent: () => import('./shared/character-details/character-details').then(m => m.CharacterDetails)
  },
  {
    path: "favorites",
    loadComponent: () => import('./features/favorites/favorites').then(m => m.Favorites)
  } 
];
