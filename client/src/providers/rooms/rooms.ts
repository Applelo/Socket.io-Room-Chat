import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import {Events} from "ionic-angular";

@Injectable()
export class RoomsProvider {

    private _rooms;
    private _searchWord:string = "";
    private _searchRooms;
    private _myRooms;
    private _myRoomsId;
    private _roomsNotJoin;

  constructor(public socket: Socket, public events: Events) {}

  listener() {
      this.socket.on('update rooms', rooms => {

          if (rooms.lenght == 0) {
              //prevent error
              this.socket.emit('need update rooms');
          }
          else {
              this.rooms = rooms;
              this.refreshMyRooms();
              this.refreshRoomsNotJoin();

              this.events.publish('rooms updated');
          }
      });

  }

    get rooms() {
        return this._rooms;
    }

    set rooms(value) {
        this._rooms = value;
    }

    /*region searchWord*/
    get searchWord():string {
        return this._searchWord;
    }

    set searchWord(value:string) {
        this._searchWord = value;
        this.refreshSearchRooms();
    }

    get searchRooms() {
        return this._searchRooms;
    }

    set searchRooms(value) {
        this._searchRooms = value;
    }

   refreshSearchRooms() {
       this.searchRooms = [];
      if (this.searchWord && this.roomsNotJoin !== undefined) {
        for (let i = 0; i < this.roomsNotJoin.length; i++) {
            if (this.roomsNotJoin[i].name.toLowerCase().includes(this.searchWord)) {
                this.searchRooms.push(this.roomsNotJoin[i]);
            }
        }
      }
    }
    /*endregion */
    /*region myRooms*/
    get myRooms() {
        return this._myRooms;
    }

    set myRooms(value) {
        this._myRooms = value;
    }

    get myRoomsId() {
        return this._myRoomsId;
    }

    set myRoomsId(value) {
        this._myRoomsId = value;
        this.refreshMyRooms();
        this.refreshRoomsNotJoin();
    }

    refreshMyRooms() {
        if (this.myRoomsId === undefined) {
            this.myRoomsId = [];
        }
        if (this.rooms !== undefined) {
            this.myRooms = [];
            for (let i = 0; i < this.rooms.length; i++) {
                for (let j = 0; j < this.myRoomsId.length; j++) {
                    if (this.rooms[i].id == this.myRoomsId[j]) {
                        this.myRooms.push(this.rooms[i]);
                    }
                }
            }
        }

    }

    get roomsNotJoin() {
        return this._roomsNotJoin;
    }

    set roomsNotJoin(value) {
        this._roomsNotJoin = value;
    }

    refreshRoomsNotJoin() {
        if (this.myRoomsId === undefined) {
            this.myRoomsId = [];
        }
        if (this.rooms !== undefined) {

            this.roomsNotJoin = this.rooms.slice(0);

            for (let i = 0; i < this.myRoomsId.length; i++) {
                let index = this.roomsNotJoin.indexOf(this.roomsNotJoin.find(x => x.id === this.myRoomsId[i]));
                this.roomsNotJoin.splice(index, 1);
            }


        }

    }

    /*endregion*/
}
