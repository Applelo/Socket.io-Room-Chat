import {Component} from "@angular/core";
import {NavParams, ViewController} from "ionic-angular";
import { ModalController } from 'ionic-angular';
import {UsersListPage} from "../users-list/users-list";
import {Socket} from "ng-socket-io";

@Component({
    template: `
    <ion-list>
      <ion-list-header>Room settings</ion-list-header>
      <!--<button ion-item (click)="showRoomUsers()">Users connected</button>-->
      <button ion-item (click)="quitRoom()">Quit the room</button>
    </ion-list>
  `
})
export class MessagesMenu {
    data;
    constructor(public viewCtrl: ViewController, public modalCtrl: ModalController,
                public navParams: NavParams, public socket: Socket) {
        this.data = {
            room:this.navParams.get('room'),
            users:this.navParams.get('users'),
            user_id:this.navParams.get('user_id')
        }
    }

    showRoomUsers() {
        this.modalCtrl.create(UsersListPage, this.data).present();
    }

    quitRoom() {
        this.viewCtrl.dismiss().then(() => {
            this.socket.emit('quit room',  this.data.room);
        });
    }
}