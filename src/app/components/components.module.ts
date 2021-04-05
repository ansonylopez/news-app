import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news/news.component';
import { NewComponent } from './new/new.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    NewsComponent,
    NewComponent,
  ],
  exports: [
    NewsComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
