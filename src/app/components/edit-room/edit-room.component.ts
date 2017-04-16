import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {
  id;
  title;
  owner;
  city;
  bedrooms;
  price;
  image;
  type;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.firebaseService.getRoomDetails(this.id).subscribe(room => {
      console.log(room);
      this.title = room.title;
      this.owner = room.owner;
      this.city = room.city;
      this.bedrooms = room.bedrooms;
      this.type = room.type;
      this.price = room.price;
    });
  }

  onEditSubmit() {
    let room = {
      title: this.title,
      owner: this.owner,
      city: this.city,
      bedrooms: this.bedrooms,
      type: this.type,
      price: this.price
    }

    this.firebaseService.updateRoom(this.id, room);
    this.router.navigate(['/rooms']);
  }

}
