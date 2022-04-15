import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ChangeEmailDTO } from 'src/models/dtos/ChangeEmailDTO.model';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-change-email-modal',
  templateUrl: './change-email-modal.component.html',
  styleUrls: ['./change-email-modal.component.scss'],
})
export class ChangeEmailModalComponent implements OnInit {

  title: string = "Cambiar Email";
  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  send(changeEmailDTO: ChangeEmailDTO){
    this.authService.updateEmail(changeEmailDTO.email).then(
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
