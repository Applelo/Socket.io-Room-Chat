import { Socket } from 'ng-socket-io';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersProvider {

    private _user_id:number;
    private _users:[{id:number, username:string, admin:[number], myRooms:[number]}];

    constructor(socket: Socket) {
        socket.on('update users', users => {
            this.users = users;
        });
    }

    get user_id():number {
        return this._user_id;
    }

    set user_id(value: number) {
        this._user_id = value;
    }

    get userRooms():[number] {
        console.log(this.users);
        return this.users.find(x => x.id === this.user_id).myRooms;
    }

    get users():[{id:number, username:string, admin:[number], myRooms:[number]}] {
        return this._users;
    }

    set users(value:[{id:number, username:string, admin:[number], myRooms:[number]}]) {
        this._users = value;
    }
}
