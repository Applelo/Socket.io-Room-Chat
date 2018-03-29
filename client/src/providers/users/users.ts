import { Socket } from 'ng-socket-io';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersProvider {

    private _user_id:number;
    private _users:[{id:number, username:string, rooms_creator:[number]}];

  constructor(socket: Socket) {
      socket.on('login', data => {
          this.user_id = data.user_id;
          this.users = data.users;
      });

  }

    get user_id():number {
        return this._user_id;
    }

    set user_id(value: number) {
        this._user_id = value;
    }

    get users():[{id:number, username:string, rooms_creator:[number]}] {
        return this._users;
    }

    set users(value:[{id:number, username:string, rooms_creator:[number]}]) {
        this._users = value;
    }
}
