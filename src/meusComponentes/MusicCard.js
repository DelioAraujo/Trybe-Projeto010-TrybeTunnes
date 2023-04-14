import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musicas } = this.props;

    const soMusicas = musicas.slice(1);

    return (
      <div>
        {soMusicas.map((musica) => (
          <div key={ musica.trackId }>

            <h3>{musica.trackName}</h3>

            <audio data-testid="audio-component" src={ musica.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
          </div>
        ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicas: PropTypes.arrayOf(
    PropTypes.shape({
      trackId: PropTypes.number.isRequired,
      trackName: PropTypes.string.isRequired,
      previewUrl: PropTypes.string.isRequired
    }),
  ).isRequired,
};

export default MusicCard;
