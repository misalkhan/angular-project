import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  constructor(private router:Router,private http:HttpClient) {}
  createPost = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  })

  create(){
    console.log(this.createPost.value);
      let post = this.createPost.value
      if (!post.title || !post.title.trim() || !post.content?.trim() || !post.content) {
        alert('Please enter title & Content both')
        return;
      }
      let token=localStorage.getItem('token')
      let postData=JSON.stringify(post)
      try {
        this.http.post<any>('https://angular-project-server.vercel.app/post/create', postData, {
           headers: {
             'Content-Type': 'application/json',
             'token': token || ''
           }
         }).subscribe((response) => {
          const data = response
          alert(data.message)
          this.createPost.reset(); 
          this.router.navigate(['/dashboard'])
         },
           (error => {
             console.error('An error occurred:', error);
             alert(error)
             return
           }))
       } catch (error) {
         console.error('An error occurred:', error);
       }
  }
}
