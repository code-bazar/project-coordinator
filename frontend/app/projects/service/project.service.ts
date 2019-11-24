import { Injectable } from '@angular/core';
import { FirebaseConfigService } from '../../core/service/firebase-config.service';

import { Observable } from "rxjs/Observable";
import { Project } from '../model/project';

@Injectable()
export class ProjectService {

    private projectsDbRef = this.fireService.database.ref('/projects'); //We can also do this *.ref().child('bugs') -- *ref() with empty
    //brackets points to root

    constructor(private fireService: FirebaseConfigService) {

    }

    getAddedProjects() {
        return Observable.create(obs => {
            this.projectsDbRef.on('child_added', project => {           //Here we are setting up the listener
                const newProj = project.val() as Project;
                newProj.id = project.key;
                obs.next(newProj);
            },
                err => {
                    obs.throw(err);
                });
        });
    }

    changedListener() {

    }

    addProject(project: Project) {
        const newProjectRef = this.projectsDbRef.push();
        newProjectRef.set({
            name: project.name,
            status: project.status,
            description: project.description,
            owner: 'Bartek',
            createdDate: Date.now()
        })
            .catch(err => console.error("Unable to add bug to firebase - ", err));
    }

    updateProject(project: Project) {
        const currentProjectRef = this.projectsDbRef.child(project.id);
        project.id = null;
        // project.updatedBy = "Ryszard"; // TODO: In case having users
        // project.updatedDate = Date.now();
        currentProjectRef.update(project);
    }
}