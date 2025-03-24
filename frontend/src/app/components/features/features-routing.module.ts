// features-routing.module.ts
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MoviesComponent } from "./movies/movies.component";
import { ReviewsComponent } from "./reviews/reviews.component";
import { ContactComponent } from "./contact/contact.component";
import { AboutComponent } from "./about/about.component";
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component";
import { NgModule } from "@angular/core";
import { UploadComponent } from "./upload/upload.component";
import { authGuard } from "../users/guards/auth.guard";
import { ViewReviewComponent } from "./reviews/view-review/view-review.component";
import { EditFormComponent } from "../shared/forms/edit-form/edit-form.component";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [ 
    {
        path: 'home', 
        title: 'Home', 
        canActivate: [authGuard],
        component: HomeComponent
    }, 
    { 
        path: 'movies', 
        title: 'Movies', 
        canActivate: [authGuard],
        component: MoviesComponent
    }, 
    { 
        path: 'reviews', 
        title: 'Reviews', 
        canActivate: [authGuard],
        component: ReviewsComponent, 
    }, 
    { 
        path: "contact", 
        title: "Contact", 
        canActivate: [authGuard],
        component: ContactComponent
    }, 
    { 
        path: "about", 
        title: "About", 
        canActivate: [authGuard],
        component: AboutComponent
    }, 
    { 
        path: 'upload', 
        title: 'Upload',
        canActivate: [authGuard],
        component: UploadComponent
    },
    {
        path: 'view-review/:id', 
        title: 'Movie Review', 
        canActivate: [authGuard], 
        component: ViewReviewComponent
    },
    { 
        path: 'edit-movie/:id', 
        title: 'Edit Movie', 
        canActivate: [authGuard], 
        component: EditFormComponent
    }, 
    {
        path: "profile", 
        title: "Profile", 
        canActivate: [authGuard],
        component: ProfileComponent
    }, 
    { 
        path: '**', 
        title: '404 Not Found', 
        component: PagenotfoundComponent   
    }, 
]

@NgModule({ 
    imports: [RouterModule.forChild(routes)], 
    exports: [RouterModule], 
})

export class FeaturesRoutingModule { } 