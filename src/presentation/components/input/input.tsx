import React, { useEffect, useState } from 'react'
import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    setIsValid(!isValid)
  }, [])

  return (
    <div className={Styles.inputWrap}>
      <input {...props} />
      <span className={[Styles.inputStatus, isValid ? Styles.inputGreenStatus : Styles.inputRedStatus].join(' ')} />
    </div>
  )
}

export default Input
