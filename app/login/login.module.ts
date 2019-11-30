//This is feature module
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//Component
import { LoginComponent } from './component/login.component';
import { RegisterModule } from '../register/register.module';

//Service
import { LoginService } from './service/login.service';
import { UserService } from '../user/service/user.service';

@NgModule({
    imports: [              //Imports are for Modules
        SharedModule,
        LoginRoutingModule,
        RegisterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [         //Declarations are for components and thing related to layout
        LoginComponent
    ],
    exports: [ ],       //Exports let passing elements through
    providers: [            //Providers are for services
        LoginService,
        UserService
    ]
})

export class LoginModule {

}