import { Component } from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-users-list',
  templateUrl: 'users-list.html',
})
export class UsersListPage {

    room:{id:number, name:string, numUsers:number};
    user_id:number;
    users:[{id:number, username:string, admin:[number], myRooms:[number]}];
    meUser:{id:number, username:string, admin:[number], myRooms:[number]};
    otherUsers;
    constructor(public navParams: NavParams, public viewCtrl: ViewController) {
        this.room = this.navParams.get('room');
        this.user_id = this.navParams.get('user_id');
        this.users = this.navParams.get('users');

        this.meUser = this.users.find(x => x.id === this.user_id);
        this.otherUsers = this.users.filter(x => x.id !== this.user_id);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }




}
