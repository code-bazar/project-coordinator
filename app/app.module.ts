// Module
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { ProjectsModule } from './projects/projects.module';

//Component
import { AppComponent } from './app.component';
import { NavBarComponent } from './navbar/navbar.component';


@NgModule({
    imports: [
        BrowserModule,
        ProjectsModule,
        AppRoutingModule,
        LoginModule,
        RegisterModule,
        CoreModule.forRoot()
    ],
    declarations: [
        AppComponent,
        NavBarComponent
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule {

}