import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle,   } from '@cefwm-angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<Vehicle[]> {
    const userId = localStorage.getItem('USER-ID-PARKER-APP');
    return this.httpClient.get<Vehicle[]>(
      `http://localhost:3333/api/vehicles?user_id=${userId}`
    );
  }

  public getById(id: string): Observable<Vehicle> {
    const userId = localStorage.getItem('USER-ID-PARKER-APP');
    return this.httpClient.get<Vehicle>(
      `http://localhost:3333/api/vehicles/${id}?user_id=${userId}`
    );
  }

  public create(vehicle: {
    brand: string;
    model: string;
    plate: string;
  }): Observable<{ _id: string }> {
    const userId = localStorage.getItem('USER-ID-PARKER-APP');
    const newVehicle = {
      ...vehicle,
      user_id: userId,
    };
    return this.httpClient.post<{ _id: string }>(
      'http://localhost:3333/api/vehicles',
      newVehicle
    );
  }

  public update(vehicle: {
    _id: string;
    brand: string;
    model: string;
    plate: string;
  }): Observable<{ _id: string }> {
    const userId = localStorage.getItem('USER-ID-PARKER-APP');
    const newVehicle = {
      ...vehicle,
      user_id: userId,
    };
    return this.httpClient.put<{ _id: string }>(
      `http://localhost:3333/api/vehicles/${vehicle._id}`,
      newVehicle
    );
  }
}
