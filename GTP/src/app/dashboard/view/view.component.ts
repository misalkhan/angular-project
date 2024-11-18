import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  constructor(private router: Router, private http: HttpClient) { }
  posts: any[] = []
  timePost:boolean = true;
  ngOnInit(): void {
    this.timelinePosts();
  }

  timelinePosts(){
    let token = localStorage.getItem('token');
    console.log(token,'fe token')
    try {
     this.http.get<any>('https://angular-project-server.vercel.app/post/list', {
        headers: {
          'Content-Type': 'application/json',
          'token': token || ''
        }
      }).subscribe((response) => {
        this.posts = response;
        this.timePost = false;
        console.log(this.posts)
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
  getAllPosts() {
    let token = localStorage.getItem('token');
    console.log(token,'fe token')
    try {
     this.http.get<any>('https://angular-project-server.vercel.app/post/activeUserPosts', {
        headers: {
          'Content-Type': 'application/json',
          'token': token || ''
        }
      }).subscribe((response) => {
        this.posts = response;
        this.timePost=true;
        console.log(this.posts)
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
  createPage() {
    this.router.navigate([`/create-post`]);
  }
  editPage(postId: string) {
    this.router.navigate([`/edit-post`], { queryParams: { postId: postId } });
  }

  deletePost(postId: string) {
    console.log(postId)
    try {
      this.http.delete<any>(`https://angular-project-server.vercel.app/post/delete-post/${postId}`, {
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token') || ''
        }
      }).subscribe((response) => {
        let data = response
        console.log(data.message)
        this.getAllPosts()
      },
        (error => {
          console.log(error)

        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  userProfile() {
    console.log('hereeeeeeee')
    this.router.navigate(['/user-profile'])
  }
  
  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}
