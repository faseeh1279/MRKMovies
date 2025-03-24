import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { HeaderComponent } from './components/main/header/header.component';
import { FooterComponent } from './components/main/footer/footer.component';
import { UsersModule } from "./components/users/users.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptorService } from "./components/users/services/auth-interceptor.service";
import { SharedModule } from "./components/shared/shared.module";
import { FeaturesModule } from "./components/features/features.module";
import { AppRoutingModule } from "./app-routing.module";
import { MainLayoutComponent } from './components/main/main-layout/main-layout.component';
import { AuthLayoutComponent } from './components/main/auth-layout/auth-layout.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MainLayoutComponent,
        AuthLayoutComponent,  
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        UsersModule,
        SharedModule, 
        FeaturesModule, 
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ],

    bootstrap: [AppComponent]
})

export class AppModule { }
        