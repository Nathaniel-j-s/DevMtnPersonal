import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Injectable()
export class FirebaseService {
  rooms: FirebaseListObservable<any[]>;
  room: FirebaseObjectObservable<any[]>;
  constructor(private af: AngularFire) { }

  getRooms() {
    this.rooms = this.af.database.list('/rooms') as FirebaseListObservable<Room[]>
    return this.rooms;
  }

  getRoomDetails(id) {
    this.room = this.af.database.object('/rooms/'+id) as FirebaseObjectObservable<Room>;
    return this.room;
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
