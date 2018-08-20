import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ProfileComponent } from './profile/profile.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { CommentsComponent } from './comments/comments.component';
import { FooterComponent } from './footer/footer.component';

const appRoutes: Routes = [
    {   path: '', component: IntroductionComponent},
    // enable for versions > 0.0.1
    // {   path: 'home', component: HomeComponent},
    // {   path: 'upcoming', component: UpcomingComponent},
    // {   path: 'timeline', component: TimelineComponent},
    // {   path: 'profile', component: ProfileComponent},
    // {   path: 'comments', component: CommentsComponent},
    {   path: '', redirectTo: 'introduction', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UpcomingComponent,
    NavigationComponent,
    TimelineComponent,
    ProfileComponent,
    IntroductionComponent,
    CommentsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
