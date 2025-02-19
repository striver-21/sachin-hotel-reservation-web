import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private baseUrl = 'http://82.29.161.117/api';

  constructor(private http: HttpClient) {}

  bookRooms(numRooms: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/book`, { numRooms });
  }

  resetBookings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reset`);
  }

  getRoomStatus(): Observable<any> {
    return this.http.get(`${this.baseUrl}/status`);
  }

  getRandomRoom(): Observable<any> {
    return this.http.get(`${this.baseUrl}/random`);
  }
}
