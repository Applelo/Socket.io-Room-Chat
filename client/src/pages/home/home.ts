import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {ChooseRoomPage} from "../choose-room/choose-room";
import {Socket} from 'ng-socket-io';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    todo : FormGroup;

    constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private socket: Socket) {
        this.todo = this.formBuilder.group({
            pseudo: ['', Validators.required],
        });
        this.socket.on('login', response => {
            this.navCtrl.push(ChooseRoomPage,  response);
        });
    }

    logForm() {
        this.socket.connect();
        this.socket.emit('add user', this.todo.value.pseudo);
    }

}
