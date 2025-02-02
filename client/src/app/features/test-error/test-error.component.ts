import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-test-error',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.scss'
})
export class TestErrorComponent {
  baseURL = 'https://localhost:5001/api/'
  private http = inject(HttpClient);
  validationErrors? : string[];
  get404Error(){
    this.http.get(this.baseURL + 'buggy/notfount').subscribe({
      next: response => console.log(response),
      error : error => console.log(error)
    })
  }
  
  get400Error(){
    this.http.get(this.baseURL + 'buggy/badrequest').subscribe({
      next: response => console.log(response),
      error : error => console.log(error)
    })
  }
  
  get401Error(){
    this.http.get(this.baseURL + 'buggy/Unauthrized').subscribe({
      next: response => console.log(response),
      error : error => console.log(error)
    })
  }
  
  get500Error(){
    this.http.get(this.baseURL + 'buggy/internalerror').subscribe({
      next: response => console.log(response),
      error : error => console.log(error)
    })
  }
  
  get400validationerror(){
    this.http.post(this.baseURL + 'buggy/validationerror', {}).subscribe({
      next: response => console.log(response),
      error : error => this.validationErrors = error
    })
  }
}
