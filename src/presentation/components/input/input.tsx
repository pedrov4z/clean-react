import Context from '@/presentation/contexts/form/form-context'
import React, { useContext, useState } from 'react'
import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { errorState } = useContext(Context)
  const error = errorState[props.name]
  const [isValid] = useState(false)

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
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
      <input {...props} readOnly onFocus={enableInput} />
      <span data-testid={`${props.name}-status`} color="red" title={getError()} className={[Styles.inputStatus, getStatus()].join(' ')} />
    </div>
  )
}

export default Input
