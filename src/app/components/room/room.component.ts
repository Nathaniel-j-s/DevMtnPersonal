import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  id: any;
  room: any;
  imageUrl: any;

  constructor(
    private firebaseService:FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.firebaseService.getRoomDetails(this.id).subscribe(room => {
      this.room = room;
      let storageRef = firebase.storage().ref();
      let spaceRef = storageRef.child(this.room.path);
      storageRef.child(this.room.path).getDownloadURL().then((url) => {
        this.imageUrl = url;
      }).catch((err) => {
        console.log(err);
      })
    });
  }

  onDeleteClick() {
    this.firebaseService.deleteRoom(this.id);
    this.router.navigate(['/rooms']);
  }

}
