import { Injectable } from '@angular/core';
import { FirebaseConfigService } from '../../core/service/firebase-config.service';

import { Observable } from "rxjs/Observable";
//import {  } from 'rxjs/operators';

import { Http } from '@angular/http'

import { Bug } from '../model/bug';
import { error } from "util";


@Injectable()
export class BugService {

    private bugsDbRef = this.fireService.database.ref('/bugs'); //We can also do this *.ref().child('bugs') -- *ref() with empty
    private URL = "http://localhost/json/export.json"
    //brackets points to root

    private projectBugsDbRef = null;

    constructor(private fireService: FirebaseConfigService, private http: Http) {

    }

    getAddedBugs(): Observable<any> {
        return Observable.create(obs => {
            this.bugsDbRef.on('child_added', bug => {           //Here we are setting up the listener
                const newBug = bug.val() as Bug;
                newBug.id = bug.key;
                obs.next(newBug);
            },
                err => {
                    obs.throw(err);
                });
        });
    }

    getAddedBugFromAPI(): Observable<any> {
        return this.http.get(this.URL)
                        // ...and calling .json() on the response to return data
                         .map(res => {
                             console.log(res.json());
                            })
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    changedListener(): Observable<any> {
        return Observable.create(obs => {
            this.bugsDbRef.on('child_changed', bug => {
                const updatedBug = bug.val() as Bug;
                updatedBug.id = bug.key;
                obs.next(updatedBug);
            },
                err => {
                    obs.throw(err);
                });
        });
    }

    addBugToProject(bug: Bug, projectId: string) {
        this.projectBugsDbRef = this.fireService.database.ref('/projects/' + projectId + '/bugs');

        const newBugRef = this.projectBugsDbRef.push();
        newBugRef.set({
            title: bug.title,
            status: bug.status,
            severity: bug.severity,
            description: bug.description,
            createdBy: 'Bartek',
            createdDate: Date.now()
        })
            .catch(err => console.error("Unable to add bug to firebase - ", err));
    }

    addBug(bug: Bug) {
        const newBugRef = this.bugsDbRef.push();
        newBugRef.set({
            title: bug.title,
            status: bug.status,
            severity: bug.severity,
            description: bug.description,
            createdBy: 'Bartek',
            createdDate: Date.now()
        })
            .catch(err => console.error("Unable to add bug to firebase - ", err));
    }

    updateBug(bug: Bug, projectId?: string) {
        var currentBugRef = this.bugsDbRef.child(bug.id);
        if (projectId) {
            this.projectBugsDbRef = this.fireService.database.ref('/projects/' + projectId + '/bugs');
            currentBugRef = this.projectBugsDbRef.child(bug.id);
        }
        bug.id = null;
        bug.updatedBy = "Ryszard"; // TODO: In case having users
        bug.updatedDate = Date.now();
        currentBugRef.update(bug);
    }
}