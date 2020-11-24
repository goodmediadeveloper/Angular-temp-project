import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';


import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {MessageModel} from '../../shared/models/message.model';
import {AuthService} from '../../shared/services/auth.service';


@Component({
  selector: 'wf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: MessageModel;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {

    this.message = new MessageModel('danger', '');

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });


    this.route.queryParams.subscribe((params: Params) => {
      if (params.nowCanLogin) {
        this.showMessage('success', 'Теперь вы можете войти в систему!!!');
      }
    });


    // function showMessage(message: Message) {
    //   this.message = message;
    //   window.setTimeout(() => {
    //     this.message.text = '';
    //   }, 5000);
    // }

  }

  onSubmit() {
    const formData = this.form.value;


    this.usersService.getUserByEmail(formData.email).subscribe((user: User) => {
      if (user[0]) {
        if (user[0].password === formData.password) {
          this.message.text = '';
          window.localStorage.setItem('user', JSON.stringify(user));
          this.authService.logIn();
          this.router.navigate(['/system', 'bill']);
        } else {
          this.showMessage('danger', 'пароль не верный!!!');
        }
      } else {
        this.showMessage('danger', 'Такого пользователя не существует!!!');
      }
    });
  }

  // private showMessage(tеперь Вы МожетеВойтиВСистему: string, success: string) {
  //
  // }
  private showMessage(type: string, text: string) {
    this.message = new MessageModel(text, type);
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }
}
