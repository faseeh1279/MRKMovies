import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PagenotfoundComponent } from "./components/features/pagenotfound/pagenotfound.component";
import { MainLayoutComponent } from "./components/main/main-layout/main-layout.component";
import { AuthLayoutComponent } from "./components/main/auth-layout/auth-layout.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'features/home',
        pathMatch: 'full'
    },
    {
        path: '',
        component: MainLayoutComponent, // Routes with header & footer 
        children: [
            {
                path: 'features',
                loadChildren: () => import('./components/features/features.module').then(m => m.FeaturesModule)
            },
        ]
    },
    { 
        path: '', 
        component: AuthLayoutComponent, 
        children: [ 
            {
                path: 'users',
                loadChildren: () => import('./components/users/users.module').then(m => m.UsersModule)
            },
        ]
    }, 
    {
        path: '**',
        title: '404 Not Found',
        component: PagenotfoundComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
