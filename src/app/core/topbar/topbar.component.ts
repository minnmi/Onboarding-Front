import {Component, OnInit} from '@angular/core';
import {TemplateComponent} from '../template/template.component';
// import { AuthService } from '@app/shared/services/auth.service';
// import { UserRoleEnum } from '@app/shared/enums/UserRoleEnum';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  // nome: string;
  // profileRole: string;
  // isAuthenticated = false;

  constructor(
    public template: TemplateComponent,
    // public authService: AuthService
  ) {
  }

  async ngOnInit() {
    // await this.iniciarDadosUsuario();
  }

  // private async iniciarDadosUsuario() {
  //   if (await this.authService.isAuthenticated()) {
  //     const {name} = this.authService.getTokenPayload();
  //     const tokenRoles = this.authService.getTokenRoles();
  //
  //     this.nome = name.trim().toLowerCase();
  //     this.isAuthenticated = true;
  //
  //     const hasAdministrador = tokenRoles.includes(UserRoleEnum.ADMINISTRADOR);
  //     const hasDFAM = tokenRoles.includes(UserRoleEnum.DFAM);
  //     const hasDFAE = tokenRoles.includes(UserRoleEnum.DFAE);
  //     const hasExterno = tokenRoles.includes(UserRoleEnum.EXTERNO);
  //     const hasConsulta = tokenRoles.includes(UserRoleEnum.CONSULTA);

  //     if (hasAdministrador) {
  //       this.profileRole = 'Administrador';
  //     } else if (hasDFAM) {
  //       this.profileRole = 'DFAM';
  //     } else if (hasDFAE) {
  //       this.profileRole = 'DFAE';
  //     } else if (hasExterno) {
  //       this.profileRole = 'Gestor';
  //     } else if (hasConsulta) {
  //       this.profileRole = 'Consulta';
  //     }
  //   }
  // }
  //
  // async logout() {
  //   await this.authService.signOut();
  // }
}
