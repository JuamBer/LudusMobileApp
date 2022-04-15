import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ChangeNameDTO } from 'src/models/dtos/ChangeNameDTO.model';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-change-name-modal',
  templateUrl: './change-name-modal.component.html',
  styleUrls: ['./change-name-modal.component.scss'],
})
export class ChangeNameModalComponent implements OnInit {

  title: string = "Cambiar Nombre";
  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  send(changeNameDTO: ChangeNameDTO){
    this.authService.updateName(changeNameDTO.name).then(
      (res)=>{
        this.dismiss();
      }
    ).catch(
      (err)=>{
        console.error(err);

      }
    )
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
