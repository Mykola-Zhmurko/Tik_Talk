import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
// import { delay, from, map, skip, take, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);

  isPasswordVisible = signal<boolean>(false)

  form = new FormGroup({
    username: new FormControl<string | null>(null),
    password: new FormControl<string | null>(null),  
  });



  onSubmit(event: Event) {
    if (this.form.valid) {
      //@ts-ignore
      this.authService.login(this.form.value)
      .subscribe((res) => {
        this.router.navigate(['']);
        console.log('onSubmit response', res);
      });
    }
  }


    // constructor(){// RX.JS
  //   from([1,2,3,4,5,6,7,8,9])
  //   .pipe(//in pipe wird alle Preobrazovateli übergegeben
  //     // map(val => val * 2),//müssen beschreiben, was wir machen
  //     // take(2),//zeigt wie viele Zahle wir nehmen
  //     // skip(2),//es skipt von Anfang bestimmte Anzahl der Zahl
  //     // delay(1000),//macht eine Pause, muss in  millisikunden sein
  //     tap(val => {//tap is for effects, das flusst auf value nicht
  //       this.form.patchValue({username: val.toString()})//so können wir Snachenie String ändern, z.B. vom number zu string
  //     })

  //   ).subscribe( val => {
  //     console.log( val )
  //   })
  // }
}
