import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Game } from 'src/models/Game';

@Component({
  selector: 'app-special-game-view',
  templateUrl: './special-game-view.component.html',
  styleUrls: ['./special-game-view.component.scss'],
})
export class SpecialGameViewComponent implements OnInit {

  @Input() title: string;
  @Input() game: Game;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  openGame(game: Game) {
    this.router.navigate([environment.routes.home_game, game.id]);
  }
}
