import { RequiredFieldValidation } from '@/validation/validators'
import { ValidationBuilder as sut } from '@/validation/validators/builder/validation-builder'
import faker from 'faker'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const fieldName = faker.database.column()
    const validations = sut.field(fieldName).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)])
  })
})
