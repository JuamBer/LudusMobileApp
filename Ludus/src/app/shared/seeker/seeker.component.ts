//AMGULAR
import { Component, OnDestroy, OnInit } from '@angular/core';

//IONIC
import { ModalController } from '@ionic/angular';

//RXJS
import { Subscription } from 'rxjs';

//NGRX
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as gamesActions from 'src/app/state/games/games.actions';

//MODELS
import { Filter } from 'src/models/Filter.model';
import { PageType } from 'src/models/Page.model';

@Component({
  selector: 'app-seeker',
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.scss'],
})
export class SeekerComponent implements OnInit, OnDestroy {

  filter: Filter;
  isFilterModalOpen: boolean = false;
  suscriptions: Subscription[] = [];

  constructor(
    private modalController: ModalController,
    private store: Store<AppState>
  ) { }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.suscriptions.forEach((suscription) => {
      suscription.unsubscribe();
    })
  }

  toggleFilterModal() {
    this.isFilterModalOpen = !this.isFilterModalOpen;
  }

  search(event: any) {
    const search: string = event.detail.value;

    let filterSuscription = this.store.select(store => store.games.filter).subscribe(filter => this.filter = filter);
    this.suscriptions.push(filterSuscription);

    if (search != "") {
      const newFilter: Filter = {
        ...this.filter,
        text: search
      }
      this.store.dispatch(gamesActions.loadFilteredGames({
        page: {
          limit: 3,
          primerDoc: null,
          ultimoDoc: null,
          items: [],
          type: PageType.FILTERED_GAMES
        },
        filter: newFilter
      }));
    }else{
      this.store.dispatch(gamesActions.unSetFilteredGames());
    }
  }
}
