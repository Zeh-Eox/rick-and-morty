import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  isOpen = signal<boolean>(false);

  toggleMenu(): void {
    this.isOpen.update(v => !v);
  }

  closeMenu(): void {
    this.isOpen.set(false);
  }
}