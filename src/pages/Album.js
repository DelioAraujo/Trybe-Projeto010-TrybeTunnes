import React from 'react';
import Header from '../meusComponentes/Header';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state={
    musics: [],

  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const resultadoMusicas = getMusics(id);

    this.setState({
        musics: resultadoMusicas,
    });
  }

  render() {
    return (
      <div data-testid="page-album">
        <Header />
      </div>
    );
  }
}

export default Album;
