import React from 'react';
import Header from '../meusComponentes/Header';

class Search extends React.Component {
  state = {
    pesquisa: '',
    botaoDesabilitado: true,
  };

  validacaoNome = () => {
    const { pesquisa } = this.state;
    const tamanhoMinimo = 2;
    const validacao = pesquisa.length >= tamanhoMinimo;

    this.setState({
      botaoDesabilitado: !validacao,
    });
  };

  handleChange = (event) => {
    this.setState({
      pesquisa: event.target.value,
    }, this.validacaoNome);
  };

  render() {
    const { botaoDesabilitado } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="search-artist-input">Buscar artista ou banda:</label>
        <input
          type="text"
          id="search-artist-input"
          data-testid="search-artist-input"
          onChange={ this.handleChange }
        />
        <button
          disabled={ botaoDesabilitado }
          type="button"
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
