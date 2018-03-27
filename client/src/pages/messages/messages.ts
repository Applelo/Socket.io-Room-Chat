import {Component, ViewChild} from '@angular/core';
import {Navbar, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
    @ViewChild(Navbar) navBar: Navbar;
    private room:{id:number, name:string, numUsers:number};
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.room = this.navParams.get('room');

    }

    ionViewDidLoad() {
        this.navBar.backButtonClick = (ev:UIEvent) => {
            //this.navCtrl.pop();
        }
    }


}
