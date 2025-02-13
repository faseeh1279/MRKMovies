import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    {
        path: 'home', 
        component: HomeComponent, 
        children: [
            {
                path: 'home/profile', 
                component: ProfileComponent
            }
        ]
    },  
    { 
        path: 'about', 
        component: AboutComponent
    }, 
    { 
        path: 'contact', 
        component: ContactComponent
    }, 
    { 
        path: 'pricing', 
        component: PricingComponent
    }, 
    { 
        path: '**',
        component: NotFoundComponent
    }
];
