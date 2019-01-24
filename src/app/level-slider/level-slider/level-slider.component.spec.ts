import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelSliderComponent } from './level-slider.component';
import { MatSliderModule } from '@angular/material';

describe('LevelSliderComponent', () => {
  let component: LevelSliderComponent;
  let fixture: ComponentFixture<LevelSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSliderModule
      ],
      declarations: [ LevelSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should display label', () => {
    component.labelMapping = [
      {
        name: 'Unbekannt',
        value: 'ExpectedValue'
      },
      {
        name: 'Unwahrscheinlich (nahezu 0%)',
        value: 'Unlikely'
      },
      {
        name: 'Möglich (<= 50%)',
        value: 'Possible'
      },
      {
        name: 'Wahrscheinlich (<= 50%)',
        value: 'Likely'
      },
      {
        name: 'Bereits aufgetreten',
        value: 'Observed'
      }
    ];
    fixture.detectChanges();
    expect(component.value).toBe('ExpectedValue');
  });
});
