import { Component } from '@angular/core';
import {Events, NavParams, ViewController} from 'ionic-angular';
import {RoomsProvider} from "../../providers/rooms/rooms";

@Component({
  selector: 'page-users-list',
  templateUrl: 'users-list.html',
})
export class UsersListPage {

    room:{id:number, name:string, numUsers:number, users:[number]};
    user_id:number;
    users:[{id:number, username:string, admin:[number], myRooms:[number]}];
    meUser:{id:number, username:string, admin:[number], myRooms:[number]};
    otherUsers = [];
    constructor(public navParams: NavParams, public viewCtrl: ViewController, public events:Events,
                public roomsProvider: RoomsProvider) {
        this.room = this.navParams.get('room');
        this.user_id = this.navParams.get('user_id');
        this.users = this.navParams.get('users');
        this.meUser = this.users.length > 0 ? this.users.find(x => x.id === this.user_id) : {id:-1, username:'me', admin:[0], myRooms:[0]} ;

        /*this.room.users.forEach(user => {
            let data = this.users.find(x => x.id === user);
            if (data !== undefined) {
                this.otherUsers.push(data);
            }
        });*/

        /*this.events.subscribe('rooms updated', () => {
            console.log('fzeuhfziefuh');
            let rooms = this.roomsProvider.rooms;
            console.log( rooms.find(x => x.id === this.room.id));
                this.room = rooms.find(x => x.id === this.room.id);
                this.room.users.forEach(user => {
                    let data = this.users.find(x => x.id === user);
                    if (data !== undefined) {
                        this.otherUsers.push(data);
                    }
                });
        });*/

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }




}
