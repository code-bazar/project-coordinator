//This is feature module
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { RegisterRoutingModule } from './register-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//Component

import { RegisterComponent } from './component/register.component';

//Service
import { UserService } from '../user/service/user.service';


@NgModule({
    imports: [              //Imports are for Modules
        SharedModule,
        RegisterRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [         //Declarations are for components and thing related to layout
        
        RegisterComponent
    ],
    exports: [ ],       //Exports let passing elements through
    providers: [            //Providers are for services
        UserService
    ]
})


export class RegisterModule {

}