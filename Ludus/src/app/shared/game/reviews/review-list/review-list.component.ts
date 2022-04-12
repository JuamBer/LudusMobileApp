import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { ReviewService } from 'src/services/review.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
})
export class ReviewListComponent implements OnInit {

  user: any;
  placeholder: string = "¡ Deja tu opinión aquí !";
  form: FormGroup = this.formBuilder.group({
    rating: ['', Validators.required],
    review: ['', Validators.required]
  });

  @Input() gameId: string;
  reviews: any[]

  constructor(
    private authService: AuthService,
    private reviewService: ReviewService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {


    this.reviewService.getReviewsByGameId(this.gameId).subscribe(
      (reviews) => {
        this.reviews = reviews.map((t: any) => {
          return {
            id: t.payload.doc.id,
            ...t.payload.doc.data()
          };
        })
      }
    )

    setTimeout(()=>{
      this.user = this.authService.user.multiFactor.user;
    },1000)
  }

  sendReview(formValue: any){
    this.reviewService.create(this.gameId, this.user.uid, formValue.rating, formValue.review);
  }

}
