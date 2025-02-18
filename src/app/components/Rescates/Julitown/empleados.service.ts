import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../model/Persona';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

    private url = 'http://localhost:3000/empleados';

  constructor(private http: HttpClient) { }

    getEmpleados() {
        return this.http.get<Empleado[]>(this.url);
    }

    getEmpleado(id: string) {
        return this.http.get<Empleado>(`${this.url}/${id}`);
    }

    addEmpleado(empleado: Empleado) {
        return this.http.post(this.url, empleado);
    }

    updateEmpleado(empleado: Empleado) {
        return this.http.put(`${this.url}/${empleado.id}`, empleado);
    }

    deleteEmpleado(id: string) {
        return this.http.delete(`${this.url}/${id}`);
    }

}

