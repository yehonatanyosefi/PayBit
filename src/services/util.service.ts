import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}
  save(key: string, value: any): void {
    const stringifiedVal = JSON.stringify(value)
    localStorage.setItem(key, stringifiedVal)
  }

  load<T>(key: string): T | null {
    const stringifiedVal = localStorage.getItem(key)
    return stringifiedVal ? (JSON.parse(stringifiedVal) as T) : null
  }
}
