import {Component, ViewChild} from '@angular/core';
import {Navbar, NavController, NavParams} from 'ionic-angular';
import {Socket} from 'ng-socket-io';
import {MessagesProvider} from "../../providers/messages/messages";

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

    @ViewChild(Navbar) navBar: Navbar;
    room:{id:number, name:string, numUsers:number};

    constructor(public navCtrl: NavController, public navParams: NavParams, public socket: Socket, public messagesProvider: MessagesProvider) {
        this.room = this.navParams.get('room');
        this.socket.emit('join room', this.room);

    }

    ionViewDidLoad() {
        this.navBar.backButtonClick = (ev:UIEvent) => {
            this.navCtrl.pop().then(() => {
                this.socket.emit('leave room', this.room);
            });
        }
    }


}
