import React from 'react';
import PropTypes from 'prop-types';
import Header from '../meusComponentes/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../meusComponentes/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../meusComponentes/Loading';

class Album extends React.Component {
  state = {
    musicas: [],
    artiste: '',
    album: '',
    loading: false,
    listaDeFavoritas: [],
  };

  async componentDidMount() {
    this.requisicaoDaMusica();
    this.requisicaoFavoritos();
  }

  requisicaoDaMusica = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const retornoMusicas = await getMusics(id);
    const nomeDoArtista = retornoMusicas[0].artistName;
    const nomeDoAlbum = retornoMusicas[0].collectionName;

    this.setState({
      musicas: retornoMusicas,
      artiste: nomeDoArtista,
      album: nomeDoAlbum,
    });
  };

  requisicaoFavoritos = async () => {
    this.setState({
      loading: true,
    });

    const listaDeFavoritas = await getFavoriteSongs();

    this.setState({
      listaDeFavoritas,
      loading: false,
    });
  };

  render() {
    const { musicas, artiste, album, loading, listaDeFavoritas } = this.state;
    const soMusicas = musicas.slice(1);

    return (
      <div data-testid="page-album">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <>
            <h1 data-testid="artist-name">{artiste}</h1>
            <h2 data-testid="album-name">{album}</h2>
            {soMusicas.map((musica) => (
              <MusicCard
                key={ musica.trackId }
                musica={ musica }
                listaDeFavoritas={ listaDeFavoritas }
              />
            ))}
          </>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
