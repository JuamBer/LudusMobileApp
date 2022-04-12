import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

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

  public srcLogo: string = "./../../assets/img/logo.png";
  public altLogo: string = "LogoLudus";
  @Input() public type: string = "";

  setTitle(type: string){
    this.type = type;
  }

  backToHome(){
    this.router.navigate(['/tabs/home']);
  }
}
