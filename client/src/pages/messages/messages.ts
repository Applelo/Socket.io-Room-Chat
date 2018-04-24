import {Component, ViewChild} from '@angular/core';
import {Navbar, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Socket} from 'ng-socket-io';
import {MessagesProvider} from "../../providers/messages/messages";
import {MessagesMenu} from "./messages-menu";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersProvider} from "../../providers/users/users";

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

    @ViewChild(Navbar) navBar: Navbar;
    @ViewChild('content') content:any;
    room:{id:number, name:string, numUsers:number};
    todo : FormGroup;
    usersTyping = [];
    sentenceTypying:string = "";
    isTyping:boolean = false;
    message:string = "";

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private formBuilder: FormBuilder, public socket: Socket,
                public popoverCtrl: PopoverController, public messagesProvider: MessagesProvider,
                public usersProvider: UsersProvider) {
        this.room = this.navParams.get('room');
        console.log('actual room', this.room);
        this.messagesProvider.messages = this.navParams.get('messages');

        this.todo = this.formBuilder.group({
            message: ['', Validators.required],
        });

        this.socket.on('new typing', (user_id:number) => {
             if (this.usersTyping.indexOf(user_id) == -1)  {
                 this.usersTyping.push(user_id);
             }
             this.refreshSentenceTyping();
        });

        this.socket.on('end typing', (user_id:number) => {
            this.usersTyping = this.usersTyping.filter(item => item !== user_id);
            this.refreshSentenceTyping();
        });

        socket.removeListener('go quit room');
        this.socket.on('go quit room', () => {
            this.socket.emit('leave room', this.room);
        });

        socket.removeListener('go leave room');
        this.socket.on('go leave room', () => {

            this.navCtrl.pop();

        });

    }

    ionViewDidLoad() {
        this.navBar.backButtonClick = (ev:UIEvent) => {
            this.socket.emit('leave room', this.room);
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
        this.message = "";
        this.content.scrollToBottom(300);
    }

    typingMessage() {
        if (!this.isTyping) {
            this.isTyping = true;
            this.socket.emit('start typing', this.room.id);
        }
        let lastTypingTime = (new Date()).getTime();

        setTimeout(() => {
            let typingTimer = (new Date()).getTime();
            let timeDiff = typingTimer - lastTypingTime;
            if (timeDiff >= 1000 && this.isTyping) {
                this.socket.emit('stop typing', this.room.id);
                this.isTyping = false;
            }
        }, 1000);

    }

    presentPopover(ev) {
        let data = {
            room:this.room,
            users:this.usersProvider.users,
            user_id:this.usersProvider.user_id
        };
        let popover = this.popoverCtrl.create(MessagesMenu, data);
        popover.present({
            ev: ev
        });
    }


}
