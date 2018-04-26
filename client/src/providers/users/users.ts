import { Socket } from 'ng-socket-io';
import { Injectable } from '@angular/core';
import {Events} from "ionic-angular";


@Injectable()
export class UsersProvider {

    private _user_id:number;
    private _users:[{id:number, username:string, myRooms:[number]}];

    constructor(public socket: Socket, public events: Events) {}

    listener() {
        this.socket.on('update users', users => {
            if (users.lenght == 0) {
                //prevent error
                this.socket.emit('need update users');
            }
            else {
                this.users = users;
                this.events.publish('users updated');
            }
        });
        this.socket.on('login', user_id => {
            this.user_id = user_id;
        });
    }

    get user_id():number {
        return this._user_id;
    }

    set user_id(value: number) {
        this._user_id = value;
    }

    get userRooms():[number] {
        return (this.users.find(x => x.id === this.user_id).myRooms !== undefined) ? this.users.find(x => x.id === this.user_id).myRooms : [0];
    }

    get users():[{id:number, username:string, myRooms:[number]}] {
        return this._users;
    }

    set users(value:[{id:number, username:string, myRooms:[number]}]) {
        this._users = value;
    }
}
