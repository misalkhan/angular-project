import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { ViewComponent } from './dashboard/view/view.component';
import { CreatePostComponent } from './dashboard/create-post/create-post.component';
import { EditPostComponent } from './dashboard/edit-post/edit-post.component';
import { UserProfileComponent } from './dashboard/user/user-profile/user-profile.component';
import { EditProfileComponent } from './dashboard/user/edit-profile/edit-profile.component';
import { authGuard, loginGuard } from './guards/auth.guard';
const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [loginGuard]},
  {path: 'signup', component: SignupComponent, canActivate: [loginGuard]},
  {path:'dashboard',component:ViewComponent, canActivate: [authGuard] },
  {path:'create-post',component:CreatePostComponent, canActivate: [authGuard]},
  {path:'edit-post',component:EditPostComponent, canActivate: [authGuard]},
  {path:'user-profile',component:UserProfileComponent, canActivate: [authGuard]},
  {path:'edit-profile',component:EditProfileComponent, canActivate: [authGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
