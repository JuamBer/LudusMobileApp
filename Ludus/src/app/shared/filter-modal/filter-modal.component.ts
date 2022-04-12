import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';
import { max } from 'rxjs/operators';
import { Gender } from 'src/models/Gender';
import { GenderService } from 'src/services/gender.service';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class FilterModalComponent implements OnInit {

  genders: Gender[] = [];
  jugadores: any = {
    min: 1,
    max: 50
  }

  constructor(
    private routerOutlet: IonRouterOutlet,
    private genderService: GenderService
  ) { }

  ngOnInit() {
    this.genderService.getGenders().subscribe(
      (genders: any)=>{
        this.genders = genders.map((gender: any) => {
          return {
            id: gender.payload.doc.id,
            ...gender.payload.doc.data()
          };
        })
      }
    )
  }

  public playersFormatter(value: number) {
    return `${value}+`
  }

  public timeFormatter(value: number) {
    return `${value} mins`
  }

}
