import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Box } from '@mui/material';
import FileUpload from './FileUpload';
import DrawControls from './DrawControls';
import DistanceMeasurement from './DistanceMeasurement';
import PointMarkers from './PointMarkers';

const MAPBOX_TOKEN = "pk.eyJ1IjoiZGV2bGlucm9jaGEiLCJhIjoiY2t2bG82eTk4NXFrcDJvcXBsemZzdnJoYSJ9.aq3RAvhuRww7R_7q-giWpA";

mapboxgl.accessToken = MAPBOX_TOKEN;

const MapContainer = ({ email }) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [datasets, setDatasets] = useState([]);


  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 9,
    });

    mapInstance.on('load', () => {
      setMap(mapInstance);
    });

    return () => mapInstance.remove();
  }, []);

  return (
    <>
      <div style={{
        background: 'linear-gradient(to right, #5A8DFA, #AB33FE)',
        padding: '5px',
        borderRadius: '5px',
        textAlign: 'center',
        transition: 'all 0.3s ease',
      }}>
        <h4 style={{
          fontSize: '26px',
          WebkitBackgroundClip: 'text',
          color: 'white',
          borderRadius: '5px',
        }}>
          Geo-Data App
        </h4>
      </div>



      <Box>

        <Box
          ref={mapContainer}
          sx={{
            width: '100%',
            height: {
              xs: '50vh',
              sm: '60vh',
              md: '70vh',
              lg: '80vh',
              xl: '85vh',
            },
            boxShadow: 3,
            borderRadius: 2,
            mt: 2,
            mx: 'auto',
            transition: 'box-shadow 0.3s ease, transform 0.3s ease',
            '&:hover': {
              boxShadow: 5,
              transform: 'scale(1.01)',
            },
          }}
        />
        {map && (
          <>
            <FileUpload map={map} datasets={datasets} setDatasets={setDatasets} />
            <DrawControls map={map} />
            <DistanceMeasurement map={map} />
            <PointMarkers map={map} email={email} />
          </>
        )}
      </Box>
    </>
  );
};

MapContainer.propTypes = {
  email: PropTypes.string.isRequired,
};

export default MapContainer;
