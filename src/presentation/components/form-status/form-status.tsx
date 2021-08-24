import Context from '@/presentation/contexts/form/form-context'
import React, { useContext } from 'react'
import Spinner from '../spinner'
import Styles from './form-status-styles.scss'

const FormStatus: React.FC = () => {
  const { state } = useContext(Context)
  const { isLoading, formError } = state

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {formError && <span className={Styles.error}>{formError}</span>}
    </div>
  )
}

export default FormStatus
