import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
  rooms: FirebaseListObservable<any[]>;
  room: FirebaseObjectObservable<any[]>;
  folder: any;

  constructor(private af: AngularFire) {
    this.folder = 'roomImages';
   }

  getRooms() {
    this.rooms = this.af.database.list('/rooms') as FirebaseListObservable<Room[]>
    return this.rooms;
  }

  getRoomDetails(id) {
    this.room = this.af.database.object('/rooms/'+id) as FirebaseObjectObservable<Room>;
    return this.room;
  }

  addRoom(room) {
    let storageRef = firebase.storage().ref();
    if (room.image) {
      for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
        let path = `/${this.folder}/${selectedFile.name}`;
        let iRef = storageRef.child(path);
        iRef.put(selectedFile).then((snapshot) => {
          room.image = selectedFile.name;
          room.path = path;
          return this.rooms.push(room);
        });
      }
    }
    return this.rooms.push(room);
  }
}

interface Room{
  $key?: string;
  title?: string;
  type?: string;
  image?: string;
  city?: string;
  owner?: string;
  bedrooms?: string;
}
