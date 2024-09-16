import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EjecucionesService } from '../../services/ejecuciones.service';
import {
  Content,
  Destino,
  DestinosSucces,
  Ejecucion,
  EjecucionResponse,
  FarmActivasSucces,
  Role,
  ScriptPagSucces,
  Tokendecod,
} from '../../interface/ejecuciones.interface';
import { ScriptSucces } from '../../interface/scripts.interface';
import { jwtDecode } from 'jwt-decode';
declare var window: any;

@Component({
  selector: 'app-ejecuciones',
  templateUrl: './ejecuciones.component.html',
  styleUrls: ['./ejecuciones.component.css'],
})
export class EjecucionesComponent {
  public modalAdd: any;
  public DesModal: any;
  mainCheckboxChecked = false;
  farmactiva: FarmActivasSucces[] = [];
  farmacti: FarmActivasSucces[] = [];
  ejecpag?: ScriptPagSucces;
  primera: boolean = true;
  ultima: boolean = false;
  destinos: DestinosSucces[] = [];
  scripts: ScriptSucces[] = [];
  token!: Tokendecod;
  ejecuinsert?: EjecucionResponse;
  insdes: Boolean = false;
  idusuario: number = 0;
  private intervalId?: number;


  public formEjecuciones: FormGroup = new FormGroup({
    descripcion: new FormControl('', [Validators.required]),
    script: new FormControl('', [Validators.required]),

    todas: new FormControl(''),

  }) as unknown as FormGroup<{ [key: string]: AbstractControl }>;

  
  get descripcion() {
    return this.formEjecuciones.get('descripcion');
  }
  get script() {
    return this.formEjecuciones.get('script');
  }

  
  constructor(
    private toast: ToastrService,
    private EjecucionesService: EjecucionesService
  ) {}

  ngOnInit(): void {

   
    const tokenencoded = localStorage.getItem('token')!;
    this.token = jwtDecode(tokenencoded);
    const rolesarray: Role[] = JSON.parse(this.token.authorities);
    const esadmin = rolesarray.some((role: Role) => role.authority === 'ROLE_ADMIN');

    this.idusuario = this.token.idusuario
    
    if (esadmin) {
      this.EjecucionesService.consScriAct().subscribe({
        next: (data) => {
          this.scripts = data;
        },
      });
    } else {
      this.EjecucionesService.consulScrNivel().subscribe({
        next: (data) => {
          this.scripts = data;
        },
      });
    }

    this.EjecucionesService.consFarAct().subscribe({
      next: (data) => {
        this.farmactiva = data;

        if (this.farmactiva && this.farmactiva.length > 0) {
          this.farmactiva.forEach((registro) => {
            this.formEjecuciones.addControl(
              registro.idfarmacia.toString(),
              new FormControl({ value: '', disabled: false })
            );
          });
        }
      },
    });

    this.formEjecuciones.get('todas')?.valueChanges.subscribe((checked) => {
      this.mainCheckboxChecked = checked;
      this.toggleCheckboxes(!checked);
    });

    this.consulEje(0);
  }

  ngAfterViewInit(): void {
    this.modalAdd = new window.bootstrap.Modal(
      document.getElementById('addModal')
    );

    this.DesModal = new window.bootstrap.Modal(
      document.getElementById('DesModal')
    );
  }

  
  toggleCheckboxes(enable: boolean) {
    this.farmactiva.forEach((registro, index) => {
      const controlName = registro.idfarmacia.toString();
      if (enable) {
        this.formEjecuciones.get(controlName)?.enable();
      } else {
        this.formEjecuciones.get(controlName)?.disable();
      }
    });
  }


  downloadExcel(fileName: string, nombreFarm: string) {
    const filePath = 'assets/data/' + fileName + '.xlsx';
    const link = document.createElement('a');
    link.href = filePath;
    link.download = nombreFarm;
    link.click();
  }

