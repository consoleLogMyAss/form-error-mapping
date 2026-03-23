import { HttpClient, HttpContext } from '@angular/common/http';
import { inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { VALIDATION_FORM } from '../../../shared/models/validation-error.model';

export class ApiService {
  private http: HttpClient = inject(HttpClient)

  public postTest(body: any): void {
    this.http.post('http://localhost:3000/test', body).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    })
  }
}
