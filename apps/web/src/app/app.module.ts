import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppErrorHandler } from './app-error-handler';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabMenuModule } from 'primeng/tabmenu';

import { AppComponent } from './app.component';
import { JwtInterceptor } from './jwt.interceptor';
import { MessageService } from 'primeng/api';
import { AuthModule } from './modules/auth/auth.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AuthModule,
    VehiclesModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastModule,
    MessageModule,
    TabMenuModule,
    ButtonModule,
    CardModule,
    HttpClientModule,
  ],
  providers: [
    MessageService,
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
