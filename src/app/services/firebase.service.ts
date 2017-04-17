import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
  rooms: FirebaseListObservable<any[]>;
  room: FirebaseObjectObservable<any>;
  folder: any;
  user: FirebaseObjectObservable<any>;

  constructor(private af: AngularFire) {
    this.folder = 'roomImages';
    this.rooms = this.af.database.list('/rooms') as FirebaseListObservable<Room[]>;
   }

  getRooms() {
    return this.rooms;
  }

  getRoomDetails(id) {
    this.room = this.af.database.object('/rooms/'+id) as FirebaseObjectObservable<Room>;
    return this.room;
  }

  addRoom(room) {
    let storageRef = firebase.storage().ref();
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

  updateRoom(id, room) {
    return this.rooms.update(id, room);
  }

  deleteRoom(id) {
    return this.rooms.remove(id);
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
