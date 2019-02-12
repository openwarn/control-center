import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { CapDeliveryService } from '../cap/cap-delivery.service';
import { CapXmlService } from '../cap/cap-xml.service';
import { CapAlert } from '../cap/cap-alert';
import { AlertInfo } from '../cap/alert-info';
import { Router } from '@angular/router';
import { PendingWarningService } from '../cap/pending-warning.service';
import * as uuid from 'uuid/v4';

@Component({
  selector: 'app-warning-creator',
  templateUrl: './warning-creator.component.html',
  styleUrls: ['./warning-creator.component.scss']
})
export class WarningCreatorComponent implements OnInit {

  scopes = [
    {name: 'Öffentlich', value: 'Public'},
    {name: 'Beschränkt', value: 'Restricted'},
    {name: 'Vertraulich', value: 'Private'}
  ];

  status = [
    {name: 'Meldung', value: 'Actual'},
    {name: 'Entwurf', value: 'Draft'},
    {name: 'Testmeldung', value: 'Test'}
  ];

  categories = [
    {name: 'Geophysisch', value: 'Geo'},
    {name: 'Meteorologisch', value: 'Met'},
    {name: 'Allgemein', value: 'Safety'},
    {name: 'Sicherheit', value: 'Security'},
    {name: 'Rettung', value: 'Rescue'},
    {name: 'Feuer', value: 'Fire'},
    {name: 'Gesundheit', value: 'Health'},
    {name: 'Umweltbedrohungen', value: 'Env'},
    {name: 'Transportinfrastruktur', value: 'Transport'},
    {name: 'Sonstige Infrastruktur', value: 'Infra'},
    {name: 'ABC-Gefahren', value: 'CBRNE'},
    {name: 'Sonstige', value: 'Other'},
  ];

  msgTypes = [
    {name: 'Warnung', value: 'Alert'}
  ];

  urgencies = [
    {
      name: 'Unbekannt',
      value: 'Unknown'
    },
    {
      name: 'Keine Reaktion mehr nötig',
      value: 'Past'
    },
    {
      name: 'In Zukunft ist eine Reaktion fällig',
      value: 'Future'
    },
    {
      name: 'Baldige Reaktion nötig',
      value: 'Expected'
    },
    {
      name: 'Sofortige Reaktion nötig',
      value: 'Immediate'
    }
  ];

  severities = [
    {
      name: 'Unbekannt',
      value: 'Unknown'
    },
    {
      name: 'Geringer Schaden',
      value: 'Minor'
    },
    {
      name: 'Möglicherweise gefährlich',
      value: 'Moderate'
    },
    {
      name: 'Gefährlich',
      value: 'Severe'
    },
    {
      name: 'Extrem gefährlich',
      value: 'Observed'
    }
  ];

  certainties = [
    {
      name: 'Unbekannt',
      value: 'Unknown'
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
      name: 'Wahrscheinlich (> 50%)',
      value: 'Likely'
    },
    {
      name: 'Bereits aufgetreten',
      value: 'Observed'
    }
  ];

  responseTypes = [
    {
      name: 'Deckung suchen...',
      value: 'Shelter'
    },
    {
      name: 'Evakuierung...',
      value: 'Evacuate'
    },
    {
      name: 'Vorbereitungen treffen...',
      value: 'Prepare'
    },
    {
      name: 'Folgende Aktion durchführen...',
      value: 'Execute'
    },
    {
      name: 'Vermeiden des Ereignisses indem... ',
      value: 'Avoid'
    },
    {
      name: 'Achte auf folgende Informationsquellen...',
      value: 'Monitor'
    },
    {
      name: '(Werte die Informationen dieser Warnung aus)',
      value: 'Assess'
    },
    {
      name: 'Die Gefahr ist vorüber...',
      value: 'AllClear'
    },
    {
      name: 'Keine Handlung empfohlen',
      value: 'None'
    }
  ];


  private DEFAULTS = {
    alertId: '',
    senderId: 'alerts@tu-ilmenau.de',
    scope: 'Public',
    status: 'Actual',
    msgType: 'Alert',
    language: 'en-US',
    headline: null,
    areaDesc: null,
    category: this.categories[0].value,
    urgency: 'Unknown',
    severity: 'Unknown',
    certainty: 'Unknown',
    responseType: null
  };

  alertForm = this.fb.group({
    // metadata
    alertId: [{value: this.DEFAULTS.alertId, disabled: false}, Validators.required],
    senderId: [{value: this.DEFAULTS.senderId, disabled: false}, Validators.required],
    scope: [this.DEFAULTS.scope, Validators.required],
    status: [this.DEFAULTS.status, Validators.required],
    msgType: [this.DEFAULTS.msgType, Validators.required],
    // warning info
    language: [this.DEFAULTS.language, Validators.required],
    headline: [
      this.DEFAULTS.headline,
      Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(200)])
    ],
    areaDesc: [this.DEFAULTS.areaDesc, Validators.required],
    category: [this.DEFAULTS.category, Validators.required],
    urgency: [this.DEFAULTS.urgency, Validators.required],
    severity: [this.DEFAULTS.severity, Validators.required],
    certainty: [this.DEFAULTS.certainty, Validators.required],
    responseType: [this.DEFAULTS.responseType, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private capDeliveryService: CapDeliveryService,
    private capXmlSevice: CapXmlService,
    private pendingWarningService: PendingWarningService,
    private router: Router
  ) {}

  onSubmit() {
    const form = this.alertForm.value;
    const capAlert = CapAlert.builder()
    .alertId(form.alertId)
    .senderId(form.senderId)
    .scope(form.scope)
    .status(form.status)
    .msgType(form.msgType)
    .addInfoBlock(
      AlertInfo.builder()
      .headline(form.headline)
      .language(form.language)
      .areaDescription(form.areaDesc)
      .build()
    )
    .category(form.category)
    .urgency(form.urgency)
    .severity(form.severity)
    .certainty(form.certainty)
    .responseType(form.responseType)
    .build();
    const capXml = this.capXmlSevice.convertCapAlertToXml(capAlert);
    this.capDeliveryService.deliver(capXml).subscribe(
      () => {
        alert('Warnung wurde erfolgreich versandt!');
        this.pendingWarningService.addWarning(capAlert);
        this.reset();
        this.router.navigate(['alerts']);
      },
      (err) => alert('Es ist ein Fehler aufgetreten, versuchen sie es erneut')
    );
  }

  ngOnInit() {
    this.alertForm.controls.alertId.setValue('TUI-OWS-' + uuid());
  }

  reset() {
    this.alertForm.reset(this.DEFAULTS);
  }

}
