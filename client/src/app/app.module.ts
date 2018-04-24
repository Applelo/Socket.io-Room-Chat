import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MyRoomsPage} from "../pages/my-rooms/my-rooms";
import { ChooseRoomPage} from "../pages/choose-room/choose-room";
import {MessagesPage} from "../pages/messages/messages";
import {MessagesMenu} from "../pages/messages/messages-menu";
import {CreateRoomPage} from "../pages/create-room/create-room";
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { RoomsProvider } from '../providers/rooms/rooms';
import { MessagesProvider } from '../providers/messages/messages';
import { UsersProvider } from '../providers/users/users';
import {UsersListPage} from "../pages/users-list/users-list";
import {Push} from "@ionic-native/push";
const config: SocketIoConfig = {
    url: 'http://localhost:3000',
    options: {}
};

@NgModule({
  declarations: [
      MyApp,
      HomePage,
      MyRoomsPage,
      ChooseRoomPage,
      CreateRoomPage,
      MessagesPage,
      MessagesMenu,
      UsersListPage
  ],
  imports: [
      BrowserModule,
      SocketIoModule.forRoot(config),
      IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
      MyApp,
      HomePage,
      MyRoomsPage,
      ChooseRoomPage,
      CreateRoomPage,
      MessagesPage,
      MessagesMenu,
      UsersListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RoomsProvider,
    MessagesProvider,
    UsersProvider,
      Push
  ]
})
export class AppModule {}
