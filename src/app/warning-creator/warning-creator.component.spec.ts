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
        HttpClientModule
      ],
      providers: [
        CapDeliveryService,
        CapXmlService
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
