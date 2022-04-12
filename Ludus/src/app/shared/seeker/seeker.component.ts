import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Game } from 'src/models/Game';
import { GameService } from 'src/services/game.service';

//MODULES AND COMPONENTS
import { FilterModalComponent } from '../../shared/filter-modal/filter-modal.component';

@Component({
  selector: 'app-seeker',
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.scss'],
})
export class SeekerComponent implements OnInit {

  isFilterModalOpen: boolean = false;
  @Output() resultGames: EventEmitter<Game[]> = new EventEmitter<Game[]>();

  constructor(
    private modalController: ModalController,
    private gameService: GameService
  ) { }

  ngOnInit() { }

  toggleFilterModal() {
    this.isFilterModalOpen = !this.isFilterModalOpen;
  }

  search(event: any) {
    const search: string = event.detail.value;

    if (search == "") {
      this.resultGames.emit([]);
    } else {
      this.gameService.getGamesBySearch(search).subscribe(
        (results: any) => {

          console.log(results)
          this.resultGames.emit(results.map((game: any) => {
            return {
              id: game.payload.doc.id,
              ...game.payload.doc.data()
            };
          }))
        }
      )
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: FilterModalComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