  async descargarAll() {
    for (let registro of this.destinos) {
      if (registro.status == 0) {
        await this.downloadExcel(registro.iddestino.toString(), registro.idFarmacia.nombre);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  }

  ejecucionSubmit(): void {
    if (this.formEjecuciones.invalid) {
      this.formEjecuciones.markAllAsTouched();
      this.toast.error('Verifique el formulario', 'Error');
      
      return;
    }

    this.EjecucionesService.consFarAct().subscribe({
      next: (data) => {
        this.farmacti = data;

        this.insdes = false;

        this.farmacti.forEach((registro) => {
          let destinoRequest: Destino = {
            id_ejecucion: 0,
            id_farmacia: this.formEjecuciones.get(registro.idfarmacia.toString())?.value || '',
          };

          if (destinoRequest.id_farmacia.toString() == 'true' || this.formEjecuciones.get('todas')?.value) {
            this.insdes = true;
          }
        });

        if (this.insdes) {
          let ejecucionRequest: Ejecucion = {
            descripcion: this.formEjecuciones.get('descripcion')?.value || '',
            id_usuario: Number(this.idusuario),id_script: this.formEjecuciones.get('script')?.value || '',
          };

          this.EjecucionesService.insertEjecucion(ejecucionRequest).subscribe({
            next: (data) => {
              this.ejecuinsert = data;
              if (this.formEjecuciones.get('todas')?.value == true) {
                this.farmacti.forEach((registro) => {
                  let destinoRequest: Destino = {
                    id_ejecucion: this.ejecuinsert!.idejecucion,
                    id_farmacia: registro.idfarmacia,
                  };
                  
                  this.EjecucionesService.insertarDestino(destinoRequest).subscribe();
                });
                this.toast.success('Ejecucion Agregada', 'Notificación');
                this.consulEje(0);
                this.modalAdd.hide();

              } else {

                this.farmacti.forEach((registro) => {
                  let destinoRequest: Destino = {
                    id_ejecucion: this.ejecuinsert!.idejecucion,
                    id_farmacia: this.formEjecuciones.get(registro.idfarmacia.toString())!.value, 
                  };
                  if (destinoRequest.id_farmacia.toString() == 'true') {
                    let destinoRequest: Destino = {
                      id_ejecucion: this.ejecuinsert!.idejecucion,
                      id_farmacia: registro.idfarmacia, 
                    };
                    
                    this.EjecucionesService.insertarDestino(destinoRequest).subscribe();
                  }
                });
                this.toast.success('Ejecucion Agregada', 'Notificación');
                
                this.consulEje(0);
                this.modalAdd.hide();
              }
            },
          });
        } else {
          this.toast.error('Debe seleccionar al menos un destino', 'Error');
        }
      },
      error: (error: Error) => {
        this.toast.error('Error al ingresar la Ejecucion');
      }
    });
  }


  consulEje(pagina: number): void {
    this.EjecucionesService.scriptsPag(pagina).subscribe({
      next: (data) => {
        this.ejecpag = data;

        
        this.ejecpag.content.forEach((item)=> {
          if(item.fecha) {
            const fechaObj = new Date(item.fecha);
            item.fechaformat = `${fechaObj.getDate().toString().padStart(2 , '0')}-${
              (fechaObj.getMonth() +1).toString().padStart(2 , '0')
            }-${fechaObj.getFullYear()} ${fechaObj.getHours().toString().padStart(2 , '0')}:${fechaObj.getMinutes().toString().padStart(2 , '0')}`;          
          }
          
        });    

        if (this.ejecpag.pageable.pageNumber > 0) {
          this.primera = false;
        } else {
          this.primera = true;
        }

        if (this.ejecpag.pageable.pageNumber + 1 == this.ejecpag.totalPages) {
          this.ultima = true;
        } else {
          this.ultima = false;
        }
      },
    });
  }

  openModalAdd() {
    this.modalAdd.show();

    this.formEjecuciones.patchValue({
      descripcion: '',
      script: '',
      todas: true      
    })
  }

  closeModalAdd() {
    this.modalAdd.hide();
  }

  openModalDes(iddestino: number) {
    this.DesModal.show();
    this.EjecucionesService.destinos(iddestino, false).subscribe({
      next: (data) => {
        this.destinos = data;
      },
    });


    this.intervalId = window.setInterval(() => {
      this.EjecucionesService.destinos(iddestino, true).subscribe({
        next: (data) => {
          this.destinos = data;
        },
      }); 
    }, 10000);



  }

  closeModalDes() {
    this.DesModal.hide();
    window.clearInterval(this.intervalId)
  }
}
