import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  SET_PEOPLE,
  SET_VEHICLES,
  SET_PLANETS
} from './components/Actions';  // Corrected import path

export function initializeState() {
  const characters = JSON.parse(localStorage.getItem('characters')) || [];
  const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  const planets = JSON.parse(localStorage.getItem('planets')) || [];
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  return {
    characters,
    vehicles,
    planets,
    favorites
  };
}

export const initialState = initializeState();

const storeReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_PEOPLE:
      newState = {
        ...state,
        characters: action.payload,
      };
      localStorage.setItem('characters', JSON.stringify(newState.characters));
      return newState;

    case SET_VEHICLES:
      newState = {
        ...state,
        vehicles: action.payload,
      };
      localStorage.setItem('vehicles', JSON.stringify(newState.vehicles));
      return newState;

    case SET_PLANETS:
      newState = {
        ...state,
        planets: action.payload,
      };
      localStorage.setItem('planets', JSON.stringify(newState.planets));
      return newState;

    case ADD_TO_FAVORITES:
      newState = {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
      localStorage.setItem('favorites', JSON.stringify(newState.favorites));
      return newState;

    case REMOVE_FROM_FAVORITES:
      newState = {
        ...state,
        favorites: state.favorites.filter(item => item.uid !== action.payload.uid),
      };
      localStorage.setItem('favorites', JSON.stringify(newState.favorites));
      return newState;

    default:
      throw new Error('Unknown action.');
  }
};

export default storeReducer;