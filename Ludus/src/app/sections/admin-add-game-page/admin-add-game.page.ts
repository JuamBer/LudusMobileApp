import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { User } from 'src/models/User';

import { Complexity } from 'src/models/Complexity.model';
import { Gender } from 'src/models/Gender';
import { Type } from 'src/models/Type.model';

import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//NGRX
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as gamesActions from 'src/app/state/games/games.actions';
import * as gendersActions from 'src/app/state/genders/genders.actions';
import * as typesActions from 'src/app/state/types/types.actions';
import * as complexitiesActions from 'src/app/state/complexities/complexities.actions';
import { Game } from 'src/models/Game';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-add-game-page',
  templateUrl: 'admin-add-game.page.html',
  styleUrls: ['admin-add-game.page.scss']
})
export class AdminAddGamePage implements OnInit, OnDestroy {

  user: User;
  form: FormGroup;
  genders: Gender[] = [];
  types: Type[] = [];
  complexities: Complexity[] = [];
  formType: string;
  updateData: any;
  suscriptions: Subscription[] = [];

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formType = this.route.snapshot.paramMap.get('form');
    this.updateData = JSON.parse(this.route.snapshot.paramMap.get('updateData'));

    this.inizializarForm();
  }

  inizializarForm(){
    if (this.formType == 'create') {
      this.form = this.formBuilder.group({
        name: ['', [Validators.required]],
        ids_genders: ['', [Validators.required]],
        id_type: ['', [Validators.required]],
        min_players: ['', [Validators.required]],
        max_players: ['', [Validators.required]],
        min_time: ['', [Validators.required]],
        max_time: ['', [Validators.required]],
        age: ['', []],
        preparation: ['', []],
        id_complexity: ['', [Validators.required]],
        video_url: ['', []],
        summary: ['', []],
        description: ['', [Validators.required]],
        average_rating: [0, []],
        number_of_ratings: [0, []],
      });
    } else if (this.formType == 'update') {
      this.form = this.formBuilder.group({
        id: [this.updateData.id],
        name: [this.updateData.name, [Validators.required]],
        ids_genders: [this.updateData.ids_genders, [Validators.required]],
        id_type: [this.updateData.id_type, [Validators.required]],
        min_players: [this.updateData.min_players, [Validators.required]],
        max_players: [this.updateData.max_players, [Validators.required]],
        min_time: [this.updateData.min_time, [Validators.required]],
        max_time: [this.updateData.max_time, [Validators.required]],
        age: [this.updateData.age, []],
        preparation: [this.updateData.preparation, []],
        id_complexity: [this.updateData.id_complexity, [Validators.required]],
        video_url: [this.updateData.video_url, []],
        summary: [this.updateData.summary, []],
        description: [this.updateData.description, [Validators.required]],
        average_rating: [this.updateData.average_rating, []],
        number_of_ratings: [this.updateData.number_of_ratings, []],
      });
    }
  }

  ngOnInit(): void {

    this.store.dispatch(gendersActions.loadGenders());
    this.store.dispatch(typesActions.loadTypes());
    this.store.dispatch(complexitiesActions.loadComplexities());


    let gendersSuscription = this.store.select(store => store.genders.genders).subscribe(genders => this.genders = genders);
    this.suscriptions.push(gendersSuscription);

    let typesSuscription = this.store.select(store => store.types.types).subscribe(types => this.types = types);
    this.suscriptions.push(typesSuscription);

    let complexitiesSuscription = this.store.select(store => store.complexities.complexities).subscribe(complexities => this.complexities = complexities);
    this.suscriptions.push(complexitiesSuscription);


    let userSuscription: Subscription = this.store.select(store => store.auth.user).subscribe(
      (user) => {
        if (user) {
          this.user = user;
        }
      }
    )
    this.suscriptions.push(userSuscription);
  }

  ngOnDestroy(): void {
    this.suscriptions.forEach((suscription) => {
      suscription.unsubscribe();
    })
  }

  send(newGame: Game) {
    switch (this.formType){
      case 'create':
        this.store.dispatch(gamesActions.createGame({ id_user: this.user.id, game: newGame }));
        break;
      case 'update':
        this.store.dispatch(gamesActions.updateGame({ id_user: this.user.id, game: newGame }));
        break;
    }
    this.router.navigate([environment.routes.admin]);
  }
}
