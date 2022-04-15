import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ludus-header',
  templateUrl: './ludus-header.component.html',
  styleUrls: ['./ludus-header.component.scss'],
})
export class LudusHeaderComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  backToHome(){
    this.router.navigate([environment.routes.home]);
  }
}
