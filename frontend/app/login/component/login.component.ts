import { Component, OnInit } from '@angular/core';
import { LoginService } from "../service/login.service";
import { User } from '../../user/model/user';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from '@angular/router/src/utils/collection';

@Component({
    moduleId: module.id,
    selector: 'login-form',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    private users: User[] = [];
    currentUser: User;
    loginForm: FormGroup;
    isWrongCredentials = true;
    isLogged = false;


    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private loginService: LoginService) {

    }

    register() {
        this.router.navigate(['/register']);
    }

    onSubmit() {
        if(this.loginService.authenticate(this.loginForm.value['email'], this.loginForm.value['password'])) {
            this.router.navigate(['/projects']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: [''],
            password: ['']
        });
    }
}