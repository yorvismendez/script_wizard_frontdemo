import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import { Login } from '../../interfaces/login.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  public formLogin = new FormGroup({
    username: new FormControl('',[
      Validators.required
    ]),
    password: new FormControl('',[
      Validators.required
    ])
  });

  get username(){
    return this.formLogin.get('username')
  }
  get password(){
    return this.formLogin.get('password')
  }

  constructor(
    private toast: ToastrService,
    private loginService: LoginService,
    private router: Router
  ){

  }

  ngOnInit():void{
  const token = localStorage.getItem('token') ?? '';

  if(token){
    this.router.navigate(['/admin']);
  }

    
    

    
  }


  loginSubmit():void{
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched()
      this.toast.error('Verifique el formulario', 'Error');
      return;
    }

    let loginRequest: Login = {
      username: this.formLogin.get('username')?.value || '',
      password: this.formLogin.get('password')?.value || ''
    }


    this.loginService.login(loginRequest).subscribe({
      next:(data) => {
        this.toast.success('Bienvenido a Scripts Wizard!')
        let token = data.token
        localStorage.setItem('token', token)
        this.router.navigate(['/admin'])         

      },
      error: (error: Error) => {
        this.toast.error('Sus credenciales son incorrectas')
      }
    })

  }
}
