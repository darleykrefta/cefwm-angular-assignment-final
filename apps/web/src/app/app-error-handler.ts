import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(
    private ngZone: NgZone,
    private messageService: MessageService,
    private router: Router
  ) {
    super();
  }

  public handleError(error: Error): void {
    if (error instanceof HttpErrorResponse) {
      return this.handleHttpErrorResponse(error);
    }
  }

  handleHttpErrorResponse(error: HttpErrorResponse) {
    this.ngZone.run(() => {
      if (error.status === 401) {
        this.router.navigate(['/login']);
        this.messageService.add({
          severity: 'error',
          summary: `Erro`,
          detail: `Você precisa fazer login para acessar esse recurso`,
        });
        return;
      }

      this.messageService.add({
        severity: 'error',
        summary: `Erro inesperado: [${error.status}] [${error.statusText}]`,
        detail: `${error.error}`,
      });
    });
  }
}
