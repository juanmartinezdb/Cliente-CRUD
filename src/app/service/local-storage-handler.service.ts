import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageHandlerService {


  get<T>(key: string, defaultValue: T): T {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  }

  set<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  add<T>(key: string, item: T): void {
    const data = this.get<T[]>(key, []);
    this.set(key, [...data, item]);
  }

  //lo sé, es una burrada pasar todo el objeto a string para compararlo,  pero asi puedo hacerlo con objetos
  // sin id, como en el hotel que los registros no tenian id y la CreatedAt podia ser dudosa. Ya que usando
  // este servicio ya no puedo hacer el obj1!=obj2 porque no van a tener la misma referencia
  remove<T>(key: string, item: T): void {
    const data = this.get<T[]>(key, []).filter(i => JSON.stringify(i) !== JSON.stringify(item));
    this.set(key, data);
  }

}
