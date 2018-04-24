import { Component } from '@angular/core';
import { Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {UsersProvider} from "../providers/users/users";
import {MessagesProvider} from "../providers/messages/messages";
import {RoomsProvider} from "../providers/rooms/rooms";
import {Push} from "@ionic-native/push";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, push: Push,
              usersProvider: UsersProvider, messagesProvider: MessagesProvider, roomsProvider: RoomsProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //global change listener send by server
      usersProvider.listener();
      roomsProvider.listener();
      messagesProvider.listener();
      if (platform.is('cordova')) {
          push.hasPermission().then((res: any) => {

              if (res.isEnabled) {
                  console.log('We have permission to send push notifications');
              } else {
                  console.log('We do not have permission to send push notifications');
              }

          });
      }



    });
  }
}

