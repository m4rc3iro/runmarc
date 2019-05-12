import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ProfileComponent } from './profile/profile.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { CommentsComponent } from './comments/comments.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const appRoutes: Routes = [
    {   path: '', component: IntroductionComponent},
    {   path: 'home', component: HomeComponent},
    {   path: 'upcoming', component: UpcomingComponent},
    {   path: 'timeline', component: TimelineComponent},
    {   path: 'profile', component: ProfileComponent},
    {   path: 'comments', component: CommentsComponent},
    {   path: '', redirectTo: 'introduction', pathMatch: 'full' }
];

@NgModule({
  imports:[
    CommonModule,
    NgtUniversalModule,
    TransferHttpCacheModule,
    HttpClientModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
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
  providers: [],
})
export class AppModule { }
