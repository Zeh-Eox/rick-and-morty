import { Component, Input } from '@angular/core';
import { Location } from '../../models/location.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-location-card',
  imports: [],
  templateUrl: './location-card.html',
  styleUrl: './location-card.scss',
})
export class LocationCard {
  @Input() location!: Location;
}
