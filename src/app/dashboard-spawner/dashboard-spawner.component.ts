import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Input, Injector } from '@angular/core';

@Component({
  selector: 'app-dashboard-spawner',
  templateUrl: './dashboard-spawner.component.html',
  styleUrls: ['./dashboard-spawner.component.scss']
})
export class DashboardSpawnerComponent implements OnInit {
  @ViewChild('spawnHost', { read: ViewContainerRef}) spawnHost;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
  }

  @Input() set component(componentClass: any) {
    if (!componentClass) {
      return;
    }

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const injector = Injector.create([]);

    const component = componentFactory.create(injector);
    this.spawnHost.insert(component.hostView);
  }

}
