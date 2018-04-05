import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import {CreateRoomPage} from "../create-room/create-room";
import {RoomsProvider} from "../../providers/rooms/rooms";
import {UsersProvider} from "../../providers/users/users";


@Component({
  selector: 'page-choose-room',
  templateUrl: 'choose-room.html',
})
export class ChooseRoomPage {
    mySearchBar:string="";
    constructor(public navCtrl: NavController, public socket: Socket, public roomsProvider: RoomsProvider, public usersProvider: UsersProvider) {
        this.roomsProvider.myRoomsId = this.usersProvider.userRooms;
        this.roomsProvider.refreshRoomsNotJoin();
    }

    roomSelected(room) {
        this.socket.emit('connect room', room);
        this.navCtrl.pop();
    }

    createRoom() {
      this.navCtrl.push(CreateRoomPage);
    }

    onSearchBarInput() {
        this.roomsProvider.searchWord = this.mySearchBar;
    }

}
