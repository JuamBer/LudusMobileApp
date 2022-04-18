import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Game } from 'src/models/Game';
import { GameService } from 'src/services/game.service';

//MODULES AND COMPONENTS
import { FilterModalComponent } from '../../shared/filter-modal/filter-modal.component';

//NGRX
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as gamesActions from 'src/app/state/games/games.actions';
import { Subscription } from 'rxjs';
import { Filter } from 'src/models/Filter.moda';

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
      this.store.dispatch(gamesActions.loadFilteredGames({filter: newFilter}));
    }else{
      this.store.dispatch(gamesActions.unSetFilteredGames());
    }
  }
}
