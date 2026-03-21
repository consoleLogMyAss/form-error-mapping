import {HttpClient} from '@angular/common/http';
import {inject} from '@angular/core';

export class ApiService {
  private http: HttpClient = inject(HttpClient)

  public postTest(body: any): void {
    this.http.post('http://localhost:3000/test', body).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    })
  }

  public postData(body: any): void {
    this.http.post('http://localhost:3000/testData', body).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    })
  }
}
