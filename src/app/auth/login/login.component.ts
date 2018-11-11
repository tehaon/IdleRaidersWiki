import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GlobalsService } from 'src/app/globals.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    email: string;
    password: string;

    loginForm: FormGroup;

    // tslint:disable-next-line:max-line-length
    constructor(private httpClient: HttpClient, private fb: FormBuilder, private globalsService: GlobalsService, private router: Router) {
        this.loginForm = fb.group({
            'email': [null, [Validators.required, Validators.email]],
            'password': [null, Validators.required],
        });
    }

    ngOnInit() {

    }

    login() {
        if (this.loginForm.valid) {
            const postData = this.loginForm.value;
            this.httpClient.post('http://localhost:8000/auth/login', postData).subscribe((response: any) => {
                this.globalsService.setUserToken(response.token);

                this.router.navigate(['/']);
            });
        } else {
            this.validateAllFormFields(this.loginForm);
        }
    }

    protected validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsDirty();
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }
}
