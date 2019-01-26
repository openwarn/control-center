import { Component, OnInit, OnDestroy } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-warning-feed',
  templateUrl: './warning-feed.component.html',
  styleUrls: ['./warning-feed.component.scss']
})
export class WarningFeedComponent implements OnInit, OnDestroy {

  private socket: SocketIOClient.Socket;

  constructor() { }

  ngOnInit() {
    this.socket = io(environment.services.nodeDummy.baseUrl);

    this.socket.on('connect', () => {
      console.log(this.socket.connected); // true
      this.socket.emit('birds', 'birdie');
      this.socket.on('message', (msg) => {
        console.log('bird arrived', msg);
      });
    });
  }

  ngOnDestroy() {
    this.socket.removeAllListeners();
    this.socket.close();
  }

}
