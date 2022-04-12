import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { QuestionService } from 'src/services/question.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.scss'],
})
export class QuestionItemComponent implements OnInit {

  @Input() gameId: string;
  user: any;
  @Input() question: any;
  username: string;
  replyVisible: boolean = false;

  constructor(
    private userService: UserService,
    private questionService: QuestionService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userService.getUser(this.question.id_user).subscribe(
      (user)=>{
        this.username = user.nickname
      }
    )
    this.user = this.authService.user.multiFactor.user;

  }

  reply(){
    this.replyVisible = !this.replyVisible;
  }

  sendReply(){
    const replyTextArea: HTMLTextAreaElement = document.getElementById(`reply${this.question.id}`) as HTMLTextAreaElement;
    if (replyTextArea.value != ''){
      this.questionService.reply(
        this.question.id,
        this.gameId,
        this.user.uid,
        replyTextArea.value
      );

      this.replyVisible = false;
      replyTextArea.value = '';
    }

  }

}
