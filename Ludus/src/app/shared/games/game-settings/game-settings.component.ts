//ANGULAR
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/models/Game';

//NGRX
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as gamesActions from 'src/app/state/games/games.actions';
import * as gendersActions from 'src/app/state/genders/genders.actions';
import * as typesActions from 'src/app/state/types/types.actions';
import * as complexitiesActions from 'src/app/state/complexities/complexities.actions';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PopoverController, ToastController } from '@ionic/angular';
import { User } from 'src/models/User';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.scss'],
})
export class GameSettingsComponent implements OnDestroy, OnInit {

  @Input() game: Game;
  user: User;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private toastController: ToastController,
    private popoverCtrl: PopoverController
  ) {

  }
  ngOnInit(): void {
    const userSubscription = this.store.select(store=> store.auth.user).subscribe(
      (user)=>{
        this.user = user;
      }
    )
  }
  ngOnDestroy(): void {
    this.popoverCtrl.dismiss();
  }

  editGame(game: Game){
    this.router.navigate([environment.routes.admin_add_game, { form: 'update', updateData: JSON.stringify(game)}]);
  }

  async presentConfirmDeleteToast(game: Game) {
    const toast = await this.toastController.create({
      message: '¿ Estás Seguro ?',
      color: 'dark',
      position: 'top',
      cssClass: 'confirm-toast',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => { }
        }, {
          text: 'Eliminar',
          handler: () => {

            this.deleteGame(game);
          }
        }
      ]
    });
    await toast.present();

  }

  deleteGame(game: Game) {
    this.store.dispatch(gamesActions.deleteGame({id_user: this.user.id, game: game}));
  }
}
