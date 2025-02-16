import { Routes } from '@angular/router';
import { HomeComponent } from './components/features/home/home.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { MoviesComponent } from './components/features/movies/movies.component';
import { ReviewsComponent } from './components/features/reviews/reviews.component';
import { ContactComponent } from './components/features/contact/contact.component';
import { AboutComponent } from './components/features/about/about.component';
import { PagenotfoundComponent } from './components/features/pagenotfound/pagenotfound.component';

export const routes: Routes = [
    {
        path: 'home', 
        title: 'Home', 
        component: HomeComponent
    }, 
    { 
        path: 'login', 
        title: 'Login',  
        component: LoginComponent
    }, 
    { 
        path: 'register', 
        title: 'Register', 
        component: RegisterComponent
    }, 
    { 
        path: 'movies', 
        title: 'Movies', 
        component: MoviesComponent
    }, 
    { 
        path: 'reviews', 
        title: 'Reviews', 
        component: ReviewsComponent
    }, 
    { 
        path: "contact", 
        title: "Contact", 
        component: ContactComponent
    }, 
    { 
        path: "about", 
        title: "About", 
        component: AboutComponent
    }, 
    { 
        path: '**', 
        title: '404 Not Found', 
        component: PagenotfoundComponent   
    }
];


