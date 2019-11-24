import { Injectable } from '@angular/core';

import * as firebase from 'firebase';  //* let us import one full thing
require('firebase/database');          //Now we can use the database methods and everything

import { FIREBASE_CONFIG } from '../constant/constants';


@Injectable()
export class FirebaseConfigService {

    private _database: firebase.database.Database;

    constructor() {
        this.configureApp();
        this.configureDatabase();
    }

    public get database() {
        return this._database;
    }

    configureApp() {
        firebase.initializeApp(FIREBASE_CONFIG);
    }

    configureDatabase() {
        this._database = firebase.database();  //This gives us our reference to our firebase database
    }
}