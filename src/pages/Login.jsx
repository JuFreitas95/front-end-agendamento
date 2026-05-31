import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import styles from './Login.module.css'

function Login() {
  const [aba, setAba] = useState('entrar')

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [nome, setNome] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  const navigate = useNavigate()

  const handleLogin = async () => {
    // 1. Verifica se os campos estão preenchidos
    if (!email || !senha) {
      setErro('Preencha o email e a senha')
      return
    }

    try {
      // 2. Ativa o estado de carregando
      setCarregando(true)
      setErro('')

      // 3. Envia os dados para a API
      const resposta = await api.post('/sessions', {
        email: email,
        password: senha
      })

      // 4. Pega o token da resposta e salva no navegador
      const token = resposta.data.token
      localStorage.setItem('token', token)

      // 5. Redireciona para o Dashboard
      navigate('/dashboard')

    } catch (error) {
      // 6. Se der erro, mostra a mensagem
      setErro('Email ou senha incorretos')
    } finally {
      // 7. Desativa o carregando sempre ao final
      setCarregando(false)
    }
  }


  const handleCadastro = async () => {
    // 1. Verifica se todos os campos estão preenchidos
    if (!nome || !email || !senha || !confirmarSenha) {
      setErro('Preencha todos os campos')
      return
    }

    // 2. Verifica se as senhas coincidem
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem')
      return
    }

    // 3. Verifica se a senha tem pelo menos 6 caracteres
    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres')
      return
    }

    try {
      // 4. Ativa o carregando
      setCarregando(true)
      setErro('')

      // 5. Envia os dados para a API
      await api.post('/users', {
        name: nome,
        email: email,
        password: senha,
        confirmPassword: confirmarSenha,
        companyId: 'studio-jj-tech-001'
      })

      // 6. Limpa os campos
      setNome('')
      setEmail('')
      setSenha('')
      setConfirmarSenha('')

      // 7. Muda para a aba de login com mensagem de sucesso
      setErro('')
      setAba('entrar')
      alert('Conta criada com sucesso! Faça login para continuar.')

    } catch (error) {
      // 8. Se der erro, mostra a mensagem
      if (error.response?.data?.message) {
        setErro(error.response.data.message)
      } else {
        setErro('Erro ao criar conta. Tente novamente.')
      }
    } finally {
      // 9. Desativa o carregando
      setCarregando(false)
    }
  }

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
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.campo}>
                <label>Senha</label>
                <div className={styles.inputWrapper}>
                  <span>🔒</span>
                  <input
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                  />
                </div>
              </div>
              <p className={styles.esqueci}>Esqueci minha senha</p>
              {erro && <p className={styles.erro}>{erro}</p>}
              <button
                className={styles.botao}
                onClick={handleLogin}
                disabled={carregando}
              >
                {carregando ? 'Aguarde...' : 'Entrar'}
              </button>
            </div>
          ) : (
            <div className={styles.formulario}>
              <div className={styles.campo}>
                <label>Nome Completo</label>
                <div className={styles.inputWrapper}>
                  <span>👤</span>
                  <input
                    type="text"
                    placeholder="Seu nome completo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.campo}>
                <label>Email</label>
                <div className={styles.inputWrapper}>
                  <span>✉</span>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.campo}>
                <label>Senha</label>
                <div className={styles.inputWrapper}>
                  <span>🔒</span>
                  <input
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.campo}>
                <label>Confirmar Senha</label>
                <div className={styles.inputWrapper}>
                  <span>🔒</span>
                  <input
                    type="password"
                    placeholder="Repita sua senha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                  />
                </div>
              </div>
              {erro && <p className={styles.erro}>{erro}</p>}
              <button
                className={styles.botao}
                onClick={handleCadastro}
                disabled={carregando}
              >
                {carregando ? 'Aguarde...' : 'Criar Minha Conta'}
              </button>
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