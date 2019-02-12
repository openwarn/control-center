import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatOptionModule,
  MatFormFieldModule,
  MatListModule
} from '@angular/material';
import { WarningCreatorComponent } from './warning-creator.component';
import { CapDeliveryService } from '../cap/cap-delivery.service';
import { CapXmlService } from '../cap/cap-xml.service';
import { HttpClientModule } from '@angular/common/http';
import { PendingWarningService } from '../cap/pending-warning.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('WarningCreatorComponent', () => {
  let component: WarningCreatorComponent;
  let fixture: ComponentFixture<WarningCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningCreatorComponent ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatOptionModule,
        MatFormFieldModule,
        MatListModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        CapDeliveryService,
        CapXmlService,
        PendingWarningService
      ]
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
