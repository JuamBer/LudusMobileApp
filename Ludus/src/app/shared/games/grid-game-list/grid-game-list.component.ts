import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Game } from 'src/models/Game';

@Component({
  selector: 'app-grid-game-list',
  templateUrl: './grid-game-list.component.html',
  styleUrls: ['./grid-game-list.component.scss'],
})
export class GridGameListComponent implements OnInit {

  @Input() title: string;
  @Input() ids_games: string[] = [];

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

  openGame(game: Game) {
    this.router.navigate([environment.routes.home_game, game.id]);
  }
}
