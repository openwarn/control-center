import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningFeedComponent } from './warning-feed.component';

describe('WarningFeedComponent', () => {
  let component: WarningFeedComponent;
  let fixture: ComponentFixture<WarningFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
