import {Component, ViewChild} from '@angular/core';
import {Navbar, NavController, NavParams} from 'ionic-angular';
import {Socket} from 'ng-socket-io';
import {MessagesProvider} from "../../providers/messages/messages";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersProvider} from "../../providers/users/users";

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

    @ViewChild(Navbar) navBar: Navbar;
    room:{id:number, name:string, numUsers:number};
    todo : FormGroup;

    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
                public socket: Socket, public messagesProvider: MessagesProvider, public usersProvider: UsersProvider) {
        this.room = this.navParams.get('room');
        this.socket.emit('join room', this.room);
        this.todo = this.formBuilder.group({
            message: ['', Validators.required],
        });
    }

    ionViewDidLoad() {
        this.navBar.backButtonClick = (ev:UIEvent) => {
            this.navCtrl.pop().then(() => {
                this.socket.emit('leave room', this.room);
            });
        }
    }

    sendMessage() {
        let data = {
            room: this.room,
            message: this.todo.value.message
        };
        this.socket.emit('send message', data);
    }

    writeMessage() {

    }


}
