import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {ChooseRoomPage} from "../choose-room/choose-room";
import {RoomsProvider} from "../../providers/rooms/rooms";
import {UsersProvider} from "../../providers/users/users";
import {Socket} from 'ng-socket-io';
import {MessagesPage} from "../messages/messages";

@Component({
  selector: 'page-my-rooms',
  templateUrl: 'my-rooms.html',
})
export class MyRoomsPage {

  constructor(public navCtrl: NavController, public socket: Socket,
              public roomsProvider: RoomsProvider, public usersProvider: UsersProvider) {

      socket.removeListener('go room');
      this.socket.on('go room', data => {
          this.navCtrl.push(MessagesPage, data);
      });

  }

  addRoom() {
      this.navCtrl.push(ChooseRoomPage);
  }

  logout() {
      this.navCtrl.popToRoot();
  }

  roomSelected(room) {
      this.socket.emit('join room', room);
  }

}
