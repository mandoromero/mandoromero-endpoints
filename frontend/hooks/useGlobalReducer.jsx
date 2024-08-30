import React, { createContext, useContext, useReducer } from 'react';
import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  SET_PEOPLE,
  SET_VEHICLES,
  SET_PLANETS
} from '../components/Actions';

const initialState = {
  characters: [],
  vehicles: [],
  planets: [],
  favorites: []
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(
          (favorite) => favorite.uid !== action.payload.uid
        ),
      };
    case SET_PEOPLE:
      return {
        ...state,
        characters: action.payload,
      };
    case SET_VEHICLES:
      return {
        ...state,
        vehicles: action.payload,
      };
    case SET_PLANETS:
      return {
        ...state,
        planets: action.payload,
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

const StoreContext = createContext();

const asyncDispatchMiddleware = (dispatch) => (action) => {
  if (typeof action === 'function') {
    return action(dispatch);
  }
  return dispatch(action);
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const enhancedDispatch = asyncDispatchMiddleware(dispatch);

  return (
    <StoreContext.Provider value={{ state, dispatch: enhancedDispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useGlobalReducer = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useGlobalReducer must be used within a StoreProvider');
  }
  return context;
};
