import { Campaign } from './../model/campaign';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LocalStorageHandlerService } from './local-storage-handler.service';

@Injectable({
  providedIn: 'root'
})
export class FirstRunService {
http: HttpClient = inject(HttpClient);
local: LocalStorageHandlerService= inject(LocalStorageHandlerService);


  constructor() { }

extractInitialData(){
const iniciado = localStorage.getItem('ini');

if(!iniciado){
  this.http.get<any>('/bd.json').subscribe({
    next: (data) => {
      localStorage.setItem('campaigns', JSON.stringify(data.campaigns));
      localStorage.setItem('characters', JSON.stringify(data.characters));
      localStorage.setItem('ini', 'true');
    },
    error: (err) => {
      console.error("Error al cargar el JSON inicial", err);

    },
    complete: ()=>  console.log('Servicio iniciado por primera vez')
  })
} else {
  console.log('Inicio previo, localStorage encontrada');
  console.log(
    this.local.get('campaigns', []),
    this.local.get('characters', [])

  );
}
}
}
