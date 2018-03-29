import {Component, ViewChild} from '@angular/core';
import {Navbar, NavController, NavParams} from 'ionic-angular';
import {Socket} from 'ng-socket-io';
import {MessagesProvider} from "../../providers/messages/messages";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersProvider} from "../../providers/users/users";
import {RoomsProvider} from "../../providers/rooms/rooms";

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

    @ViewChild(Navbar) navBar: Navbar;
    @ViewChild('content') content:any;
    room:{id:number, name:string, numUsers:number};
    todo : FormGroup;
    usersTyping:[number];
    sentenceTypying:string = "";
    isTyping:boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
                public socket: Socket, public messagesProvider: MessagesProvider, public usersProvider: UsersProvider,
                public roomsProvider: RoomsProvider) {
        this.room = this.navParams.get('room');
        this.socket.emit('join room', this.room);
        this.todo = this.formBuilder.group({
            message: ['', Validators.required],
        });

        this.socket.on('new typing', (user_id:number) => {
             console.log(user_id);
             this.usersTyping.push(user_id);
             console.log(this.usersTyping);
             this.refreshSentenceTyping();
        });

        this.socket.on('end typing', (user_id:number) => {
            console.log(user_id);
            let index = this.usersTyping.indexOf(user_id);
            if (index > -1) {
                this.usersTyping.slice(index, 1);
            }
            console.log(this.usersTyping);
            this.refreshSentenceTyping();
        });
    }

    ionViewDidLoad() {
        this.navBar.backButtonClick = (ev:UIEvent) => {
            this.navCtrl.pop().then(() => {
                this.socket.emit('leave room', this.room);
            });
        };
    }

    refreshSentenceTyping() {
        if (this.usersTyping.length > 0) {

            let usernames = [];
            this.usersTyping.forEach((user_id) => {
                usernames.push(this.usersProvider.users.find(x => x.id === user_id).username);
            });

            this.sentenceTypying += usernames.join(', ');
            this.sentenceTypying += this.usersTyping.length > 1 ? " are typing..." : " is typing...";

        } else {
            this.sentenceTypying = "";
        }
    }

    ionViewDidEnter(){
        this.content.scrollToBottom(300);
    }

    sendMessage() {
        let data = {
            room: this.room,
            message: this.todo.value.message
        };
        this.socket.emit('send message', data);
    }

    typingMessage() {
        if (!this.isTyping) {
            this.isTyping = true;
            this.socket.emit('start typing', {room:this.room});
        }
        let lastTypingTime = (new Date()).getTime();

        setTimeout(() => {
            let typingTimer = (new Date()).getTime();
            let timeDiff = typingTimer - lastTypingTime;
            if (timeDiff >= 400 && this.isTyping) {
                this.socket.emit('stop typing', {room:this.room});
                this.isTyping = false;
            }
        }, 400);

    }


}
