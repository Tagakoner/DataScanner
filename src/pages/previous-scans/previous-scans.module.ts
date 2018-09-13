import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreviousScansPage } from './previous-scans';

@NgModule({
  declarations: [
    PreviousScansPage,
  ],
  imports: [
    IonicPageModule.forChild(PreviousScansPage),
  ],
})
export class PreviousScansPageModule {}
