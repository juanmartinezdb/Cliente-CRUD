import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookiesHandlerService {

  set(nombre: string, valor: string | any[], dias: number = 7): void {
    const finalValue = Array.isArray(valor) ? JSON.stringify(valor) : valor;
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + dias);
    document.cookie = `${nombre}=${encodeURIComponent(finalValue)}; expires=${expirationDate.toUTCString()}; path=/`;
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
      console.error(`Could not remove the element from cookie ${nombre}:`, e);
    }
  }
}
