//ANGULAR
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

//IONIC
import { ModalController } from '@ionic/angular';

//RXJS
import { Subscription } from 'rxjs';

//NGRX
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as gamesActions from 'src/app/state/games/games.actions';
import * as gendersActions from 'src/app/state/genders/genders.actions';
import * as complexitiesActions from 'src/app/state/complexities/complexities.actions';

//MODELS
import { Gender } from 'src/models/Gender';
import { Filter } from 'src/models/Filter.model';
import { Complexity } from 'src/models/Complexity.model';
import { PageType } from 'src/models/Page.model';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class FilterModalComponent implements OnInit, OnDestroy {

  form: FormGroup;
  formHasChanged: boolean = false;
  filter: Filter = {
    genders: [],
    players: '',
    complexity: '',
    text: ''
  };

  genders: Gender[] = [];
  complexities: Complexity[] = [];
  players: string[] = ['1 jugador', '2 jugadores', '3 jugadores', '4 jugadores', '5 jugadores', '6 jugadores', '7 jugadores', '+8 jugadores o más']

  suscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.store.dispatch(gendersActions.loadGenders());
    this.store.dispatch(complexitiesActions.loadComplexities());

    let gendersSuscription = this.store.select(store => store.genders.genders).subscribe(genders => this.genders = genders);
    this.suscriptions.push(gendersSuscription);

    let complexitiesSuscription = this.store.select(store => store.complexities.complexities).subscribe(complexities => this.complexities = complexities);
    this.suscriptions.push(complexitiesSuscription);

    let filterSuscription = this.store.select(store => store.games.filter).subscribe(filter => {
      this.filter = filter;
      this.form = this.formBuilder.group({
        genders: [this.filter.genders],
        players: [this.filter.players],
        complexity: [this.filter.complexity]
      });
    });
    this.suscriptions.push(filterSuscription);


    let formSuscription = this.form.valueChanges.subscribe(form => this.formHasChanged = true);
    this.suscriptions.push(formSuscription);
  }
  ngOnDestroy(): void {
    this.suscriptions.forEach((suscription) => {
      suscription.unsubscribe();
    })
  }

  reset() {
    this.store.dispatch(gamesActions.unSetFilteredGames());
    this.dismiss();
  }

  send(filter: Filter) {
    const newFilter: Filter = {
      ...filter,
      text: this.filter.text,
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
    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }



}
