import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  editProfile: FormGroup;
  constructor(private router: Router,private http:HttpClient,private fb: FormBuilder) {
    this.editProfile = this.fb.group({
    name: [''],
    email: [{ value: '', disabled: true }], 
    password:[{ value: '', disabled: true }],
  }); }
  ngOnInit(): void {
  this.getUser()
  }

  // editProfile = new FormGroup({
  //   name: new FormControl(''),
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  // })

   getUser() {
    let token = localStorage.getItem('token');
    try {
      this.http.get<any>(`https://angular-project-server.vercel.app/user/userInfo`, {
        headers: {
          'Content-Type': 'application/json',
          'token': token || ''
        }
      }).subscribe((response) => {
        console.log(response);
        this.editProfile.setValue({
          name: response.name,
          email: response.email,
          password: response.password
        })
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

   edit(){
    let token = localStorage.getItem('token');
    console.log(this.editProfile.value)
    let data = this.editProfile.value;
    if (!data.name || data.name.trim() === '') {
      alert('Please enter name')
      return;
    }
    try {
      this.http.put<any>(`https://angular-project-server.vercel.app/user/userInfo`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'token': token || ''
        }
      }).subscribe((response) => {
        console.log(response);
        this.router.navigate(['/user-profile'])
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
