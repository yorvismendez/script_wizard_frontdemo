import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../../services/home.service';
import { GloStatsucces } from '../../interface/home.interface';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  globals: GloStatsucces[] = [];
  private intervalId?: number;


  constructor(private toast: ToastrService, private HomeService: HomeService) {}

  ngOnInit(): void {
    this.consultarGlobal(false);

    this.intervalId = window.setInterval(() => {
      this.consultarGlobal(true);
    }, 10000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }

  consultarGlobal(nospinner: boolean) {

      this.HomeService.consGobals(nospinner).subscribe({
        next: (data) => {
          this.globals = data;

          this.globals.forEach((item) => {
            if (item.ultmConexion) {
              const fechaObj = new Date(item.ultmConexion);
              item.fechahora = `${fechaObj.getDate().toString().padStart(2 , '0')}-${
                (fechaObj.getMonth() + 1).toString().padStart(2 , '0')
              }-${fechaObj.getFullYear()} ${fechaObj.getHours().toString().padStart(2 , '0')}:${fechaObj.getMinutes().toString().padStart(2 , '0')}`;

              const ahora = new Date();
              const diferenciaMinutos =
                (ahora.getTime() - fechaObj.getTime()) / (1000 * 60);
              item.esMenor = diferenciaMinutos <= 1;
            }
          });
        },
      });
    
  }
}
