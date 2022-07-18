import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'cefwm-angular-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public formGroup: FormGroup = this.formBuilder.group({
    email: ['', Validators.email],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  public login() {
    this.authService
      .auth(this.formGroup.value)
      .pipe(
        take(1),
        catchError((error: HttpErrorResponse) => {
          return of(undefined);
        })
      )
      .subscribe((result: { _id: string; token: string } | undefined) => {
        if (!result) {
          this.messageService.add({
            severity: 'error',
            summary: 'Login ou senha incorretos',
            detail: 'Tente novamente',
          });
          return;
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Login efetuado com sucesso',
          detail: 'Seja bem vindo',
        });
        this.router.navigate(['/']);
        localStorage.setItem('TOKEN-PARKER-APP', result.token);
        localStorage.setItem('USER-ID-PARKER-APP', result._id);
      });
    console.log(this.formGroup.value);
  }
}
