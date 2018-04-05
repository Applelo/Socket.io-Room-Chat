import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Injectable()
export class MessagesProvider {

    private _messages = [];

    constructor(socket: Socket) {
      socket.on('new message', message => {
          console.log('new message', message);
          this._messages.push(message);
      });

  }

    get messages() {
        return this._messages;
    }

    set messages(value) {
        this._messages = value;
    }
}
