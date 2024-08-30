// Favorites.jsx
import React from 'react';
import EntityList from './EntityList';
import { useGlobalReducer } from '../hooks/useGlobalReducer';
import { removeFromFavorites } from './Actions';

const Favorites = () => {
  const { state, dispatch } = useGlobalReducer();
  const { favorites } = state;

  return (
    <div className="container" style={{ fontFamily: "SF Distant Galaxy, sans-serif", color: "#ffe81f"  }}>
      <h1>Favorites</h1>
      <EntityList entities={favorites} entityType="favorites" onFavorite={(entity) => dispatch(removeFromFavorites(entity))} />
    </div>
  );
};

export default Favorites;