import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Evento } from '../model/Event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private url = 'http://localhost:3000/eventos';

  constructor(private http: HttpClient) { }

  getEventos() {
    return this.http.get<Evento[]>(this.url);
  }

  getEvento(id: string) {
    return this.http.get<Evento>(`${this.url}/${id}`);
  }

  addEvento(evento: Evento) {
    return this.http.post(this.url, evento);
  }

  updateEvento(evento: Evento) {
    return this.http.put(`${this.url}/${evento.id}`, evento);
  }

  deleteEvento(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getLogs() {
    return this.http.get<Evento[]>(`${this.url}?categoria=log`);
  }

  getWarns() {
    return this.http.get<Evento[]>(`${this.url}?categoria=warn`);
  }

  getErrors() {
    return this.http.get<Evento[]>(`${this.url}?categoria=error`);
  }

}
