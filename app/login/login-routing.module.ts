import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './component/login.component'
import { RegisterComponent } from '../register/component/register.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', redirectTo: 'login', pathMatch: 'prefix' },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: '**', redirectTo: 'login' } // in case if someone type ROOT_URL/kskdkmkmsd this route will handle this and redirect to default path. '**' means everything
        ])
    ],
    exports: [ RouterModule ]
})

export class LoginRoutingModule {

}