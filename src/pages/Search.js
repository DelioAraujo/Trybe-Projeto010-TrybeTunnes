import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../meusComponentes/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../meusComponentes/Loading';

class Search extends React.Component {
  state = {
    pesquisaIniciada: false,
    pesquisa: '',
    termoPesquisado: '',
    botaoDesabilitado: true,
    resultadoPesquisa: [],
    loading: false,
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
    this.setState(
      {
        pesquisa: event.target.value,
        termoPesquisado: event.target.value,
      },
      this.validacaoNome,
    );
  };

  handleClick = async () => {
    const { pesquisa } = this.state;

    this.setState({
      loading: true,
      pesquisaIniciada: true,
    });

    const resultadoPesquisa = await searchAlbumsAPI(pesquisa);

    this.setState({
      resultadoPesquisa,
    });

    this.setState({
      pesquisa: '',
      loading: false,
    });
  };

  render() {
    const {
      pesquisaIniciada,
      botaoDesabilitado,
      pesquisa,
      resultadoPesquisa,
      loading,
      termoPesquisado } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="search-artist-input">Buscar artista ou banda:</label>
        <input
          type="text"
          id="search-artist-input"
          data-testid="search-artist-input"
          onChange={ this.handleChange }
          value={ pesquisa }
        />
        <button
          disabled={ botaoDesabilitado }
          type="button"
          data-testid="search-artist-button"
          onClick={ this.handleClick }
        >
          Pesquisar
        </button>

        {pesquisaIniciada ? (
          <h2>
            Você pesquisou por:
            {termoPesquisado}
          </h2>) : null}

        {loading ? <Loading /> : null}

        {resultadoPesquisa.length === 0
          ? <p>Nenhum álbum foi encontrado</p>
          : resultadoPesquisa.map((item) => (
            <div key={ item.collectionId }>
              <Link
                to={ `/album/${item.collectionId}` }
                data-testid={ `link-to-album-${item.collectionId}` }
              >
                <img src={ item.artworkUrl100 } alt="Capa do álbum" />
                <p>{item.collectionName}</p>
                <p>{item.artistName}</p>
              </Link>
            </div>
          )) }
      </div>
    );
  }
}

export default Search;
