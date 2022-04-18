import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Filter } from 'src/models/Filter.moda';
import { Game } from 'src/models/Game';
//NGRX
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as gamesActions from 'src/app/state/games/games.actions';

@Component({
  selector: 'app-vertical-game-list',
  templateUrl: './vertical-game-list.component.html',
  styleUrls: ['./vertical-game-list.component.scss'],
})
export class VerticalGameListComponent implements OnInit,OnDestroy {

  @Input() title: string;
  @Input() games: Game[] = [];
  filter: Filter;

  suscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    let filterSuscription = this.store.select(store => store.games.filter).subscribe(filter => this.filter = filter);
    this.suscriptions.push(filterSuscription);
  }

  ngOnDestroy(): void {
    this.suscriptions.forEach((suscription) => {
      suscription.unsubscribe();
    })
  }

  openGame(game: Game) {
    this.router.navigate([environment.routes.home_game, game.id]);
  }
}
