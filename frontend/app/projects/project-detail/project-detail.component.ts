import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ProjectService } from '../service/project.service';

import { Project } from "../model/project";
import { STATUS, SEVERITY } from '../../shared/constant/constants';

import { forbiddenStringValidator } from '../../shared/validation/forbidden-string.validator';

@Component({
    moduleId: module.id,
    selector: 'project-detail',
    templateUrl: 'project-detail.component.html',
    styleUrls: ['project-detail.component.css']
})

export class ProjectDetailComponent implements OnInit {
    private modalId = "projectModal";
    private projectForm: FormGroup;
    private statuses = STATUS;
    private severities = SEVERITY;
    private statusArr: string[] = [];
    private severityArr: string[] = [];
    @Input() currentProject = new Project("", "", "", "", null);

    constructor(private formBuilder: FormBuilder, private projectService: ProjectService) {

    }

    ngOnInit() {
        this.statusArr = Object.keys(this.statuses).filter(Number);                 //We are changing whole Object this.statuses to an Array - console.log(this.statuses) if you don't know/remember why
        this.severityArr = Object.keys(this.severities).filter(Number);             // *.filter(Number) takes only those which are type of number - so first 5 in this case
        this.configureForm();
    }

    configureForm(project?: Project) {                                                       //This is a reactive form creating
        if (project) {
            this.currentProject = new Project(
                project.id,
                project.name,
                project.status,
                project.description,
                project.bugs
            );
        }

        /*this.bugForm = new FormGroup({                                                                            // i means ignore the case
            title: new FormControl(null, [Validators.required, forbiddenStringValidator(/puppy/i)]),              //The 'title' matches 'formControlName' property in *.html file and so on
            status: new FormControl(1, Validators.required),                  //'[]' provides an array of validators
            severity: new FormControl(1, Validators.required),
            description: new FormControl(null, Validators.required)
        });*/
        this.projectForm = this.formBuilder.group({
            name: [this.currentProject.name, [Validators.required, forbiddenStringValidator(/puppy/i)]],
            status: [this.currentProject.status, Validators.required],
            description: [this.currentProject.description, [Validators.required]]
        });
    }

    submitForm() {
        this.currentProject.name = this.projectForm.value["name"];
        this.currentProject.status = this.projectForm.value["status"];
        this.currentProject.description = this.projectForm.value["description"];

        if (this.currentProject.id) {
            this.updateProject();
        } else {
            this.addProject();
        }
    }

    addProject() {
        this.projectService.addProject(this.currentProject);
    }

    updateProject() {
        this.projectService.updateProject(this.currentProject);
    }

    freshForm() {
        this.projectForm.reset({ status: this.statuses.Logged });  //Only 'reset()' will reset all values, although severity and status which we dont want to
        this.cleanProject();
        // TODO: Delete below line
        console.log("ADD PROJECT")
    }

    cleanProject() {
        this.currentProject = new Project(null, "", "", "", null);
    }
}