import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';
import { max } from 'rxjs/operators';
import { Gender } from 'src/models/Gender';
import { GenderService } from 'src/services/gender.service';

//NGRX
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as gamesActions from 'src/app/state/games/games.actions';
import * as gendersActions from 'src/app/state/genders/genders.actions';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class FilterModalComponent implements OnInit, OnDestroy{

  genders: Gender[] = [];
  form: FormGroup = this.formBuilder.group({
    rating: ['', Validators.required],
    review: ['', Validators.required]
  });
  suscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private routerOutlet: IonRouterOutlet,
    private genderService: GenderService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(gendersActions.loadGenders());
    let genderSuscription = this.store.select(store => store.genders.genders).subscribe(genders => this.genders = genders);
    this.suscriptions.push(genderSuscription);
  }
  ngOnDestroy(): void {
    this.suscriptions.forEach((suscription) => {
      suscription.unsubscribe();
    })
  }

  send(formValue: any){

  }

  public playersFormatter(value: number) {
    return `${value}+`
  }

  public timeFormatter(value: number) {
    return `${value} mins`
  }

}
