import PropTypes from 'prop-types';
import { useEffect } from 'react';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

const DrawControls = ({ map, setShapes }) => {
  useEffect(() => {
    if (!map) return;

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true, 
        trash: true,   
      },
    });

    
    map.addControl(draw, 'top-left');

   
    const updateShapes = () => {
      const data = draw.getAll();  
      console.log('Shapes:', data);
      setShapes(data); 
    };

    
    map.on('draw.create', updateShapes);
    map.on('draw.update', updateShapes);
    map.on('draw.delete', updateShapes);

    
    return () => {
      map.off('draw.create', updateShapes);
      map.off('draw.update', updateShapes);
      map.off('draw.delete', updateShapes);
      map.removeControl(draw); 
    };
  }, [map, setShapes]);

  return null;
};

DrawControls.propTypes = {
  map: PropTypes.object.isRequired,
  setShapes: PropTypes.func.isRequired, 
};

export default DrawControls;
