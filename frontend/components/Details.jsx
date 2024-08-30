import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/css/Details.css';
function Details() {
  const { type, id } = useParams();
  const [entity, setEntity] = useState({});

  // here is an if statement to catch "chatacters" and make people instead
  // if (type === "characters") type = "people";

//mapping entities
const typeMapping = {
  characters: "people",
  // other mappings can go here
};

const apiType = typeMapping[type] || type;

  useEffect(() => {
    const fetchEntity = async () => {
      try {
        let response = await fetch(`https://www.swapi.tech/api/${type}/${id}`);
        let data = await response.json();
        setEntity(data.result.properties);
      } catch (error) {
        console.error('Failed to fetch entity details', error);
      }
    };
    fetchEntity();
  }, [id, type]);

  return (
    <div className="container">
      {entity ? (
        <>
          <h1 style={{ color: "#ffe81f", marginLeft: "50px" }}>{entity.name}</h1>
          {type === 'people' && (
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <p>Height:</p> 
                  <p>Weight:</p>
                  <p>Hair-Color:</p>
                  <p>Eye-Color:</p>
                  <p>Birth Year:</p>
                  <p>Gender:</p>
                </div>
                <div style={{marginLeft: "20px"  }}>
                  <p>{entity.height}</p>
                  <p>{entity.mass}</p>
                  <p>{entity.hair_color}</p>
                  <p>{entity.eye_color}</p>
                  <p>{entity.birth_year}</p>
                  <p>{entity.gender}</p>
                </div>
              </div>
            </>
          )}
          {type === 'vehicles' && (
            <>
              <div style={{ display: "flex" }}>
                <div style={{ marginLeft: "100px"}}>
                  <p>Manufacturer:</p>
                  <p>Model:</p>
                  <p>Vehicle Class:</p>
                  <p>Cargo Capacity:</p>
                  <p>Consumables:</p>
                  <p>Cost In Credits:</p>
                  <p>Crew:</p>
                  <p>Passengers:</p>
                </div>
                <div style={{marginLeft: "20px"  }}>
                  <p>{entity.manufacturer}</p>
                  <p>{entity.model}</p>
                  <p>{entity.vehicle_class}</p>
                  <p>{entity.cargo_capacity}</p>
                  <p>{entity.consumables}</p>
                  <p>{entity.cost_in_credits}</p>
                  <p>{entity.crew}</p>
                  <p>{entity.passengers}</p>
                </div>
              </div>
              
            </>
          )}
          {type === 'planets' && (
            <>
              <div style={{ display: "flex" }}>
                <div style={{ marginLeft: "100px"}}>  
                  <p>Terrain:</p>
                  <p>Climate:</p>
                  <p>Population:</p>
                  <p>Diameter:</p>
                  <p>Rotation Period:</p>
                  <p>Orbital Period:</p>
                </div>
                <div style={{marginLeft: "20px"  }}>
                  <p>{entity.terrain}</p>
                  <p>{entity.climate}</p>
                  <p>{entity.population}</p>
                  <p>{entity.diameter}</p>
                  <p>{entity.rotation_period}</p>
                  <p>{entity.orbital_period}</p>
                </div>
              </div>
          </>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Details;