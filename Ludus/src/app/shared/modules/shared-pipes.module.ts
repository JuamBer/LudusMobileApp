import { NgModule } from '@angular/core';
import { GetGenderNamePipe } from 'src/pipes/get-gender-name.pipe';

@NgModule({
  imports: [

  ],
  declarations: [
    GetGenderNamePipe
  ],
  exports: [
    GetGenderNamePipe
  ]
})
export class ApplicationPipesModule { }
