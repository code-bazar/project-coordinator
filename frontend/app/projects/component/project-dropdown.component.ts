import { Component, OnInit } from '@angular/core';
import { Project } from '../model/project';
import { ProjectService } from '../service/project.service';

@Component({
    moduleId: module.id,
    selector: 'project-dropdown',
    templateUrl: 'project-dropdown.component.html',
    styleUrls: ['project-dropdown.component.css']
})

export class ProjectDropdownComponent implements OnInit {

    private projects: Project[] = [];
    private dropdownBtn: string = "Select project";
    private projectDesc: string = "";
    private projectId: string = "";

    constructor(private projectService: ProjectService) {

    }

    ngOnInit() {
        this.getAddedProjects();
        this.getUpdatedProjects();
    }

    getAddedProjects() {
        this.projectService.getAddedProjects()
            .subscribe(project => {
                this.projects.push(project);
            },
                err => {
                    console.error("Unable to get added bugs - ", err);
                });
        console.log("PROJECTS: ")
        console.log(this.projects)

    }

    getUserProjects() {
        // this.projectService.getAddedProjects()
        //     .subscribe(bug => {
        //         this.projects.push(bug);
        //     },
        //     err => {
        //         console.error("Unable to get added bugs - ", err);
        //     });
    }

    getUpdatedProjects() {
        // this.projectService.changedListener()
        //     .subscribe(updatedProject => {
        //         //BELOW: we are trying to get an index for the bug that matches our updated bug based on id value
        //         //on array we use map to go throug every element in our array and it returns everything it finds as a array
        //         //it looks for the element with value 'updatedBug['id']' of any property
        //         const projectIndex = this.projects.map(index => index.id).indexOf(updatedProject['id']);
        //         this.projects[projectIndex] = updatedProject;
        //     },
        //     err => {
        //         console.error("Unable to get project bug - ", err);
        //     });
    }

    selectProject(project: Project) {
        this.dropdownBtn = project.name;
        this.projectDesc = project.description;
        this.projectId = project.id;
    }
}