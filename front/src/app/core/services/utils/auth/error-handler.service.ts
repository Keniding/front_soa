import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthStateService } from '../../state/auth-state.service';
import {HttpError} from "../../../../models/interfaces/utils/http-error.interface";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private authStateService: AuthStateService) {}

  handleError(error: HttpErrorResponse): HttpError {
    const errorResponse: HttpError = {
      status: error.status,
      message: error.error?.message || 'Ha ocurrido un error',
      errors: error.error?.errors
    };

    switch (errorResponse.status) {
      case 401:
        this.authStateService.handleUnauthorized();
        break;
      case 403:
        break;
      case 404:
        break;
      default:
        console.error('Error no manejado:', errorResponse);
    }

    return errorResponse;
  }
}
