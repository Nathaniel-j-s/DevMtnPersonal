import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {
  title: any;
  price: any;
  beds: any;
  occupants: any;
  smoking: any;
  pets: any;
  additional: any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onAddSubmit(){
    let room =  {
      title: this.title,
      price: this.price,
      beds: this.beds,
      occupants: this.occupants,
      smoking: this.smoking,
      pets: this.pets,
      additional: this.additional
    }
    //debugger;
    this.firebaseService.addRoom(room);
    //debugger;
    this.router.navigate(['rooms']);
  }

}
