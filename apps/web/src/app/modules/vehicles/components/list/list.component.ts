import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle, ShortTermParking } from '@cefwm-angular/common';
import { VehicleService } from '../../services/vehicle.service';
import { ParkingService } from '../../services/parking.service';
import { MessageService } from 'primeng/api';
import { of, Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'cefwm-angular-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  public display = false;
  showTime = true;
  format = '24';
  public selectedVehicle: Vehicle = {} as Vehicle;
  public selectedVehicleParkings: Array<ShortTermParking> = [];
  public now: Date = new Date();
  public validFrom: Date = new Date();
  public validUntil: Date = new Date();
  public shortTermParking: ShortTermParking = {} as ShortTermParking;
  public vehicles$: Observable<Array<Vehicle>> = this.vehicleService.getAll();
  constructor(
    private vehicleService: VehicleService,
    private parkingService: ParkingService,
    private messageService: MessageService
  ) {}

  handleSelectedVehicle(vehicle: Vehicle): void {
    this.getVehicleParkers(vehicle._id);
    this.selectedVehicle = vehicle;
    this.display = true;
  }

  createNewParking(vehicleId: string): void {
    this.parkingService
      .create({
        valid_from: this.validFrom,
        valid_until: this.validUntil,
        vehicle_id: vehicleId,
      })
      .pipe(
        take(1),
        catchError((error: HttpErrorResponse) => {
          return of(undefined);
        })
      )
      .subscribe((result: { _id: string } | undefined) => {
        if (!result) {
          this.messageService.add({
            severity: 'error',
            summary: 'Unexpected error',
            detail: 'try again',
          });
          return;
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Short term parking created',
        });
        this.display = false;
      });
  }

  getVehicleParkers(vehicleId: string) {
    this.parkingService
      .getByVehicle(vehicleId)
      .subscribe((parkings: Array<ShortTermParking>) => {
        this.selectedVehicleParkings = parkings;
      });
  }
}
