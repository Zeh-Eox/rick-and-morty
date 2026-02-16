import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/characters/characters').then(m => m.Characters)
  },
  {
    path: 'character/:id',
    loadComponent: () => import('./components/character-details/character-details').then(m => m.CharacterDetails)
  }, 
];
