//ANGULAR
import { NgModule } from '@angular/core';

//PIPES
import { GetGenderNamePipe } from 'src/pipes/get-gender-name.pipe';
import { GetGamePipe } from 'src/pipes/get-game.pipe';
import { GetTypeNamePipe } from 'src/pipes/get-type-name.pipe';
import { SafePipe } from '../../../pipes/safe.pipe';
import { GetUserNamePipe } from '../../../pipes/get-user-name.pipe';
import { GetComplexityNamePipe } from 'src/pipes/get-complexity-name.pipe';
import { GetGameNamePipe } from 'src/pipes/get-game-name.pipe';

//DIRECTIVES
import { VarDirective } from 'src/utils/ng-var.directive';

@NgModule({
  imports: [
  ],
  declarations: [
    GetGenderNamePipe,
    GetGamePipe,
    GetTypeNamePipe,
    SafePipe,
    GetUserNamePipe,
    GetComplexityNamePipe,
    GetGameNamePipe,
    VarDirective
  ],
  exports: [
    GetGenderNamePipe,
    GetGamePipe,
    GetTypeNamePipe,
    SafePipe,
    GetUserNamePipe,
    GetComplexityNamePipe,
    GetGameNamePipe,
    VarDirective
  ]
})
export class ApplicationPipesAndDirectivesModule { }
