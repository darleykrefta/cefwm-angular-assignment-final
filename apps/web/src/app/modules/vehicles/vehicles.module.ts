import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { VehiclesRoutingModule } from './vehicles-routing.module';

import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [ListComponent, FormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    VehiclesRoutingModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    SidebarModule,
    CalendarModule,
  ],
})
export class VehiclesModule {}
