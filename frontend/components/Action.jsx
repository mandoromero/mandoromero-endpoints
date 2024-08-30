export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const SET_PEOPLE = 'SET_PEOPLE';
export const SET_VEHICLES = 'SET_VEHICLES';
export const SET_PLANETS = 'SET_PLANETS';

export const addToFavorites = (item) => ({
  type: ADD_TO_FAVORITES,
  payload: item,
});

export const removeFromFavorites = (item) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: item,
});

// Fetch actions
export const fetchPeople = () => async (dispatch) => {
  try {
    const response = await fetch('https://www.swapi.tech/api/people/');
    const data = await response.json();
    dispatch({
      type: SET_PEOPLE,
      payload: data.results,
    });
  } catch (error) {
    console.error('Failed to fetch people:', error);
  }
};

export const fetchVehicles = () => async (dispatch) => {
  try {
    const response = await fetch('https://www.swapi.tech/api/vehicles/');
    const data = await response.json();
    dispatch({
      type: SET_VEHICLES,
      payload: data.results,
    });
  } catch (error) {
    console.error('Failed to fetch vehicles:', error);
  }
};

export const fetchPlanets = () => async (dispatch) => {
  try {
    const response = await fetch('https://www.swapi.tech/api/planets/');
    const data = await response.json();
    dispatch({
      type: SET_PLANETS,
      payload: data.results,
    });
  } catch (error) {
    console.error('Failed to fetch planets:', error);
  }
};
