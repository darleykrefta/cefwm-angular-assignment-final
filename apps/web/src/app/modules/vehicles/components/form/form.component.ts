import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Vehicle } from '@cefwm-angular/common';
import { VehicleService } from '../../services/vehicle.service';
import { MessageService } from 'primeng/api';
import { of, Subject } from 'rxjs';
import { catchError, take, map, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'cefwm-angular-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  private subDestruction: Subject<void> = new Subject();

  public isEdit = false;

  public _id: FormControl = new FormControl('');
  public brand: FormControl = new FormControl('', Validators.required);
  public model: FormControl = new FormControl('', Validators.required);
  public plate: FormControl = new FormControl('', Validators.required);

  public formGroup: FormGroup = this.formBuilder.group({
    _id: this._id,
    brand: this.brand,
    model: this.model,
    plate: this.plate,
  });

  constructor(
    private formBuilder: FormBuilder,
    private vehicleService: VehicleService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        map((params: Params) => {
          const vehicleId = params['id'];
          if (vehicleId) {
            this.isEdit = true;
          } else {
            this.isEdit = false;
          }
          return vehicleId;
        }),
        takeUntil(this.subDestruction)
      )
      .subscribe((id: string) => {
        if (this.isEdit) {
          this.vehicleService
            .getById(id)
            .pipe(takeUntil(this.subDestruction))
            .subscribe((vehicle: Vehicle) => {
              this.formGroup.setValue(vehicle);
            });
        }
      });
  }

  submitForm(vehicle: Vehicle): void {
    if (this.isEdit) {
      this.vehicleService
        .update({
          _id: vehicle._id,
          brand: vehicle.brand,
          model: vehicle.model,
          plate: vehicle.plate,
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
            summary: 'Vehicle updated',
          });
          this.router.navigate(['/vehicles']);
        });
      return;
    }
    this.vehicleService
      .create({
        brand: vehicle.brand,
        model: vehicle.model,
        plate: vehicle.plate,
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
          summary: 'Vehicle created',
        });
        this.router.navigate(['/vehicles']);
      });
  }
}
