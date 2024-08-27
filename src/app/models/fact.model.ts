export class Fact {
  constructor(private _afeccion: string = '', private _enfermedad: string = '') {}

  get afeccion(): string {
    return this._afeccion;
  }

  set afeccion(value: string) {
    this._afeccion = value ? value : this.afeccion;
  }

  get enfermedad(): string {
    return this._enfermedad;
  }

  set enfermedad(value: string) {
    this._enfermedad = value ? value : this._enfermedad;
  }
}
