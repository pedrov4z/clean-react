import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'
import { MinLengthValidation } from './min-length-validation'

type SutTypes = {
  sut: MinLengthValidation
  fieldName: string
}

const makeSut = (): SutTypes => {
  const fieldName = faker.database.column()
  const sut = new MinLengthValidation(fieldName, 5)

  return {
    sut,
    fieldName
  }
}

describe('MinLengthValidation', () => {
  test('Should return error if value doesn\'t reach minimum length', () => {
    const { sut, fieldName } = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(4))
    expect(error).toEqual(new InvalidFieldError(fieldName))
  })

  test('Should return false if value is valid', () => {
    const { sut } = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(5))
    expect(error).toBeFalsy()
  })
})
