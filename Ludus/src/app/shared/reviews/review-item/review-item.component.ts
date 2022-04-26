//ANGULAR
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//IONIC
import { ModalController, ToastController } from '@ionic/angular';

//NGRX
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import * as reviewsActions from 'src/app/state/reviews/reviews.actions';

//COMPONENTS
import { EditReviewModalComponent } from '../edit-review-modal/edit-review-modal.component';

//MODELS
import { Review } from 'src/models/Review';

//ENVIRONMENTS
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.scss'],
})
export class ReviewItemComponent implements OnInit {

  @Input() review: Review;
  @Input() isOpenGameVisible: boolean = false;
  isEditReviewModalOpen: boolean = false;
  imTheOwnerOfTheReview: boolean = false;
  modal: HTMLElement;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private toastController: ToastController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.store.select(store => store.auth.user).subscribe(
      (user) => {
        if(user){
          if (user.id == this.review.id_user) {
            this.imTheOwnerOfTheReview = true;
          }
        }
      }
    )
  }

  openGame(id: string) {
    this.router.navigate([environment.routes.home_game, id]);
  }

  editReview(id: string) {
  }

  deleteReview(review: Review) {
    this.store.dispatch(reviewsActions.deleteReview({ review: review}));
  }

  async presentModal(review: Review) {
    const modal = await this.modalController.create({
      component: EditReviewModalComponent,
      componentProps: {
        review: review
      },
      breakpoints: [0.1, 0.5, 1],
      initialBreakpoint: 0.5
    });
    return await modal.present();
  }

  async presentConfirmDeleteToast(review: Review) {
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

            this.deleteReview(review);
          }
        }
      ]
    });
    await toast.present();

  }

}
