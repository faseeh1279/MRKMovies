// features.module.ts
import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { HomeComponent } from "./home/home.component";
import { MoviesComponent } from "./movies/movies.component";
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component";
import { ReviewsComponent } from "./reviews/reviews.component";
import { FeaturesRoutingModule } from "./features-routing.module";
import { SharedModule } from "../shared/shared.module";
import { CarouselComponent } from "./home/carousel/carousel.component";
import { UploadComponent } from './upload/upload.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ViewReviewComponent } from './reviews/view-review/view-review.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({ 
    declarations: [
        AboutComponent, 
        ContactComponent, 
        HomeComponent, 
        MoviesComponent, 
        PagenotfoundComponent, 
        ReviewsComponent, 
        CarouselComponent,
        UploadComponent,
        ViewReviewComponent,
        ProfileComponent, 
    ], 
    imports: [
        FeaturesRoutingModule, 
        SharedModule, 
        ReactiveFormsModule, 
        FormsModule, 
        CommonModule,
        DatePipe
    ], 
})

export class FeaturesModule { } 