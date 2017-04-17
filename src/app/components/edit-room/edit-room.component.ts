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
  price;
  beds;
  occupants;
  smoking;
  pets;
  additional;

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
      this.price = room.price;
      this.beds = room.beds;
      this.occupants = room.occupants;
      this.smoking = room.smoking;
      this.pets = room.pets;
      this.additional = room.additional;
    });
  }

  onEditSubmit() {
    let room = {
      title: this.title,
      price: this.price,
      beds: this.beds,
      occupants: this.occupants,
      smoking: this.smoking,
      pets: this.pets,
      additional: this.additional
    }

    this.firebaseService.updateRoom(this.id, room);
    this.router.navigate(['/rooms']);
  }

}
