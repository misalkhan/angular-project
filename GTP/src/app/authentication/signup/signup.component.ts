import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private router: Router, private http: HttpClient) { }

   userSignUp(signUpForm: NgForm) {
    let data = signUpForm.value
    console.log('here')
    if (!data.email||!data.email.trim()  || !data.password || !data.name || !data.name.trim() ) {
      alert('All fields are required')
      return
    }
    let user = JSON.stringify(data)
    console.log(user)
    try {
      this.http.post<any>(`https://angular-project-server.vercel.app/user/signup`, user, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).subscribe((response) => {
        const data = response
        alert(data.message)
        signUpForm.reset()
        this.router.navigate(['/login'])
      },
        (error => {
          console.error('An error occurred:', error);
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
