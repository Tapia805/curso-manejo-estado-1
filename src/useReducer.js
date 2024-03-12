import React from 'react';

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    if (!!state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          dispatch({ type: 'CONFIRM' });
        } else {
          dispatch({ type: 'ERROR' });
        }
      }, 3000);
    }
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
          <h2>Eliminar {name}</h2>
    
          <p>Por favor, escribe el codigo de seguridad.</p>
 
          {(state.error && !state.loading) && (<p>Error: el codigo es incorrecto</p>)}
 
          {state.loading && (<p>Cargando...</p>)}
    
          <input 
            placeholder='codigo de seguridad'
            value={state.value}
            onChange={(event) => {
             dispatch({ type: 'WRITE', payload: event.target.value });
            }}
           />
    
          <button onClick={() => {
             dispatch({ type: 'CHECK' });
           }} >Comprobar
          </button>
      </div>
   );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>Pedimos confirmacion ¿estas seguro?</p>
        <button onClick={() => {
          dispatch({ type: 'DELETE' });
          }}
        >Si, eliminar
        </button>
        <button onClick={() => {
          dispatch({ type: 'RESET' });
          }}
        >No, me arrepenti
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con exito</p>
        <button onClick={() => {
          dispatch({ type: 'RESET' });
          }}
        >Resetear, volver atras
        </button>
      </React.Fragment>
    );
  }
}

const initialState = {
 value: '',
 error: false,
 loading: false,
 deleted: false,
 confirmed: false,
}

// Tercera forma y la que voy a usar
const reducerObject = (state, payload) => ({
  'CONFIRM': {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  'ERROR': {
   ...state,
   error: true,
   loading: false,
  },
  'CHECK': {
    ...state,
    loading: true,
  },
  'WRITE': {
    ...state,
    value: payload,
  },
  'DELETE': {
    ...state,
    deleted: true,
   },
   'RESET': {
    ...state,
    confirmed: false,
    deleted: false,
    value: '',
   },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
}

export { UseReducer };