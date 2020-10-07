import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import PersonaNameList from './PersonaNameList.tsx';

import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

class Personas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
    };
  }

  componentDidMount() {
    if (!this.props.personas.length) {
      this.setState({ loading: true });
    }

    this.onListenForPersonas();
  }

  componentDidUpdate(props) {
    if (props.limit !== this.props.limit) {
      this.onListenForPersonas();
    }
  }

  onListenForPersonas = () => {
    this.props.firebase
      .personas()
      .orderByChild('createdAt')
      .limitToLast(this.props.limit)
      .on('value', snapshot => {
        this.props.onSetPersonas(snapshot.val());

        this.setState({ loading: false });
      });
  };

  componentWillUnmount() {
    this.props.firebase.personas().off();
  }

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };

  onCreatePersona = (event, authUser) => {
    this.props.firebase.personas().push({
      text: this.state.text,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ text: '' });

    event.preventDefault();
  };

  onEditPersona = (persona, text) => {
    const { uid, ...personaSnapshot } = persona;

    this.props.firebase.persona(persona.uid).set({
      ...personaSnapshot,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemovePersona = uid => {
    this.props.firebase.persona(uid).remove();
  };

  onNextPage = () => {
    this.props.onSetPersonaLimit(this.props.limit + 5);
  };

  render() {
    const { personas } = this.props;
    const { text, loading } = this.state;

    return (
      <div>
        {loading && this.state.loading && (<Spinner size={SpinnerSize.large} label="Cargando personas..." />)}
        {personas && (
          <PersonaNameList
            authUser={this.props.authUser}
            messages={personas}
            onEditMessage={this.onEditPersona}
            onRemoveMessage={this.onRemovePersona}
          />
        )}

        {!personas && <div>There are no personas ...</div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  personas: Object.keys(state.personaState.personas || {}).map(
    key => ({
      ...state.personaState.personas[key],
      uid: key,
    }),
  ),
  limit: state.personaState.limit,
});

const mapDispatchToProps = dispatch => ({
  onSetPersonas: personas =>
    dispatch({ type: 'PERSONAS_SET', personas }),
  onSetPersonasLimit: limit =>
    dispatch({ type: 'PERSONAS_LIMIT_SET', limit }),
});

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Personas);
