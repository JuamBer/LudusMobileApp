//ANGULAR
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//RXJS
import { Subscription } from 'rxjs';

//NGRX
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as gamesActions from 'src/app/state/games/games.actions';

//MODELS
import { Filter } from 'src/models/Filter.model';
import { Game } from 'src/models/Game';

//ENVIRONMENTS
import { environment } from 'src/environments/environment';
import { Page, PageType } from 'src/models/Page.model';

@Component({
  selector: 'app-vertical-game-list',
  templateUrl: './vertical-game-list.component.html',
  styleUrls: ['./vertical-game-list.component.scss'],
})
export class VerticalGameListComponent implements OnInit,OnDestroy {

  @Input() title: string;
  @Input() games: Page<Game>;
  filter: Filter;
  areMoreGames: boolean = true;

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

  loadMore(){
    this.store.dispatch(gamesActions.loadMoreFilteredGames({ page: this.games, filter: this.filter}));
  }
  removeFilter(type: string, value:string){
    switch(type){
      case 'gender':
        this.store.dispatch(gamesActions.loadFilteredGames({
          page: {
            limit: 3,
            primerDoc: null,
            ultimoDoc: null,
            items: [],
            type: PageType.FILTERED_GAMES
          },
          filter: { ...this.filter, genders: this.filter.genders.filter(id_gender => id_gender != value)}
        }))
        break;
      case 'players':
        this.store.dispatch(gamesActions.loadFilteredGames({
          page: {
            limit: 3,
            primerDoc: null,
            ultimoDoc: null,
            items: [],
            type: PageType.FILTERED_GAMES
          },
          filter: { ...this.filter, players: null }
        }))
        break;
      case 'complexity':
        this.store.dispatch(gamesActions.loadFilteredGames({
          page: {
            limit: 3,
            primerDoc: null,
            ultimoDoc: null,
            items: [],
            type: PageType.FILTERED_GAMES
          },
          filter: { ...this.filter, complexity: null }
        }))
        break;
      case 'text':
        this.store.dispatch(gamesActions.loadFilteredGames({
          page: {
            limit: 3,
            primerDoc: null,
            ultimoDoc: null,
            items: [],
            type: PageType.FILTERED_GAMES
          },
          filter: { ...this.filter, text: null }
        }))
        break;
    }
  }

  openGame(game: Game) {
    this.router.navigate([environment.routes.home_game, game.id]);
  }
}
