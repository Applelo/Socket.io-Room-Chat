import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Injectable()
export class MessagesProvider {

    private _messages = [];

    constructor(public socket: Socket) {}

    listener() {
        this.socket.on('new message', message => {
            this.messages.push(message);
        });

    }

    get messages() {
        return this._messages;
    }

    set messages(value) {
        this._messages = value;
    }
}
