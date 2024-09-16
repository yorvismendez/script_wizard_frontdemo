import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../services/users.service';
import { ConUseActSucces, UserEdit, UserInsert } from '../../interface/users.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RolesList } from '../../interface/ejecuciones.interface';
declare var window: any;


export function passwordComplexityValidator(control: FormControl): { [key: string]: any } | null {
  const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).+$/;
  if (!control.value || pattern.test(control.value)) {
    return null; 
  } else {
    return { 'passwordcomplexityvalidator': true }; 
  }
}

export function noSpacesValidator(control: FormControl): { [key: string]: any } | null {
  const hasSpace = control.value?.indexOf(' ') >= 0;
  return !hasSpace ? null : { 'nospacesvalidator': true };
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})



export class UsersComponent {
  
  public modalAddu: any;
  public modalEditu: any;
  usersactiv: ConUseActSucces[] = [];
  user?: ConUseActSucces;
  admincheck: boolean = true;
  

  public formUsrInsert: FormGroup = new FormGroup({
    usuario: new FormControl('',[Validators.required, 
      Validators.maxLength(20), 
      noSpacesValidator,
      Validators.minLength(5)
    ]),
    nombre: new FormControl('', [Validators.required,
      Validators.maxLength(30),
      Validators.minLength(5)
    ]),
    clave: new FormControl('', [
      Validators.required, 
      Validators.minLength(10),
      Validators.maxLength(40),
      passwordComplexityValidator
    ]),
    claveconfirm: new FormControl('',[Validators.required]),
    admin:new FormControl('',[])
    
  });

  get usuario(){
    return this.formUsrInsert.get('usuario');
  }

  get nombre(){
    return this.formUsrInsert.get('nombre');
  }
  get clave(){
    return this.formUsrInsert.get('clave');
  }

  get claveconfirm(){
    return this.formUsrInsert.get('claveconfirm');
  }

  public formUsrEdit: FormGroup = new FormGroup({
    usuarioe: new FormControl('',[Validators.required, 
      Validators.maxLength(20), 
      noSpacesValidator,
      Validators.minLength(5)
    ]),
    nombree: new FormControl('', [Validators.required,
      Validators.maxLength(30),
      Validators.minLength(5)
    ]),
    clavee: new FormControl('', [
      Validators.required, 
      Validators.minLength(10),
      Validators.maxLength(40),
      passwordComplexityValidator
    ]),
    claveconfirme: new FormControl('',[Validators.required]),
    admine: new FormControl('',[]),
    iduseredit: new FormControl('',[]),
    estatus: new FormControl('', [Validators.required])
    
  });

  get estatus(){
    return this.formUsrEdit.get('estatus')
  }

  get usuarioe(){
    return this.formUsrEdit.get('usuarioe');
  }

  get nombree(){
    return this.formUsrEdit.get('nombree');
  }
  get clavee(){
    return this.formUsrEdit.get('clavee');
  }

  get claveconfirme(){
    return this.formUsrEdit.get('claveconfirme');
  }

  get admine(){
    return this.formUsrEdit.get('admine');
  }



  constructor(
    private toast: ToastrService,
    private UsersService: UsersService    
  ){}


  ngAfterViewInit(): void {
    this.modalAddu = new window.bootstrap.Modal(
      document.getElementById('addModalu')
    );

    this.modalEditu = new window.bootstrap.Modal(
      document.getElementById('editModalu')
    );

  }



  ngOnInit(): void {
    this.consulUser();
    

  }

  insertUsuario(){
    if(this.formUsrInsert.invalid){
      this.formUsrInsert.markAllAsTouched();
      this.toast.error('Verifica el Formulario', 'Error');

      return;
    }


    let userinsert: UserInsert = {
      username: this.formUsrInsert.get('usuario')?.value || '',
      name: this.formUsrInsert.get('nombre')?.value || '',
      password: this.formUsrInsert.get('clave')?.value || '',
      admin: this.formUsrInsert.get('admin')?.value || '',
      enabled: true
    }

    if(userinsert.password === this.formUsrInsert.get('claveconfirm')?.value || ''){

      this.UsersService.consulUser(userinsert.username).subscribe({
        next: (data) => {
          this.user = data;
          if(this.user){
            this.toast.warning('El Usuario '+this.user.username+' ya se encuentra registrado', 'Error')
          }else{
            this.UsersService.insertUser(userinsert).subscribe({
              next: (data) => {
                this.toast.success('Usuario Registrado');
                this.closeModalAddu();
                this.consulUser();

              },
              error: (error: Error) => {
                this.toast.error('Error al ingresar el Ususario')
              }
            })
          }
        }
      })
      
      
    }else{
      this.toast.error('La clave y confirmación no coinciden')
    }
  }

  EditUsusario(){
    if(this.formUsrEdit.invalid){
      this.formUsrEdit.markAllAsTouched();
      this.toast.error('Verifica el Formulario', 'Error');

      return;
    }

    let useredit: UserEdit = {
      username: this.formUsrEdit.get('usuarioe')?.value || '',
      name: this.formUsrEdit.get('nombree')?.value || '',
      password: this.formUsrEdit.get('clavee')?.value || '',
      admin: this.formUsrEdit.get('admine')?.value || '',
      enabled: this.formUsrEdit.get('estatus')?.value || '',
      iduser: this.formUsrEdit.get('iduseredit')?.value || '',      
    }
    if(useredit.password === this.formUsrEdit.get('claveconfirme')?.value || ''){

      this.UsersService.consulUser(useredit.username).subscribe({
        next: (data) => {
          this.user = data;

          if(this.user && this.user.iduser != useredit.iduser){
            this.toast.warning('El Usuario '+this.user.username+' ya se encuentra registrado', 'Error');
            
          }else{
            this.UsersService.editUser(useredit).subscribe({
              next: (data) => {
                this.toast.success('Usuario Editado');
                this.closeModalEditu();
                this.consulUser();

              },
              error: (error: Error) => {
                this.toast.error('Error al editar el Ususario')
              }
            })
          }
        }
      })      
      
    }else{
      this.toast.error('La clave y confirmación no coinciden')
    }
  }


  openModalAddu(){
    this.modalAddu.show();
    this.formUsrInsert.patchValue({
      usuario: '',
      nombre: '',
      clave: '',
      claveconfirm: ''      
    }); 
    this.admincheck = false;
    this.formUsrInsert.get('admin')?.setValue(this.admincheck);
  }

  closeModalAddu(){
    this.modalAddu.hide();
  }

  openModalEditu(username: string){
    this.modalEditu.show();

    this.UsersService.consulUser(username).subscribe({
      next: (data) => {
        this.formUsrEdit.patchValue({
          usuarioe: data.username,
          nombree: data.name,
          iduseredit: data.iduser,
          clavee: '',
          claveconfirme: ''  ,
          estatus: data.enabled    
        });      

        const esadmin = data.rolesList.some((role: RolesList) => role.name === 'ROLE_ADMIN');
        this.admincheck = false;
        
        if(esadmin){  
          this.admincheck = true;        
          this.formUsrEdit.get('admine')?.setValue(this.admincheck);
                
        }else{          
          this.admincheck = false;
          this.formUsrEdit.get('admine')?.setValue(this.admincheck);
        }
      }
    })




  }

  closeModalEditu(){
    this.modalEditu.hide();
  }

  consulUser(){
    this.UsersService.consUsAct().subscribe({
      next: (data) => {
        this.usersactiv = data;
      }
    });
  }
  


}
