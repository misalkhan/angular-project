import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  constructor(private router: Router, private http: HttpClient) { }
  user: any = {}
  ngOnInit(): void {
    this.userInfo()
  }


  editProfile() {
    this.router.navigate(['/edit-profile'])
  }
  viewPosts() {
    console.log('herreeee')
    this.router.navigate(['/dashboard'])
  }

  userInfo() {
    let token = localStorage.getItem('token');
    try {
      this.http.get<any>(`https://angular-project-server.vercel.app/user/userInfo`, {
        headers: {
          'Content-Type': 'application/json',
          'token': token || ''
        }
      }).subscribe((response) => {
        console.log(response);
        this.user = response
      },
        (error => {
          console.error('An error occurred:', error);
          alert(error)
          return
        }))
    } catch (error) {
      console.log(error)
    }
  }
}
