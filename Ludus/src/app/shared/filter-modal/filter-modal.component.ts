import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { max } from 'rxjs/operators';
import { Gender } from 'src/models/Gender';
import { GenderService } from 'src/services/gender.service';

//NGRX
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as gamesActions from 'src/app/state/games/games.actions';
import * as gendersActions from 'src/app/state/genders/genders.actions';
import * as typesActions from 'src/app/state/types/types.actions';

import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Type } from 'src/models/Type.model';
import { Filter } from 'src/models/Filter.moda';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class FilterModalComponent implements OnInit, OnDestroy{

  form: FormGroup = this.formBuilder.group({
    genders: [[]],
    types: [[]]
  });

  types: Type[] = [];
  genders: Gender[] = [];

  suscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.store.dispatch(gendersActions.loadGenders());
    this.store.dispatch(typesActions.loadTypes());
    let gendersSuscription = this.store.select(store => store.genders.genders).subscribe(genders => this.genders = genders);
    this.suscriptions.push(gendersSuscription);
    let typesSuscription = this.store.select(store => store.types.types).subscribe(types => this.types = types);
    this.suscriptions.push(typesSuscription);
  }
  ngOnDestroy(): void {
    this.suscriptions.forEach((suscription) => {
      suscription.unsubscribe();
    })
  }

  send(filter: Filter){
    console.log("send");
    console.log(filter);
    this.store.dispatch(gamesActions.loadFilteredGames({filter: filter}));
    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }



}
