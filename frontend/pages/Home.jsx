import React, { useEffect } from 'react';
import EntityList from "../components/EntityList.jsx";
import { useGlobalReducer } from "../hooks/useGlobalReducer";
import { fetchPeople, fetchVehicles, fetchPlanets } from '../components/Actions.jsx';
import '../assets/css/Home.css';


const Home = () => {
  const { state, dispatch } = useGlobalReducer();
  
  useEffect(() => {
    dispatch(fetchPeople());
    dispatch(fetchVehicles());
    dispatch(fetchPlanets());
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Star Wars Entities</h1>
      <h2>Characters</h2>
      <EntityList entities={state.characters} entityType="characters" />
      <h2>Vehicles</h2>
      <EntityList entities={state.vehicles} entityType="vehicles" />
      <h2>Planets</h2>
      <EntityList entities={state.planets} entityType="planets" />
    </div>
  );
};


export default Home;