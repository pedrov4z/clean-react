import { Validation } from '@/presentation/protocols/validation'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import faker from 'faker'
import React from 'react'
import Login from './login'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage: string
  input: object

  validate (input: object): string {
    this.input = input
    return this.errorMessage
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy} />)

  return {
    sut, validationSpy
  }
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const { sut } = makeSut()
    const { getByTestId } = sut
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = getByTestId('email-status')
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.className).toContain('inputRedStatus')
    const passwordStatus = getByTestId('password-status')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.className).toContain('inputRedStatus')
  })

  test('Should call Validation with correct email', () => {
    const { sut, validationSpy } = makeSut()
    const { getByTestId } = sut
    const emailInput = getByTestId('email')
    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })
    expect(validationSpy.input).toEqual({
      email
    })
  })
})
