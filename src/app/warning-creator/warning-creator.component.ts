import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { CapDeliveryService } from '../cap/cap-delivery.service';
import { CapXmlService } from '../cap/cap-xml.service';
import { CapAlert } from '../cap/cap-alert';

@Component({
  selector: 'app-warning-creator',
  templateUrl: './warning-creator.component.html',
  styleUrls: ['./warning-creator.component.scss']
})
export class WarningCreatorComponent implements OnInit {

  alertForm = this.fb.group({
    // metadata
    senderId: [{value: 'DE-3424234', disabled: false}, Validators.required],
    alertId: [{value: 'DE-W-3223423', disabled: false}, Validators.required],
    scope: ['Public', Validators.required],
    status: ['Actual', Validators.required],
    msgType: ['Alert', Validators.required],
    // warning info
    language: ['en-US', Validators.required],
    headline: [
      null,
      Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(200)])
    ],
    areaDesc: [null, Validators.required],
    category: ['Met', Validators.required],
    urgency: ['Unknown', Validators.required],
    severity: ['Unknown', Validators.required],
    certainty: ['Unknown', Validators.required],
    responseType: [null, Validators.required]
  });

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

  constructor(
    private fb: FormBuilder,
    private capDeliveryService: CapDeliveryService,
    private capXmlSevice: CapXmlService
  ) {}

  onSubmit() {
    const capAlert = new CapAlert();
    const capXml = this.capXmlSevice.convertCapAlertToXml(capAlert);
    this.capDeliveryService.deliver(capXml).subscribe(
      () => {
        alert('Warnung wurde erfolgreich versandt!');
        this.alertForm.reset();
        this.alertForm.clearValidators();
      },
      (err) => alert('Es ist ein Fehler aufgetreten, versuchen sie es erneut')
    );
  }

  ngOnInit() {
  }

}
