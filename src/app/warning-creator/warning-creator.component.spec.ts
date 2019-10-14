import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { WarningCreatorComponent } from './warning-creator.component';
import { CapDeliveryService } from '../cap/cap-delivery.service';
import { CapXmlMapper } from '../cap/cap-xml.mapper';
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
        CapXmlMapper,
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
