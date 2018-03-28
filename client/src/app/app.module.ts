import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChooseRoomPage} from "../pages/choose-room/choose-room";
import {MessagesPage} from "../pages/messages/messages";
import {CreateRoomPage} from "../pages/create-room/create-room";
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { RoomsProvider } from '../providers/rooms/rooms';
import { MessagesProvider } from '../providers/messages/messages';
import { UsersProvider } from '../providers/users/users';
const config: SocketIoConfig = {
    url: 'http://localhost:3000',
    options: {}
};

@NgModule({
  declarations: [
      MyApp,
      HomePage,
      ChooseRoomPage,
      CreateRoomPage,
      MessagesPage
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
      ChooseRoomPage,
      CreateRoomPage,
      MessagesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RoomsProvider,
    MessagesProvider,
    UsersProvider
  ]
})
export class AppModule {}
