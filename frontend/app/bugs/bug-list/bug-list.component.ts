import { Component, OnInit } from '@angular/core';
import { BugService } from "../service/bug.service";
import { Bug } from '../model/bug';

@Component({
    moduleId: module.id,
    selector: 'bug-list',
    templateUrl: 'bug-list.component.html',
    styleUrls: [ 'bug-list.component.css' ]
})

export class BugListComponent implements OnInit {

    private bugs: Bug[] = [];

    constructor(private bugService: BugService) {

    }

    ngOnInit() {
        this.getAddedBugs();
        this.getUpdatedBugs();
    }


    getAddedBugs() {
        this.bugService.getAddedBugs()
            .subscribe(bug => {
                this.bugs.push(bug);
            },
            err => {
                console.error("Unable to get added bugs - ", err);
            });
    }

    getUpdatedBugs() {
        this.bugService.changedListener()
            .subscribe(updatedBug => {
                //BELOW: we are trying to get an index for the bug that matches our updated bug based on id value
                //on array we use map to go throug every element in our array and it returns everything it finds as a array
                //it looks for the element with value 'updatedBug['id']' of any property
                const bugIndex = this.bugs.map(index => index.id).indexOf(updatedBug['id']);
                this.bugs[bugIndex] = updatedBug;
            },
            err => {
                console.error("Unable to get updated bug - ", err);
            });
    }
}