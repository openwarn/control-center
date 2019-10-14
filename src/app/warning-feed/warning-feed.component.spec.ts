import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningFeedComponent } from './warning-feed.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

describe('WarningFeedComponent', () => {
  let component: WarningFeedComponent;
  let fixture: ComponentFixture<WarningFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningFeedComponent ],
      imports: [
        MatListModule,
        MatIconModule,
        MatExpansionModule
      ]
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
