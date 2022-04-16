import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { environment } from 'src/environments/environment';
import { Review } from 'src/models/Review';
import { User } from 'src/models/User';
import { UserService } from 'src/services/user.service';
import * as reviewsActions from 'src/app/state/reviews/reviews.actions';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.scss'],
})
export class ReviewItemComponent implements OnInit {

  @Input() review: Review;
  @Input() isOpenGameVisible: boolean = false;
  imTheOwnerOfTheReview: boolean = false;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.store.select(store => store.auth.user).subscribe(
      (user) => {
        if (user.id == this.review.id_user){
          this.imTheOwnerOfTheReview = true;
        }
      }
    )
  }

  openGame(id: string) {
    this.router.navigate([environment.routes.home_game, id]);
  }

  editReview(id: string) {
  }

  deleteReview(id: string) {
    this.store.dispatch(reviewsActions.deleteReview({id: id}));
  }

  async presentConfirmDeleteToast(id: string) {
    const toast = await this.toastController.create({
      message: '¿ Estás Seguro ?',
      color: 'dark',
      position: 'top',
      cssClass: 'confirm-toast',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        }, {
          text: 'Eliminar',
          handler: () => {
            console.log(id);

            this.deleteReview(id);
          }
        }
      ]
    });
    await toast.present();

  }

}
