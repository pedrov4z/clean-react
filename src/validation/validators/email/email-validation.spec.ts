import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from '@/validation/validators/email/email-validation'
import faker from 'faker'

type SutTypes = {
  sut: EmailValidation
  fieldName: string
}

const makeSut = (): SutTypes => {
  const fieldName = faker.database.column()
  const sut = new EmailValidation(fieldName)

  return {
    sut,
    fieldName
  }
}

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const { sut, fieldName } = makeSut()
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError(fieldName))
  })

  test('Should return false if email is valid', () => {
    const { sut } = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
