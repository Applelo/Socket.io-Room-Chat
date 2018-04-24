import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import {CreateRoomPage} from "../create-room/create-room";
import {RoomsProvider} from "../../providers/rooms/rooms";


@Component({
  selector: 'page-choose-room',
  templateUrl: 'choose-room.html',
})
export class ChooseRoomPage {
    mySearchBar:string="";
    constructor(public navCtrl: NavController, public socket: Socket, public roomsProvider: RoomsProvider) {
    }

    roomSelected(room) {
        this.navCtrl.pop().then(() => {
            this.socket.emit('connect room', room);
        });
    }

    createRoom() {
      this.navCtrl.push(CreateRoomPage);

    }

    onSearchBarInput() {
        this.roomsProvider.searchWord = this.mySearchBar;
    }

}
