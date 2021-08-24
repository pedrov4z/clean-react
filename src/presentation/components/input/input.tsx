import Context from '@/presentation/contexts/form/form-context'
import React, { useContext, useState } from 'react'
import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]
  const [isValid] = useState(false)

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const getStatus = (): string => {
    if (isValid) {
      return Styles.inputGreenStatus
    }

    return Styles.inputRedStatus
  }

  const getError = (): string => {
    return error
  }

  return (
    <div className={Styles.inputWrap}>
      <input {...props} data-testid={props.name} readOnly onFocus={enableInput} onChange={handleChange} />
      <span data-testid={`${props.name}-status`} color="red" title={getError()} className={[Styles.inputStatus, getStatus()].join(' ')} />
    </div>
  )
}

export default Input
