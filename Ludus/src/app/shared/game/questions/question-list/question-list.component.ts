import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { QuestionService } from 'src/services/question.service';
import { ReviewService } from 'src/services/review.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements OnInit {

  @Input() gameId: string;
  user: any;
  questions: any[]

  constructor(
    private questionService: QuestionService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.questionService.getQuestionsByGameId(this.gameId).subscribe(
      (questions) => {
        this.questions = questions.map((t: any) => {
          return {
            id: t.payload.doc.id,
            ...t.payload.doc.data()
          };
        })

      }
    )
  }

}
