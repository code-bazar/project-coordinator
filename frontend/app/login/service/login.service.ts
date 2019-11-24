import {Injectable} from '@angular/core';
import {FirebaseConfigService} from '../../core/service/firebase-config.service';
import {User} from '../../user/model/user';
import { UserService } from '../../user/service/user.service';

@Injectable()
export class LoginService {

    private usersDbRef = this.fireService.database.ref('/users'); //We can also do this *.ref().child('bugs') -- *ref() with empty
                                                                //brackets points to root
    private users: User[] = [];
    isLogged = false;
    
    constructor(private fireService: FirebaseConfigService, private userServive: UserService) {
        this.userServive.getUsers().subscribe(user => {
            this.users.push(user);
        },
        err => {
            console.error("Unable to get added users - ", err);
        });
    }

    authenticate(email: string, password: string): Boolean {
        this.users.forEach(user => {
            if (user.email == email && user.password == password) {
                this.isLogged = true;
            }
        });

        return this.isLogged;
    }
}