import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FarmaciasService } from '../../services/farmacias.service';
import { ConFarmSucces, FarmDelete, FarmEdit, FarmInsert } from '../../interface/farmacias.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { empty } from 'rxjs';
declare var window: any;



@Component({
  selector: 'app-farmacias',
  templateUrl: './farmacias.component.html',
  styleUrls: ['./farmacias.component.css']
})
export class FarmaciasComponent {

  public modalAddf: any;
  public modalEditf: any;
  public modalConfirm: any;
  farmactiv: ConFarmSucces[] = [];
  idfarmdelete: number = 0;



  public formInserFarm: FormGroup = new FormGroup({
    codigo: new FormControl('', [
      Validators.required,
      Validators.max(9999999999)
    ]),
    nombre: new FormControl('',[
      Validators.required,
      Validators.maxLength(50)

    ])


  });

 
  get codigo(){
    return this.formInserFarm.get('codigo')
  }

  get nombre(){
    return this.formInserFarm.get('nombre')
  }



  public formEditFarm: FormGroup = new FormGroup({
    codigoe: new FormControl('', [
      Validators.required,
      Validators.max(9999999999)

    ]),
    nombree: new FormControl('',[
      Validators.required,
      Validators.maxLength(50)

    ]),
    idfarmedit: new FormControl('', []),
    codigoedit: new FormControl('', [])


  });


  get codigoe(){
    return this.formEditFarm.get('codigoe')
  }

  get nombree(){
    return this.formEditFarm.get('nombree')
  }

  get idfarmedit(){
    return this.formEditFarm.get('idfarmedit')
  }

  get codigoedit(){
    return this.formEditFarm.get('codigoedit')
  }







  constructor(
    private toast: ToastrService,
    private FarmaciasService: FarmaciasService

  ){}



  ngAfterViewInit(): void {
    this.modalAddf = new window.bootstrap.Modal(
      document.getElementById('addModalf')
    );
    this.modalEditf = new window.bootstrap.Modal(
      document.getElementById('editModalf')
    );

    this.modalConfirm = new window.bootstrap.Modal(
      document.getElementById('modalconfirmf')
    );

    
  }

  ngOnInit(): void {

    this.consultFarm();
  }

  insertSubmit(){
    if (this.formInserFarm.invalid) {
      this.formInserFarm.markAllAsTouched();
      this.toast.error('Verifica el Formulario', 'Error');

      return;
    }

    let farmaciaRequest: FarmInsert = {
      nombre: this.formInserFarm.get('nombre')?.value || '',
      codigo: this.formInserFarm.get('codigo')?.value || '',
      status: 0
    }

    this.FarmaciasService.conFarCod(farmaciaRequest.codigo).subscribe({
      next: (data) => {
        if(data){
          this.toast.warning('El Código ' + farmaciaRequest.codigo + ' ya se encuentra Registrado')
          return;          
        }
        this.FarmaciasService.inserFarm(farmaciaRequest).subscribe({
          next: (data) => {
            this.toast.success('Farmacia Agregada');
    
            this.closeModalAddf();
            this.consultFarm();
          },
          error: (error: Error) => {
            this.toast.error('Error al ingresar la Farmacia');
          }
        });
      },
      error: (error: Error) => {
        this.toast.error('Error');
      }
    });
  }

  editSubmit(){
    if (this.formEditFarm.invalid) {
      this.formEditFarm.markAllAsTouched();
      this.toast.error('Verifica el Formulario', 'Error');

      return;
    }

    this.FarmaciasService.conStatus(this.formEditFarm.get('codigoedit')?.value || '').subscribe({
      next: (data) => {
        let farmaciaRequest: FarmEdit = {
          codigo: this.formEditFarm.get('codigoe')?.value || '',
          nombre: this.formEditFarm.get('nombree')?.value || '',
          idstatus: data.idstatus,
          idfarmacia: this.formEditFarm.get('idfarmedit')?.value || '',
          status: 0,
        };

        this.FarmaciasService.conFarCod(farmaciaRequest.codigo).subscribe({
          next: (data) => {
            if (data && data.idfarmacia != farmaciaRequest.idfarmacia) {
              this.toast.warning('El Código ' + farmaciaRequest.codigo + ' ya se encuentra Registrado');
            } else {
              this.FarmaciasService.editFarm(farmaciaRequest).subscribe({
                next: (data) => {
                  this.closeModalEditf();
                  this.toast.success('Farmacia Editada');
                  this.consultFarm();
                },
                error: (error: Error) => {
                  this.toast.error('Error al editar la Farmacia');
                },
              });
            }
          },
        });
      },
    });

  }

  consultFarm(){
    this.FarmaciasService.conFarAct().subscribe({
      next: (data) => {
        this.farmactiv = data;
      }
    })
  }

  deletFarm(){
    this.FarmaciasService.conFarId(this.idfarmdelete).subscribe({
      next: (data) => {
        let farmRequestDelet: FarmDelete = {
          idfarmacia: data.idfarmacia,
          nombre: data.nombre,
          codigo: data.codigo
        }

        this.FarmaciasService.deletFarm(farmRequestDelet).subscribe({
          next: (data) => {
            this.toast.success('Farmacia eliminada');
            this.consultFarm();

            this.closeModalconfirm();

          },
          error: (error: Error) => {
            this.toast.error('Error al Eliminar');
          }
        });


      },
      error: (error: Error) => {
        this.toast.error('Error');
      }
    });

  }

  openModalAddf(){
    this.modalAddf.show();
  }

  closeModalAddf(){
    this.modalAddf.hide();

    this.formInserFarm.patchValue({
      nombre: '',
      codigo: ''
    });
  }

  openModalEditf(idfarmacia: number){
    this.modalEditf.show();

    this.FarmaciasService.conFarId(idfarmacia).subscribe({
      next: (data) => {
        this.formEditFarm.patchValue({
          nombree: data.nombre,
          codigoe: data.codigo,
          idfarmedit: data.idfarmacia,
          codigoedit: data.codigo
        });
      }
    });

  }

  closeModalEditf(){
    this.modalEditf.hide();
  }

  closeModalconfirm(){
    this.modalConfirm.hide();
  }

  openModalconfirm(idfarmacia: number){
    this.modalConfirm.show();
    this.idfarmdelete = idfarmacia;

  }  



}
