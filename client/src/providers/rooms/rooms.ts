import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
/*
  Generated class for the RoomsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RoomsProvider {

    private _rooms;

  constructor(public socket: Socket) {
      this.socket.on('new room', rooms => {
          this._rooms = rooms;
      });
  }

    get rooms() {
        return this._rooms;
    }

    set rooms(value) {
        this._rooms = value;
    }
}
