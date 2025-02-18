import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookiesHandlerService {

  set(nombre: string, valor: string | any[], dias?: number): void {
    const finalValue = Array.isArray(valor) ? JSON.stringify(valor) : valor;
    let cookieString = `${nombre}=${encodeURIComponent(finalValue)}; path=/`;


    if (dias !== undefined && dias > 0) {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + dias);
      cookieString += `; expires=${expirationDate.toUTCString()}`;
    }

    document.cookie = cookieString;
  }

  get(nombre: string): string | null {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find(c => c.startsWith(nombre + '='));
    return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
  }

  remove(nombre: string): void {
    this.set(nombre, '', -1);
  }

  removeItemFromArray(nombre: string, elemento: string): void {
    const cookieData = this.get(nombre);
    if (!cookieData) return;

    try {
      let array = JSON.parse(cookieData);
      if (Array.isArray(array)) {
        array = array.filter(item => item !== elemento);
        this.set(nombre, array);
      }
    } catch (e) {
      console.error(`No se puede eliminar el elemento de la cookieee ${nombre}:`, e);
    }
  }
}
