import { Socket } from 'ng-socket-io';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersProvider {

    private _user_id:number;
    private _users:[{}];

  constructor(socket: Socket) {
      socket.on('login', data => {
          this.user_id = data.user_id;
          this.users = data.users;
      });

  }


    get user_id(): number {
        return this._user_id;
    }

    set user_id(value: number) {
        this._user_id = value;
    }

    get users(): [{}] {
        return this._users;
    }

    set users(value: [{}]) {
        this._users = value;
    }
}
