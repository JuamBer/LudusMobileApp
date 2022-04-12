import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/models/Game';
import { Gender } from 'src/models/Gender';
import { GameService } from 'src/services/game.service';
import { GenderService } from 'src/services/gender.service';
import { ReviewService } from 'src/services/review.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {

  gameId: string;
  game: Game = {
    id: '',
    name: '',
    ids_genders: [],
    id_type: '',
    min_players: 0,
    max_players: 0,
    min_time: 0,
    max_time: 0,
    description: "",
    age: '',
    preparation: '',
    complexity: '',
    strategy: '',
    random: '',
    video_url: '',
    summary: ''
  };
  genders: string[] = [];
  reviews: any[];

  questionsVisible: boolean = false;
  reviewsVisible: boolean = true;

  constructor(
    private activateRoute: ActivatedRoute,
    private gameService: GameService,
  ) { }

  ngOnInit() {
    this.gameId = this.activateRoute.snapshot.paramMap.get('id');

    this.gameService.getGame(this.gameId).subscribe(
      (game)=>{
        this.game = game;
      }
    )
  }

  toggleComments(event: any) {
    switch (event.detail.value){
      case 'questions':
        this.questionsVisible = true;
        this.reviewsVisible = false;
        break;
      case 'reviews':
        this.questionsVisible = false;
        this.reviewsVisible = true;
        break;
    }
  }

}
