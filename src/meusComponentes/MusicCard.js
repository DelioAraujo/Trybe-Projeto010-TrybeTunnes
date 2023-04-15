import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
  };

  async handleCheckboxClick(musica) {
    this.setState({
      loading: true,
    });

    await addSong(musica);

    this.setState({
      loading: false,
    });
  }

  render() {
    const { musica } = this.props;

    const { loading } = this.state;

    return (
      <div>
        {loading ? <Loading /> : (
          <div key={ musica.trackId }>
            <h3>{musica.trackName}</h3>

            <label htmlFor={ `checkbox-music-${musica.trackId}` }>
              Favorita
              <input
                type="checkbox"
                id={ `checkbox-music-${musica.trackId}` }
                data-testid={ `checkbox-music-${musica.trackId}` }
                onChange={ () => this.handleCheckboxClick(musica) }
              />
            </label>

            <audio data-testid="audio-component" src={ musica.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musica: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
