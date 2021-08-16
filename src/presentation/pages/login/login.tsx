import Footer from '@/presentation/components/footer'
import FormStatus from '@/presentation/components/form-status'
import Input from '@/presentation/components/input'
import Header from '@/presentation/components/login-header'
import React from 'react'
import Styles from './login-styles.scss'

const Login: React.FC = () => {
  return (
    <div className={Styles.loginWrap}>
      <Header />

      <form className={Styles.form}>
        <h2>Login</h2>

        <Input type="email" name="email" placeholder="Digite seu e-mail" />

        <Input type="password" name="password" placeholder="Digite sua senha" />

        <button className={Styles.submit} type="submit">Entrar</button>

        <span className={Styles.link}>Criar conta</span>

        <FormStatus />
      </form>

      <Footer />
    </div>
  )
}

export default Login
