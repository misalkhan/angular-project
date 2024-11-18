import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ViewComponent } from './view/view.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPostComponent } from './edit-post/edit-post.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserRoutingModule } from './user/user-routing.module';


@NgModule({
  declarations: [
    CreatePostComponent,
    ViewComponent,
    EditPostComponent,
    EditProfileComponent,
    UserProfileComponent

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }