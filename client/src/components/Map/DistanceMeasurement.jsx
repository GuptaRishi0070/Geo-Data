import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const DistanceMeasurement = ({ map }) => {
  const [coordinates, setCoordinates] = useState([]);
  const [line, setLine] = useState(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (!map) return;

    const addPoint = (e) => {
      const newCoordinates = [...coordinates, e.lngLat];
      setCoordinates(newCoordinates);

      const newLine = {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: newCoordinates.map(coord => [coord.lng, coord.lat])
        }
      };

      if (line) {
        map.getSource('line').setData(newLine); 
      } else {
        map.addSource('line', {
          type: 'geojson',
          data: newLine
        });

        map.addLayer({
          id: 'line',
          type: 'line',
          source: 'line',
          layout: {},
          paint: {
            'line-color': '#888',
            'line-width': 4
          }
        });

        setLine(newLine); 
      }

      const totalDistance = newCoordinates.reduce((acc, coord, index, arr) => {
        if (index === 0) return acc;
        const from = arr[index - 1];
        const to = coord;
        return acc + from.distanceTo(to); 
      }, 0);

      setDistance(totalDistance); 
    };

    map.on('click', addPoint);

    return () => {
      map.off('click', addPoint); 
    };
  }, [map, coordinates, line]);

  return (
    <div style={{
      position: 'absolute',
      top: 200,
      left: 10,
      backgroundColor: 'beige',
      padding: '20px',
      borderRadius: '10px',
      marginLeft: '10px',
      boxShadow: '0px 4px 10px rgba(56, 184, 28, 0.87)',
      width: 'auto',
      maxWidth: '300px',
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      color: '#333',
      textAlign: 'center',
    }}>
      <h4>Distance Measurement</h4>
      <p>{distance ? `${distance.toFixed(2)} meters` : 'Click to measure distance'}</p>
    </div>
  );
};

DistanceMeasurement.propTypes = {
  map: PropTypes.object.isRequired,
};

export default DistanceMeasurement;
