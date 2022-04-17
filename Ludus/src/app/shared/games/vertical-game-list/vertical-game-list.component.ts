import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Game } from 'src/models/Game';

@Component({
  selector: 'app-vertical-game-list',
  templateUrl: './vertical-game-list.component.html',
  styleUrls: ['./vertical-game-list.component.scss'],
})
export class VerticalGameListComponent implements OnInit {

  @Input() title: string;
  @Input() games: Game[] = [];

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

  openGame(game: Game) {
    this.router.navigate([environment.routes.home_game, game.id]);
  }
}