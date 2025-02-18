import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  numRooms: number = 1;
  rooms: { room_number: number, is_occupied: boolean }[][] = [];
  totalFloors = 10;
  roomsPerFloor = 10;
  errorMessage: string = '';

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.getRoomStatus();
  }

  bookRooms() {
    this.roomService.bookRooms(this.numRooms)
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe(() => {
        this.getRoomStatus();
      });
  }

  resetBookings() {
    this.roomService.resetBookings()
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe(() => {
        this.getRoomStatus();
      });
  }

  getRoomStatus() {
    this.roomService.getRoomStatus()
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe((data: any) => {
        this.rooms = this.formatRoomData(data);
      });
  }

  randomBooking() {
    this.roomService.getRandomRoom()
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe(() => {
        this.getRoomStatus();
      });
  }

  formatRoomData(data: any[]): { room_number: number, is_occupied: boolean }[][] {
    let grid = [];
    for (let i = 0; i < this.totalFloors; i++) {
      grid.push(data.slice(i * this.roomsPerFloor, (i + 1) * this.roomsPerFloor).map(room => ({
        room_number: room.room_number,
        is_occupied: room.is_occupied === 1
      })));
    }
    return grid;
  }

  handleError(error: any) {
    console.error('An error occurred:', error);

    if (error.error && error.error.error) {
      this.errorMessage = error.error.error;
    } else {
      this.errorMessage = 'Something went wrong. Please try again later.';
    }

    return of([]);
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }
}
