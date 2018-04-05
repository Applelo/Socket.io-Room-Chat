import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {Socket} from 'ng-socket-io';
import {UsersProvider} from "../../providers/users/users";
import {MyRoomsPage} from "../my-rooms/my-rooms";
import {RoomsProvider} from "../../providers/rooms/rooms";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    todo : FormGroup;

    constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private socket: Socket,
                public usersProvider: UsersProvider, public roomsProvider: RoomsProvider) {
        this.todo = this.formBuilder.group({
            pseudo: ['', Validators.required],
        });
        this.socket.on('login', response => {
            this.usersProvider.users = response.users;
            this.usersProvider.user_id = response.user_id;
            this.roomsProvider.rooms = response.rooms;
            this.navCtrl.push(MyRoomsPage);
        });
    }

    logForm() {
        this.socket.connect();
        this.socket.emit('add user', this.todo.value.pseudo);
    }

}
