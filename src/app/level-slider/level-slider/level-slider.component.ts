import { Component, OnInit, Input } from '@angular/core';

interface LabelMapping {
  name: string;
  value: string;
}

@Component({
  selector: 'alert-level-slider',
  templateUrl: './level-slider.component.html',
  styleUrls: ['./level-slider.component.scss']
})
export class LevelSliderComponent implements OnInit {

  numOfSteps = 5;
  resolution = 1;
  minStep = 0;
  isThumbLabel = true;
  propertyName = 'Gewissheit';
  stepDescription = 'Extreme';
  sliderValue = 0;
  value = 'Unknown';

  @Input()
  labelMapping: Array<LabelMapping> = [
    {
      name: 'Unknown',
      value: 'None'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
