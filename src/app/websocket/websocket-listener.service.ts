import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketListenerService {

  constructor() { }

  topic(socketAdress: string, topicName: string): Observable<string> {
    return new Observable<string>(
      (observer) => {
        const socket = io(socketAdress);
        socket.on(topicName, (msg) => {
          console.log(`${topicName} arrived`, msg);
        });
        return () => {
          console.log(`websocket listener of topic ${topicName} stopped listening`);
          socket.disconnect();
        };
      }
    );
  }

}
