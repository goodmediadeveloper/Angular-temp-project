import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';


@Component({
  selector: 'wf-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {
  }

  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required, Validators.email
      ], this.forbiddenEmails.bind(this)
        ),
      password: new FormControl(null, [
        Validators.required, Validators.minLength(6)
      ]),
      name: new FormControl(null, [
        Validators.required,
      ]),
      agree: new FormControl(false, [
        Validators.required, Validators.requiredTrue,
      ]),
    });
  }

  onSubmit() {

    const {email, password, name} = this.form.value;
    const user = new User(email, password, name);
    // tslint:disable-next-line:no-shadowed-variable
    this.usersService.createNewUser(user).subscribe((user: User) => {

      this.router.navigate(['/login'], {
        queryParams: {
          nowCanLogin: true
        }
      });
    });

  }

  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.usersService.getUserByEmail(control.value).subscribe((user: User) => {
        if (user[0]) {
          resolve({forbiddenEmail: true});
        } else {
          resolve(null);
        }
      });
    });
  }
}

