import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class FirebaseService {
  rooms: FirebaseListObservable<any[]>;
  constructor(private af: AngularFire) { }

  getRooms() {
    this.rooms = this.af.database.list('/rooms') as FirebaseListObservable<Room[]>
    return this.rooms;
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
