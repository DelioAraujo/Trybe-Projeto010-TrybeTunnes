import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    loading: false,
    nomeRecuperado: '',
  };

  async componentDidMount() {
    await this.recuperaNome();
  }

  recuperaNome = async () => {
    this.setState({ loading: true });

    const objetoRecuperado = await getUser();
    const nomeRecuperado = objetoRecuperado.name;

    this.setState({
      nomeRecuperado,
    });

    this.setState({ loading: false });
  };

  render() {
    const { loading, nomeRecuperado } = this.state;
    return (
      <header data-testid="header-component">
        <h1 data-testid="header-user-name">
          {nomeRecuperado}
        </h1>
        {loading ? <Loading /> : null}
      </header>
    );
  }
}

export default Header;
