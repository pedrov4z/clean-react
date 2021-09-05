export class InvalidFieldError extends Error {
  constructor (readonly fieldName: string) {
    super(`Valor do campo ${fieldName} inválido`)
  }
}
