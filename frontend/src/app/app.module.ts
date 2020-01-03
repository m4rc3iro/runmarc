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
import { CalendarComponent } from './calendar/calendar.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ProfileComponent } from './profile/profile.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const appRoutes: Routes = [
    {   path: '', component: IntroductionComponent},
    {   path: 'home', component: HomeComponent},
    {   path: 'calendar', component: CalendarComponent},
    {   path: 'timeline', component: TimelineComponent},
    {   path: 'profile', component: ProfileComponent},
    {   path: 'feedback', component: FeedbackComponent},
    {   path: '', redirectTo: 'introduction', pathMatch: 'full' }
];

@NgModule({
  imports:[
    CommonModule,
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
    CalendarComponent,
    NavigationComponent,
    TimelineComponent,
    ProfileComponent,
    IntroductionComponent,
    FeedbackComponent,
    FooterComponent
  ],
  providers: [],
})
export class AppModule { }
