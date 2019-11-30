import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { BugService } from '../service/bug.service';

import { Bug } from "../model/bug";
import { STATUS, SEVERITY } from '../../shared/constant/constants';

import { forbiddenStringValidator } from '../../shared/validation/forbidden-string.validator';

@Component({
    moduleId: module.id,
    selector: 'bug-detail',
    templateUrl: 'bug-detail.component.html',
    styleUrls: ['bug-detail.component.css']
})

export class BugDetailComponent implements OnInit {
    private modalId = "bugModal";
    private bugForm: FormGroup;
    private projectId: string = "";
    private statuses = STATUS;
    private severities = SEVERITY;
    private statusArr: string[] = [];
    private severityArr: string[] = [];
    @Input() currentBug = new Bug(null, null, this.statuses.Logged, this.severities.Severe, null, null, null, null, null);

    constructor(private formBuilder: FormBuilder, private bugService: BugService) {

    }

    ngOnInit() {
        this.statusArr = Object.keys(this.statuses).filter(Number);                 //We are changing whole Object this.statuses to an Array - console.log(this.statuses) if you don't know/remember why
        this.severityArr = Object.keys(this.severities).filter(Number);             // *.filter(Number) takes only those which are type of number - so first 5 in this case
        this.configureForm();
    }

    configureForm(bug?: Bug, projectId?: string) {                                                       //This is a reactive form creating
        if (bug) {
            this.currentBug = new Bug(
                bug.id,
                bug.title,
                bug.status,
                bug.severity,
                bug.description,
                bug.createdBy,
                bug.createdDate,
                bug.updatedBy,
                bug.updatedDate
            );
        }

        /*this.bugForm = new FormGroup({                                                                            // i means ignore the case
            title: new FormControl(null, [Validators.required, forbiddenStringValidator(/puppy/i)]),              //The 'title' matches 'formControlName' property in *.html file and so on
            status: new FormControl(1, Validators.required),                  //'[]' provides an array of validators
            severity: new FormControl(1, Validators.required),
            description: new FormControl(null, Validators.required)
        });*/
        this.bugForm = this.formBuilder.group({
            title: [this.currentBug.title, [Validators.required, forbiddenStringValidator(/puppy/i)]],
            status: [this.currentBug.status, Validators.required],
            severity: [this.currentBug.severity, Validators.required],
            description: [this.currentBug.description, [Validators.required]]
        });

        console.log("BUG FORM");
        if (projectId) {
            this.projectId = projectId;
            console.log(projectId);
        }
    }

    submitForm() {
        this.currentBug.title = this.bugForm.value["title"];
        this.currentBug.status = this.bugForm.value["status"];
        this.currentBug.severity = this.bugForm.value["severity"];
        this.currentBug.description = this.bugForm.value["description"];

        if (this.currentBug.id) {
            this.updateBug();
        } else {
            console.log(this.projectId)
            if (this.projectId == "") {
                this.addBug();
            } else {
                console.log("ADDED BUG TO PROJECT " + this.projectId)
                this.addBugToProject();
            }
        }
    }

    addBug() {
        this.bugService.addBug(this.currentBug);
    }

    addBugToProject() {
        this.bugService.addBugToProject(this.currentBug, this.projectId)
    }

    updateBug() {
        this.bugService.updateBug(this.currentBug);
    }

    freshForm() {
        this.bugForm.reset({ status: this.statuses.Logged, severity: this.severities.Severe });  //Only 'reset()' will reset all values, although severity and status which we dont want to
        this.cleanBug();
    }

    cleanBug() {
        this.currentBug = new Bug(null, null, this.statuses.Logged, this.severities.Severe, null, null, null, null, null);
    }
}