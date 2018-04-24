import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {Socket} from "ng-socket-io";


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

        this.socket.on('room created', room => {
            this.navCtrl.pop().then(() => {
                this.navCtrl.pop().then(() => {
                    socket.emit('connect room', room);

                });
            });
        });
    }

    createRoomForm() {
        this.socket.emit('add room', this.todo.value.name);
    }



}
