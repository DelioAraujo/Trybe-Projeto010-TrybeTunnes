import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    nome: '',
    botaoDesabilitado: true,
    loading: false,
  };

  // se o estado tiver 3 ou mais caracteres, o estado botaoDesabilitado recebe falso e consequentemente é habilitado. essa função será usada sempre que o valor for alterado.
  validacaoNome = () => {
    const { nome } = this.state;
    const tamanhoMinimo = 3;
    const validacao = nome.length >= tamanhoMinimo;

    this.setState({
      botaoDesabilitado: !validacao,
    });
  };

  // o valor que é digitado é capturado e colocado no estado nome. Em seguida, a função validação é executada sempre que houver uma alteração no valor.
  handleNameChange = (event) => {
    this.setState({
      nome: event.target.value,
    }, this.validacaoNome);
  };

  handleClick = async (event) => {
    event.preventDefault();

    const { nome } = this.state;
    // coloca o estado loading como true. isso faz com que o elemento Loading seja renderizado devido ao operador ternário colocado antes do form
    this.setState({ loading: true });
    // executa a função createUser que recebe o estado nome como parametro e o salva.
    await createUser({ name: nome });
    // apenas após executar a função createUser, pq usamos o await, o estado loading é colocado como falso e assim o elemento Loading não seja mais rendereizado.
    this.setState({ loading: false });

    const { history } = this.props;
    // após a função createUser salvar o a informação, a página é redirecionada para a rota search
    history.push('/search');
  };

  render() {
    const { botaoDesabilitado, loading } = this.state;
    return (
      <div data-testid="page-login">
        {loading ? <Loading /> : null}
        <form>
          <label>
            Nome:
            <input
              type="text"
              data-testid="login-name-input"
              onChange={ this.handleNameChange }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ botaoDesabilitado }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
