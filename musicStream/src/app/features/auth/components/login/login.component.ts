import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { loginAuth} from "../../../../store/actions/auth.actions";
import {selectAuthState} from "../../../../store/selectors/auth.selectors";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store, private router: Router) {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
      const { login, password } = this.loginForm.value;
      this.store.dispatch(loginAuth({ login, password }));
      this.store.select(selectAuthState).subscribe((authState) => {
        if (authState.user) {
          this.router.navigate(['/']); // Redirect to the home page on successful login
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
