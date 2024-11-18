import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent {
  postId: string | null = null;
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.postId = params['postId'];
      this.getPost()
    });
  }
  editPost = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  })

  getPost() {
    let token = localStorage.getItem('token');
    try {
      this.http.get<any>(`https://angular-project-server.vercel.app/post/edit-post/${this.postId}`, {
        headers: {
          'Content-Type': 'application/json',
          'token': token || ''
        }
      }).subscribe((response) => {
        console.log(response);
        this.editPost.setValue({
          title: response.title,
          content: response.content
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

  edit() {
    let token = localStorage.getItem('token');
    let data = this.editPost.value;
    if (!data.title || data.title.trim() === '' || !data.content || data.content.trim() === '') {
      alert('Please enter title & Content both')
      return;
    }
    try {
      this.http.put<any>(`https://angular-project-server.vercel.app/post/edit-post/${this.postId}`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'token': token || ''
        }
      }).subscribe((response) => {
        console.log(response);
        this.editPost.setValue({
          title: response.title,
          content: response.content
        })
        this.router.navigate(['/dashboard'])
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
