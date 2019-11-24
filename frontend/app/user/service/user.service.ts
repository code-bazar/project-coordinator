import {Injectable} from '@angular/core';
import {FirebaseConfigService} from '../../core/service/firebase-config.service';

import {Observable} from "rxjs/Observable";

import {User} from '../model/user';

@Injectable()
export class UserService {

    private usersDbRef = this.fireService.database.ref('/users'); //We can also do this *.ref().child('bugs') -- *ref() with empty
                                                                //brackets points to root
    private users: User[] = [];
    isLogged = false;
    
    constructor(private fireService: FirebaseConfigService) {
        
    }

    addUser(user: User) {
        const newUserRef = this.usersDbRef.push();
        newUserRef.set({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        })
        .catch(err => console.error("Unable to add user to firebase - ", err));
    }

    updateUser(user: User) {
        const currentUserRef = this.usersDbRef.child(user.id);
        user.id = null;
        currentUserRef.update(user);
    }

    getUsers(): Observable<any> {
        return Observable.create(obs => {
            this.usersDbRef.on('child_added', user => {           //Here we are setting up the listener
                    const newUser = user.val() as User;
                    newUser.id = user.key;
                    obs.next(newUser);
                },
                err => {
                    obs.throw(err);
                });
        });
    }

    changedListener(): Observable<any> {
        return Observable.create(obs => {
            this.usersDbRef.on('child_changed', user => {
                const updatedUser = user.val() as User;
                updatedUser.id = user.key;
                obs.next(updatedUser);
            },
            err => {
                obs.throw(err);
            });
        });
    }

}