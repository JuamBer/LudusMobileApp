import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/models/Review';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.scss'],
})
export class ReviewItemComponent implements OnInit {

  @Input() review: Review;

  constructor() { }

  ngOnInit() {}

}
