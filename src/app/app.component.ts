import { Component } from '@angular/core';
import { RoomComponent } from './components/room/room.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RoomComponent],
  template: `<app-room></app-room>`,
})
export class AppComponent {}
