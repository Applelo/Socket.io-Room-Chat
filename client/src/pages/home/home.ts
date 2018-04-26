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

        this.socket.removeListener('login');
        this.socket.on('login', () => {
            this.navCtrl.push(MyRoomsPage);
        });
    }

    ionViewWillEnter() {
        if (this.usersProvider.user_id > 0) {
            this.usersProvider.users = undefined;
            this.usersProvider.user_id = undefined;
            this.roomsProvider.rooms = undefined;
            this.roomsProvider.myRoomsId = undefined;
            this.socket.disconnect();
        }
    }

    logForm() {
        this.socket.connect();
        this.socket.emit('add user', this.todo.value.pseudo);
    }

}
