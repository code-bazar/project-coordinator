import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RegisterComponent } from './component/register.component'

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'register', component: RegisterComponent },
        ])
    ],
    exports: [ RouterModule ]
})

export class RegisterRoutingModule {

}