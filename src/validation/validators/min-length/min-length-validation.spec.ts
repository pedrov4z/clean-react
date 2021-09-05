import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'
import { MinLengthValidation } from './min-length-validation'

describe('MinLengthValidation', () => {
  test('Should return error if value doesn\'t reach minimum length', () => {
    const fieldName = faker.database.column()
    const sut = new MinLengthValidation(fieldName, 5)
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldError(fieldName))
  })

  test('Should return false if value is valid', () => {
    const fieldName = faker.database.column()
    const sut = new MinLengthValidation(fieldName, 5)
    const error = sut.validate('12345')
    expect(error).toBeFalsy()
  })
})
