import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
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
        <nav>
          <Link to="/Search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/Favorites" data-testid="link-to-favorites">Favoritos</Link>
          <Link to="/Profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
        {loading ? <Loading /> : null}
      </header>
    );
  }
}

export default Header;