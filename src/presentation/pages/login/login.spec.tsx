import { ValidationStub } from '@/presentation/test'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import faker from 'faker'
import React from 'react'
import Login from './login'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = faker.random.words()
  const sut = render(<Login validation={validationStub} />)

  return {
    sut, validationStub
  }
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const { sut, validationStub } = makeSut()
    const { getByTestId } = sut
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.className).toContain('inputRedStatus')
    const passwordStatus = getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.className).toContain('inputRedStatus')
  })

  test('Should show email error if Validation fails', () => {
    const { sut, validationStub } = makeSut()
    const { getByTestId } = sut
    const emailInput = getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.className).toContain('inputRedStatus')
  })

  test('Should show password error if Validation fails', () => {
    const { sut, validationStub } = makeSut()
    const { getByTestId } = sut
    const passwordInput = getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.className).toContain('inputRedStatus')
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut, validationStub } = makeSut()
    const { getByTestId } = sut
    validationStub.errorMessage = null
    const emailInput = getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = getByTestId('email-status')
    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.className).toContain('inputGreenStatus')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut, validationStub } = makeSut()
    const { getByTestId } = sut
    validationStub.errorMessage = null
    const passwordInput = getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = getByTestId('password-status')
    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.className).toContain('inputGreenStatus')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut, validationStub } = makeSut()
    const { getByTestId } = sut
    validationStub.errorMessage = null
    const emailInput = getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const passwordInput = getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })
})
