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
import * as complexitiesActions from 'src/app/state/complexities/complexities.actions';

import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Type } from 'src/models/Type.model';
import { Filter } from 'src/models/Filter.moda';
import { Complexity } from 'src/models/Complexity.model';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class FilterModalComponent implements OnInit, OnDestroy{

  form: FormGroup = this.formBuilder.group({
    //types: [[]],
    genders: [[]],
    players: [null],
    //time: [null],
    complexity: [null]
  });
  initialFormValue: any;
  numberOfFromsChanges: number = 0;
  formHasChanged: boolean = false;
  filter: Filter;


  //types: Type[] = [];
  genders: Gender[] = [];
  complexities: Complexity[] = [];
  players: string[] = ['1 jugador', '2 jugadores', '3 jugadores', '4 jugadores', '5 jugadores', '6 jugadores', '7 jugadores','+8 jugadores o más']
  //times: string[] = ['5 minutos', '10 minutos', '20 minutos', '30 minutos', '40 minutos', '50 minutos', '60 minutos', '+70 minutos o más']

  suscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    //this.store.dispatch(typesActions.loadTypes());
    this.store.dispatch(gendersActions.loadGenders());
    this.store.dispatch(complexitiesActions.loadComplexities());

    //let typesSuscription = this.store.select(store => store.types.types).subscribe(types => this.types = types);
    //this.suscriptions.push(typesSuscription);

    let gendersSuscription = this.store.select(store => store.genders.genders).subscribe(genders => this.genders = genders);
    this.suscriptions.push(gendersSuscription);

    let complexitiesSuscription = this.store.select(store => store.complexities.complexities).subscribe(complexities => this.complexities = complexities);
    this.suscriptions.push(complexitiesSuscription);

    let filterSuscription = this.store.select(store => store.games.filter).subscribe(filter => this.filter = {...filter});
    this.suscriptions.push(filterSuscription);

    let formSuscription = this.form.valueChanges.subscribe(form => {
      if (this.numberOfFromsChanges < 3){
        this.initialFormValue = form;
      }else{
        if(this.initialFormValue != form){
          this.formHasChanged = true;
        }
      }
      this.numberOfFromsChanges++;
    });
    this.suscriptions.push(formSuscription);
  }
  ngOnDestroy(): void {
    this.suscriptions.forEach((suscription) => {
      suscription.unsubscribe();
    })
  }

  reset(){
    this.store.dispatch(gamesActions.unSetFilteredGames());
    this.dismiss();
  }

  send(filter: Filter){
    const newFilter: Filter = {
      ...filter,
      text: this.filter.text,
    }
    this.store.dispatch(gamesActions.loadFilteredGames({filter: newFilter}));
    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }



}
