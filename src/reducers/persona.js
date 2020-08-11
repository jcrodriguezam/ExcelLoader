const INITIAL_STATE = {
  messages: null,
  limit: 5,
};

const applySetPersonas = (state, action) => ({
  ...state,
  personas: action.personas,
});

const applySetPersonasLimit = (state, action) => ({
  ...state,
  limit: action.limit,
});

function personaReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'PERSONAS_SET': {
      return applySetPersonas(state, action);
    }
    case 'PERSONAS_LIMIT_SET': {
      return applySetPersonasLimit(state, action);
    }
    default:
      return state;
  }
}

export default personaReducer;
