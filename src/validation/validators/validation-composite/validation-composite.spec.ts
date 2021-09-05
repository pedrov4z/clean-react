import { FieldValidationSpy } from '@/validation/validators/test/mock-field-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite/validation-composite'
import faker from 'faker'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationSpies: FieldValidationSpy[]
  fieldName: string
}

const makeSut = (): SutTypes => {
  const fieldName = faker.database.column()

  const fieldValidationSpies = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]

  const sut = new ValidationComposite(fieldValidationSpies)

  return {
    sut,
    fieldValidationSpies,
    fieldName
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const { sut, fieldValidationSpies, fieldName } = makeSut()
    const firstError = faker.random.words()
    fieldValidationSpies[0].error = new Error(firstError)
    fieldValidationSpies[1].error = new Error(faker.random.words())
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBe(firstError)
  })

  test('Should return false if all validations pass', () => {
    const { sut, fieldName } = makeSut()
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBeFalsy()
  })
})
