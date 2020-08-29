import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

interface Session {
  id: number;
  avatar: string;
  email: string;
  count_items_car: number;
  id_usuario: number;
  es_cliente: Boolean,
  id_servicio: number;
  id_plan: number;
  nombre: string;
  solicitud_status: string;
  tipo_usuario: string;
  first_name: string;
  last_name: string;
  token: string;
} 

@Injectable({
  providedIn: 'root'
})
export class SessionsClientService {

  private router: Router;
  private currentSession: any;

  constructor() {
    this.currentSession = this.loadSessionData();
  }

  public getCurrentSession(): Session {
    return this.currentSession;
  }

  public isAuthenticated(): boolean {
    // tslint:disable-next-line:variable-name
    let current_session: Session;
    current_session = this.getCurrentSession();
    return current_session !== null;
  }

  public removeCurrentSession(): void {
    localStorage.removeItem('currentClient');
    this.currentSession = null;
  }

  public logout(): void {
    this.removeCurrentSession();
    window.location.href = '/';
  }

  public registerSession(sesion: Session) {
    this.currentSession = sesion;
    localStorage.setItem('nextline-currentClient', JSON.stringify(sesion));
  }

  private loadSessionData(): any {
    try {
      const sessionStr = localStorage.getItem('nextline-currentClient');
      return (sessionStr) ? <SessionsClientService> JSON.parse(sessionStr) : null;
    } catch (e) {
      return [];
    }
  }

}
