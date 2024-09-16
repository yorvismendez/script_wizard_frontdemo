import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ScriptsService } from '../../services/scripts.service';
import { ScriptEdi, ScriptIn, ScriptSucces } from '../../interface/scripts.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { Tokendecod } from '../../interface/ejecuciones.interface';

declare var window: any;



@Component({
  selector: 'app-scripts',
  templateUrl: './scripts.component.html',
  styleUrls: ['./scripts.component.css'],
})
export class ScriptsComponent {
  public modalAdds: any;
  public modalEdits: any;
  public modalconfirm: any;
  scriptactivos: ScriptSucces[] = [];
  token!: Tokendecod;
  idusuario: number = 0;
  idscriptdelete: number = 0;

  public formScripInsert: FormGroup = new FormGroup({
    nombre: new FormControl('', [
      Validators.required, 
      Validators.minLength(5),
      Validators.maxLength(30)],),
    descripcion: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(52)
    ]),
    script: new FormControl('', [Validators.required]),
    database: new FormControl('', [Validators.required]),
    nivel: new FormControl(1, [Validators.required]),
  });

  get nombre() {
    return this.formScripInsert.get('nombre');
  }
  get descripcion() {
    return this.formScripInsert.get('descripcion');
  }
  get script() {
    return this.formScripInsert.get('script');
  }
  get database() {
    return this.formScripInsert.get('database');
  }
  get nivel() {
    return this.formScripInsert.get('nivel');
  }


  public formScripEdit: FormGroup = new FormGroup({
    nombreedi: new FormControl('', [Validators.required, 
      Validators.minLength(5), 
      Validators.maxLength(30)]),
    descripcionedi: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(52)
    ]),
    scriptedi: new FormControl('', [Validators.required]),
    databaseedi: new FormControl('', [Validators.required]),
    niveledi: new FormControl('', [Validators.required]),
    idscript: new FormControl('')
  });

  get nombreedi() {
    return this.formScripEdit.get('nombreedi');
  }
  get descripcionedi() {
    return this.formScripEdit.get('descripcionedi');
  }
  get scriptedi() {
    return this.formScripEdit.get('scriptedi');
  }
  get databaseedi() {
    return this.formScripEdit.get('databaseedi');
  }
  get niveledi() {
    return this.formScripEdit.get('niveledi');
  }



  constructor(
    private toast: ToastrService,
    private ScriptsService: ScriptsService
  ) {}

  ngAfterViewInit(): void {
    this.modalAdds = new window.bootstrap.Modal(
      document.getElementById('addModals')
    );
    this.modalEdits = new window.bootstrap.Modal(
      document.getElementById('editModals')
    );

    this.modalconfirm = new window.bootstrap.Modal(
      document.getElementById('modalconfirm')
    );



    
  }

  ngOnInit(): void {
    const tokenencoded = localStorage.getItem('token')!;
    this.token = jwtDecode(tokenencoded);

    this.idusuario = this.token.idusuario;
    this.consulScript();
  }

  isertSubmit(): void {
    if (this.formScripInsert.invalid) {
      this.formScripInsert.markAllAsTouched();
      this.toast.error('Verifica el Formulario', 'Error');

      return;
    }

    let scriptRequest: ScriptIn = {
      nombre: this.formScripInsert.get('nombre')?.value || '',
      descripcion: this.formScripInsert.get('descripcion')?.value || '',
      script: this.formScripInsert.get('script')?.value || '',
      database: this.formScripInsert.get('database')?.value || '',
      nivel: this.formScripInsert.get('nivel')?.value || '',
      status: 0,
      id_usuario: this.idusuario,
    };

    this.ScriptsService.saveScript(scriptRequest).subscribe({
      next: (data) => {
        this.toast.success('Script Agregado');
        this.consulScript();

        this.closeModalAdds();
      },
      error: (error: Error) => {
        this.toast.error('Error al agregar Script');
      },
    });
  }

  consulScript(): void {
    this.ScriptsService.consScriAct().subscribe({
      next: (data) => {
        this.scriptactivos = data;
      },
    });
  }

  editSubmit(): void {
    if (this.formScripEdit.invalid) {
      this.formScripEdit.markAllAsTouched();
      this.toast.error('Verifica el Formulario', 'Error');

      return;
    }

    let scriptRequestedi: ScriptEdi = {
      nombre: this.formScripEdit.get('nombreedi')?.value || '',
      descripcion: this.formScripEdit.get('descripcionedi')?.value || '',
      script: this.formScripEdit.get('scriptedi')?.value || '',
      database: this.formScripEdit.get('databaseedi')?.value || '',
      nivel: this.formScripEdit.get('niveledi')?.value || '',
      status: 0,
      id_usuario: this.idusuario,
      idscript: this.formScripEdit.get('idscript')?.value || ''
    };

    this.ScriptsService.ediScript(scriptRequestedi).subscribe({
      next: (data) => {
        this.toast.success('Script Editado');
        this.consulScript();

        this.closeModalEdits();
      },
      error: (error: Error) => {
        this.toast.error('Error al editar Script');
      },
    });
  }

  openModalAdds() {
    this.modalAdds.show();

    this.formScripInsert.patchValue({
      nombre: '',
      descripcion: '',
      script: '',
      database: '',
      nivel: 1,
    })
  }

  closeModalAdds() {
    this.modalAdds.hide();
  }

  openModalconfirm(idscript: number) {
    this.modalconfirm.show();
    this.idscriptdelete = idscript;
  }

  closeModalconfirm() {
    this.modalconfirm.hide();
  }

  openModalEdits(idscript: number) {
    this.modalEdits.show();

    this.ScriptsService.consulid(idscript).subscribe({
      next: (data) => {
        this.formScripEdit.patchValue({
          nombreedi: data.nombre,
          descripcionedi: data.descripcion,
          scriptedi: data.script,
          databaseedi: data.database,
          niveledi: data.nivel,
          idscript: data.idscript
        })
      }
    })
  }

  dltscrpt(){

    this.ScriptsService.consulid(this.idscriptdelete).subscribe({
      next: (data) => {


       

        let scriptRequestedi: ScriptEdi = {
          nombre: data.nombre,
          descripcion: data.descripcion,
          script: data.script,
          database: data.database,
          nivel: data.nivel,
          status: 1,
          id_usuario: this.idusuario,
          idscript: this.idscriptdelete
        };

        this.ScriptsService.ediScript(scriptRequestedi).subscribe({
          next: (data) => {
            this.toast.success('Script Eliminado');
            this.consulScript();
    
            this.closeModalconfirm();
          },
          error: (error: Error) => {
            this.toast.error('Error al eliminar Script');
          },
        });
        
      }
    })

  }
  closeModalEdits() {
    this.modalEdits.hide();
  }
}
