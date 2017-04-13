import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import {FirebaseService} from './services/firebase.service';
import {FlashMessagesModule} from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { EditRoomComponent } from './components/edit-room/edit-room.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { RoomComponent } from './components/room/room.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CalendarComponent } from './components/calendar/calendar.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyAsJEPCKe9ls5f30s1aqf7u_RRTZR7Y8A8',
  authDomain: 'devmtnpersonal.firebaseapp.com',
  databaseURL: 'https://devmtnpersonal.firebaseio.com',
  storageBucket: 'devmtnpersonal.appspot.com',
  messagingSenderId: '579372619427'
};

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};

const appRoutes: Routes = [
  {path:'', component:HomeComponent},
  {path:'rooms', component:RoomsComponent},
  {path:'room/:id', component:RoomComponent},
  {path:'calendar', component:CalendarComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoomsComponent,
    EditRoomComponent,
    AddRoomComponent,
    RoomComponent,
    NavbarComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
