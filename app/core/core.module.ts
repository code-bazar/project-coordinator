import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';  // SkipSelf it checks if there is no other instance of this

import { FirebaseConfigService } from './service/firebase-config.service';

@NgModule({
    imports: [ ],
    declarations: [ ],
    exports: [ ]
})

export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {  //@Optional says that we want to make injection but this is optional
        if(parentModule) {
            throw new Error("CoreModule exists already. Only import in the root/app module.");
        }
    }

    static forRoot(): ModuleWithProviders {  //This lets provide singleton application services
        return {
            ngModule: CoreModule,
            providers: [ FirebaseConfigService ]
        };
    }
}