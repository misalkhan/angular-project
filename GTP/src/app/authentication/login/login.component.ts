import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private http: HttpClient) { }

  userLogin(loginForm: NgForm) {
    let data = loginForm.value
    if (!data.email || !data.email.trim()  || !data.password) {
      alert('Please enter email & Password')
      return;
    }
    let user = JSON.stringify(data)
    console.log(user)
    try {
      this.http.post<any>(`https://angular-project-server.vercel.app/user/login`, user, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).subscribe((response) => {
        const data = response
        localStorage.setItem('token', JSON.stringify(data.token))
        alert(data.message)
        loginForm.reset()
        this.router.navigate(['/dashboard'])
      },
        (error => {
          console.error('An error occurred:', error.message);
          alert(error.message)
          return

        })
      )
    }
    catch (error) {
      console.error('An error occurred:', error);
      alert(error)
      return
    }
  }
}
