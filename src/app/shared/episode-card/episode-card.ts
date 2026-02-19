import { Component, Input } from '@angular/core';
import { Episode } from '../../models/episode.model';

@Component({
  selector: 'app-episode-card',
  imports: [],
  templateUrl: './episode-card.html',
  styleUrl: './episode-card.scss',
})
export class EpisodeCard {
  @Input() episode!: Episode;
}
