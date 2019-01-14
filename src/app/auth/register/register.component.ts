import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GlobalsService } from 'src/app/globals.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    displayName: FormControl;
    email: FormControl;
    password: FormControl;

    registrationForm: FormGroup;

    constructor(private httpClient: HttpClient, private fb: FormBuilder, private globalsService: GlobalsService) {
        this.registrationForm = fb.group({
            'displayName': [null, Validators.required],
            'email': [null, Validators.required],
            'password': [null, Validators.required],
        });
    }

    ngOnInit() {

    }

    signUp() {
        if (this.registrationForm.valid) {
            const postData = this.registrationForm.value;
            this.httpClient.post(environment.baseApiUrl + '/auth/register', postData).subscribe((response: any) => {
                this.globalsService.setUserToken(response.token);
            });
        } else {
            this.validateAllFormFields(this.registrationForm);
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
