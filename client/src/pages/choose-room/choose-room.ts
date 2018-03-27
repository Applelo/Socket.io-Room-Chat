import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import {CreateRoomPage} from "../create-room/create-room";
import {RoomsProvider} from "../../providers/rooms/rooms";
import {MessagesPage} from "../messages/messages";

/**
 * Generated class for the ChooseRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-choose-room',
  templateUrl: 'choose-room.html',
})
export class ChooseRoomPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public socket: Socket, public roomsProvider: RoomsProvider) {
     if (this.navParams.get('rooms')) {
         this.roomsProvider.rooms = this.navParams.get('rooms');
     }
  }

    roomSelected(room) {
        this.navCtrl.push(MessagesPage, {room});
    }

    logout() {
        this.socket.disconnect();
        this.navCtrl.popToRoot();
    }

    createRoom() {
      this.navCtrl.push(CreateRoomPage);
    }


}
