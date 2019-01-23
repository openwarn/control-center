import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LevelSliderComponent } from './level-slider/level-slider.component';
import { MatSliderModule } from '@angular/material';

@NgModule({
  declarations: [
    LevelSliderComponent
  ],
  imports: [
    CommonModule,
    MatSliderModule
  ],
  exports: [
    LevelSliderComponent
  ]
})
export class LevelSliderModule { }
