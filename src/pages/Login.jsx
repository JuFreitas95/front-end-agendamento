import { useState } from 'react'
import styles from './Login.module.css'

function Login() {
  const [aba, setAba] = useState('entrar')

  return (
    <div className={styles.pagina}>

      <div className={styles.topo}>
        <span className={styles.voltar}>← Voltar</span>
        <span className={styles.acessoProfissional}>Acesso Profissional →</span>
      </div>

      <div className={styles.conteudo}>
        <div className={styles.logoArea}>
          <div className={styles.logoCirculo}>JJ</div>
          <h1 className={styles.titulo}>Studio JJ Tech</h1>
          <p className={styles.subtitulo}>Sistema de Agendamento</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTopo}>
            <span>✦</span>
            <h2>Bem-vindo</h2>
            <p>Entre ou crie sua conta para agendar seus serviços</p>
          </div>

          <div className={styles.toggle}>
            <button
              className={aba === 'entrar' ? styles.toggleAtivo : styles.toggleInativo}
              onClick={() => setAba('entrar')}
            >
              Entrar
            </button>
            <button
              className={aba === 'cadastrar' ? styles.toggleAtivo : styles.toggleInativo}
              onClick={() => setAba('cadastrar')}
            >
              Cadastrar
            </button>
          </div>

          {aba === 'entrar' ? (
            <div className={styles.formulario}>
              <div className={styles.campo}>
                <label>Email</label>
                <div className={styles.inputWrapper}>
                  <span>✉</span>
                  <input type="email" placeholder="seu@email.com" />
                </div>
              </div>
              <div className={styles.campo}>
                <label>Senha</label>
                <div className={styles.inputWrapper}>
                  <span>🔒</span>
                  <input type="password" placeholder="Mínimo 6 caracteres" />
                </div>
              </div>
              <p className={styles.esqueci}>Esqueci minha senha</p>
              <button className={styles.botao}>Entrar</button>
            </div>
          ) : (
            <div className={styles.formulario}>
              <div className={styles.campo}>
                <label>Nome Completo</label>
                <div className={styles.inputWrapper}>
                  <span>👤</span>
                  <input type="text" placeholder="Seu nome completo" />
                </div>
              </div>
              <div className={styles.campo}>
                <label>Email</label>
                <div className={styles.inputWrapper}>
                  <span>✉</span>
                  <input type="email" placeholder="seu@email.com" />
                </div>
              </div>
              <div className={styles.campo}>
                <label>Senha</label>
                <div className={styles.inputWrapper}>
                  <span>🔒</span>
                  <input type="password" placeholder="Mínimo 6 caracteres" />
                </div>
              </div>
              <div className={styles.campo}>
                <label>Confirmar Senha</label>
                <div className={styles.inputWrapper}>
                  <span>🔒</span>
                  <input type="password" placeholder="Repita sua senha" />
                </div>
              </div>
              <button className={styles.botao}>Criar Minha Conta</button>
            </div>
          )}

          <p className={styles.termos}>
            Ao criar uma conta, você concorda com nossos termos de uso
          </p>
        </div>
      </div>

    </div>
  )
}

export default Login