import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningCreatorComponent } from './warning-creator.component';

describe('WarningCreatorComponent', () => {
  let component: WarningCreatorComponent;
  let fixture: ComponentFixture<WarningCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
