import React, { useEffect, useState } from 'react'
import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const [isValid, setIsValid] = useState(true)

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  useEffect(() => {
    setIsValid(!isValid)
  }, [])

  return (
    <div className={Styles.inputWrap}>
      <input {...props} readOnly onFocus={enableInput} />
      <span className={[Styles.inputStatus, isValid ? Styles.inputGreenStatus : Styles.inputRedStatus].join(' ')} />
    </div>
  )
}

export default Input
