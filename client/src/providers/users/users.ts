import { Socket } from 'ng-socket-io';
import { Injectable } from '@angular/core';
import {Events} from "ionic-angular";
import {RoomsProvider} from "../rooms/rooms";


@Injectable()
export class UsersProvider {

    private _user_id:number;
    private _users:[{id:number, username:string, myRooms:[number]}];

    constructor(public socket: Socket, public roomsProvider: RoomsProvider, public events: Events) {}

    listener() {
        this.socket.on('update users', users => {
            if (users.lenght == 0) {
                //prevent error
                this.socket.emit('need update users');
            }
            else {
                this.users = users;

                if (this.user_id !== undefined) {
                    this.roomsProvider.myRoomsId = this.userRooms;
                }
                this.events.publish('users updated');
            }
        });
        this.socket.on('login', user_id => {
            this.user_id = user_id;
            this.roomsProvider.myRoomsId = this.userRooms;
        });
    }

    get user_id():number {
        return this._user_id;
    }

    set user_id(value: number) {
        this._user_id = value;
    }

    get userRooms() {
        return (this.users.find(x => x.id === this.user_id).myRooms !== undefined) ? this.users.find(x => x.id === this.user_id).myRooms : [];
    }

    get users():[{id:number, username:string, myRooms:[number]}] {
        return this._users;
    }

    set users(value:[{id:number, username:string, myRooms:[number]}]) {
        this._users = value;
    }
}
