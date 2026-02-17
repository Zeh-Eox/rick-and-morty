import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-component',
  imports: [],
  templateUrl: './error-component.html',
  styleUrl: './error-component.scss',
})
export class ErrorComponent {
  @Input() message: string | null = null;
}
