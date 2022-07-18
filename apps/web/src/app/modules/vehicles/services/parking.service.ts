import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShortTermParking } from '@cefwm-angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  constructor(private httpClient: HttpClient) {}

  public getByVehicle(vehicleId: string): Observable<ShortTermParking[]> {
    return this.httpClient.get<ShortTermParking[]>(
      `http://localhost:3333/api/parkings?vehicle_id=${vehicleId}`
    );
  }

  public create(parker: {
    valid_from: Date;
    valid_until: Date;
    vehicle_id: string;
  }): Observable<{ _id: string }> {
    return this.httpClient.post<{ _id: string }>(
      'http://localhost:3333/api/parkings',
      parker
    );
  }
}
