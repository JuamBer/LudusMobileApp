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
    let stopInfiniteBucle: boolean = false;
    let filterSuscription = this.store.select(store => store.games.filter).subscribe(filter => {
      this.filter = filter;

      const resetFilter: Filter = {
        genders: [],
        players: null,
        complexity: null,
        text: null
      }

      if (JSON.stringify(this.filter) == JSON.stringify(resetFilter)) {
        if (!stopInfiniteBucle){
          this.store.dispatch(gamesActions.unSetFilteredResultsGames());
          stopInfiniteBucle = !stopInfiniteBucle;
        }
      }
    });
    this.suscriptions.push(filterSuscription);
  }

  ngOnDestroy(): void {
    this.suscriptions.forEach((suscription) => {
      suscription.unsubscribe();
    })
  }
  removeFilter(type: string, value:string){
    switch(type){
      case 'gender':
        this.store.dispatch(gamesActions.loadFilteredGames({ filter: { ...this.filter, genders: this.filter.genders.filter(id_gender => id_gender != value)}}))
        break;
      case 'players':
        this.store.dispatch(gamesActions.loadFilteredGames({ filter: { ...this.filter, players: null } }))
        break;
      case 'complexity':
        this.store.dispatch(gamesActions.loadFilteredGames({ filter: { ...this.filter, complexity: null } }))
        break;
      case 'text':
        this.store.dispatch(gamesActions.loadFilteredGames({ filter: { ...this.filter, text: null } }))
        break;
    }
  }

  openGame(game: Game) {
    this.router.navigate([environment.routes.home_game, game.id]);
  }
}
