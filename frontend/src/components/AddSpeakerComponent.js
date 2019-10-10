import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { restActions } from '../actions/restActions';
import { restConstants } from '../constants/restConstants';

class AddSpeakerComponent extends React.Component {
  state = {
    name: '',
    info: '',
    img: '',
    postSuccess: false
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { newSpeaker } = this.props.speakerReducer;
    if (newSpeaker !== prevProps.speakerReducer.newSpeaker) {
      this.setState({
        postSuccess: true
      });
    }
  }

  handleChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  };

  handleSubmit = () => {
    const { dispatch } = this.props;
    const speaker = {
      name: this.state.name,
      info: this.state.info,
      img: this.state.img
    };

    dispatch(
      restActions.restPost(
        speaker,
        '/speakers',
        restConstants.POST_SPEAKER_REQUEST
      )
    );
  };

  render() {
    const { postSuccess } = this.state;

    if (postSuccess) {
      return <Redirect to="/showSpeakers" />;
    }

    return (
      <div>
        <br />
        <h3>Dodawanie nowego prelegenta</h3>

        <MuiThemeProvider>
          <React.Fragment>
            <TextField
              hintText="Imię i nazwisko prelegenta"
              floatingLabelText="imię i nazwisko"
              onChange={this.handleChange('name')}
            />
            <br />
            <TextField
              hintText="Informacje na temat prelegenta"
              floatingLabelText="informacje"
              onChange={this.handleChange('info')}
            />
            <br />
            <TextField
              hintText="Link do zdjęcia"
              floatingLabelText="zdjęcie"
              onChange={this.handleChange('img')}
            />
            <br />
            <br />
            <RaisedButton label="dodaj" primary onClick={this.handleSubmit} />
          </React.Fragment>
        </MuiThemeProvider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { speakerReducer } = state;
  return { speakerReducer };
}

export default connect(mapStateToProps)(AddSpeakerComponent);
