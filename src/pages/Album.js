import React from 'react';
import PropTypes from 'prop-types';
import Header from '../meusComponentes/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../meusComponentes/MusicCard';

class Album extends React.Component {
  state = {
    musicas: [],
    artiste: '',
    album: '',
  };

  async componentDidMount() {
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
  }

  render() {
    const { musicas, artiste, album } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">
          { artiste }
        </h1>
        <h2 data-testid="album-name">
          { album }
        </h2>
        <MusicCard musicas={ musicas } />
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
