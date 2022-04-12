import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Game } from 'src/models/Game';
import { Gender } from 'src/models/Gender';
import { GameService } from 'src/services/game.service';
import { GenderService } from 'src/services/gender.service';

@Component({
  selector: 'app-publicatePage',
  templateUrl: 'publicatePage.page.html',
  styleUrls: ['publicatePage.page.scss']
})
export class PublicatePage {

  public addGameForm: FormGroup;
  public newGame: Game;
  public genders = [];

  constructor(
    private formBuilder: FormBuilder,
    private gameService: GameService,
    private genderService: GenderService
  ) {
    this.addGameForm = this.formBuilder.group({
      name: new FormControl("", Validators.compose([
        Validators.required,
      ])),
      minPlayers: new FormControl("", Validators.compose([
        Validators.required,
      ])),
      maxPlayers: new FormControl("", Validators.compose([
        Validators.required,
      ])),
      description: new FormControl("", Validators.compose([
        Validators.required,
      ]))
    });
  }

  ngOnInit(){
    const selectGenders = document.getElementById("selectGenders");
    this.onGetGenders().then(
      (res: any[])=>{
        let val = ""
        console.log(res)
        res.forEach(el => {
          let name = el.payload._delegate.doc._document.data.value.mapValue.fields.name.stringValue;
          console.log(name)
          val += `<ion-select-option value="${name}">${name}</ion-select-option>`
        })
        selectGenders.innerHTML = val
      }
    )
  }

  addGame(){
    console.log(this.addGameForm.value);
    this.newGame = {
      ...this.addGameForm.value
    }
    console.log(this.newGame)
    this.gameService.insertNewGame(this.newGame)
  }

  async onGetGenders(){
    var promesa = new Promise((resolve, reject)=>{
      this.genderService.getGenders().subscribe((receivedGenders) => {
        receivedGenders.forEach((gender) => {
          this.genders.push(gender);
        })
        resolve(this.genders);
      });
    })
    return promesa;

  }
}
