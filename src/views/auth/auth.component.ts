// import { Component } from '@angular/core';
// import { UserService } from '../../services/user.service';
// import { User } from '../../models/user.model';
// import { Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'auth',
//   templateUrl: './auth.component.html',
//   styleUrls: ['./auth.component.scss'],
// })
// export class AuthComponent {
//   signUpForm: FormGroup;

//   constructor(
//     private userService: UserService,
//     private router: Router,
//     private fb: FormBuilder
//   ) {
//     this.signUpForm = this.fb.group({
//       username: ['', Validators.required],
//     });
//   }

//   signUp() {
//     if (this.signUpForm.invalid) return;
//     const newUser: User = {
//       _id: 'u101',
//       name: this.signUpForm.value.username,
//       isAdmin: false,
//       dollars: 100,
//       moves: [],
//     };
//     this.userService.setNewUser(newUser);
//     this.router.navigate(['/home']);
//   }
// }
import { Component } from '@angular/core'
import { UserService } from '../../services/user.service'
import { User } from '../../models/user.model'
import { Router } from '@angular/router'

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  usernam: string = ''

  constructor(private userService: UserService, private router: Router) {}

  signUp() {
    if (!this.usernam) return
    const newUser: User = {
      _id: 'u101',
      name: this.usernam,
      isAdmin: false,
      dollars: 100,
      moves: [],
    }
    this.userService.setNewUser(newUser)
    this.router.navigate(['/'])
  }
}
