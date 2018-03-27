import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {Socket} from "ng-socket-io";
import {ChooseRoomPage} from "../choose-room/choose-room";
import {MessagesPage} from "../messages/messages";
/**
 * Generated class for the CreateRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-room',
  templateUrl: 'create-room.html',
})
export class CreateRoomPage {
    todo : FormGroup;

    constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private socket: Socket) {
        this.todo = this.formBuilder.group({
            name: ['', Validators.required],
        });
        this.socket.on('login', response => {
            this.navCtrl.push(ChooseRoomPage,  response);
        });
        this.socket.on('go room', room => {
            this.navCtrl.pop().then(()=> {
                this.navCtrl.push(MessagesPage, {room: room});
            });
        });
    }

    createRoomForm() {
        this.socket.emit('add room', this.todo.value.name);
    }



}
