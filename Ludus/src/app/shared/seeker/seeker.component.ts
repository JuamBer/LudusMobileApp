import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

@Component({
  selector: 'app-seeker',
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.scss'],
})
export class SeekerComponent implements OnInit {

  isFilterModalOpen: boolean = false;

  constructor(
    private modalController: ModalController,
    private store: Store<AppState>
  ) { }

  ngOnInit() { }

  toggleFilterModal() {
    this.isFilterModalOpen = !this.isFilterModalOpen;
  }

  search(event: any) {
    const search: string = event.detail.value;

    if (search != "") {
      this.store.dispatch(gamesActions.loadSearchResultsGames({ search: search }));
    }else{
      this.store.dispatch(gamesActions.unSetSearchResultsGames());
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: FilterModalComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
