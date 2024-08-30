import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useGlobalReducer } from '../hooks/useGlobalReducer';
import { addToFavorites } from './Actions';
import '../assets/css/EntityList.css';

const EntityList = ({ entities, entityType, onFavorite }) => {
  const { dispatch } = useGlobalReducer();
  const sliderRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const slider = sliderRef.current;

    const handleMouseDown = (e) => {
      isDown.current = true;
      slider.classList.add('active');
      startX.current = e.pageX - slider.offsetLeft;
      scrollLeft.current = slider.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown.current = false;
      slider.classList.remove('active');
    };

    const handleMouseUp = () => {
      isDown.current = false;
      slider.classList.remove('active');
    };

    const handleMouseMove = (e) => {
      if (!isDown.current) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX.current) * 3; // scroll-fast
      slider.scrollLeft = scrollLeft.current - walk;
    };

    slider.addEventListener('mousedown', handleMouseDown);
    slider.addEventListener('mouseleave', handleMouseLeave);
    slider.addEventListener('mouseup', handleMouseUp);
    slider.addEventListener('mousemove', handleMouseMove);

    return () => {
      slider.removeEventListener('mousedown', handleMouseDown);
      slider.removeEventListener('mouseleave', handleMouseLeave);
      slider.removeEventListener('mouseup', handleMouseUp);
      slider.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const renderEntities = (filteredEntities, derivedEntityType) => {
    return (
      <div className="slider-container">
        <div className="slider" ref={sliderRef}>
          {filteredEntities.map((entity) => {
            let imageEntityType = derivedEntityType;
            if (entityType === 'favorites') {
              imageEntityType = entity.url.includes('people') ? 'characters' : imageEntityType;
              imageEntityType = entity.url.includes('planets') ? 'planets' : imageEntityType;
              imageEntityType = entity.url.includes('vehicles') ? 'vehicles' : imageEntityType;
            }

            return (
              <div className="card" key={entity.uid}>
                <img
                  className="card-img-top"
                  src={`https://starwars-visualguide.com/assets/img/${imageEntityType}/${entity.uid}.jpg`}
                  alt={entity.name}
                  style={{ width: '100%', height: '195px' }}
                />
                <div className="card-body">
                  <div className="card-header">
                    <div className="title">
                      <p className="card-title">{entity.name}</p>
                    </div>
                    <div className="heart">
                      <button
                        id="favorite"
                        onClick={() =>
                          onFavorite ? onFavorite(entity) : dispatch(addToFavorites(entity))
                        }
                      >
                        <i className="fa-solid fa-heart"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="learn-more">
                  <button className="anchor">
                    <Link to={`./Details.jsx/${derivedEntityType}/${entity.uid}`}>Learn more!</Link>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const characters = entities.filter((entity) => entity.url.includes('people'));
  const vehicles = entities.filter((entity) => entity.url.includes('vehicles'));
  const planets = entities.filter((entity) => entity.url.includes('planets'));

  return (
    <div className="entity-list">
      {renderEntities(characters, 'characters')}
      {renderEntities(vehicles, 'vehicles')}
      {renderEntities(planets, 'planets')}
    </div>
  );
};

export default EntityList;