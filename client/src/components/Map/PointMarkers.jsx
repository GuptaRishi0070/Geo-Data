import { useEffect } from 'react';
import PropTypes from "prop-types";
import mapboxgl from 'mapbox-gl';
import { addMarker, deleteMarker } from '../../api';

const PointMarkers = ({ map, email }) => {
  useEffect(() => {
    if (!map) return;

    const addMarkerToMap = async (e) => {

      const marker = new mapboxgl.Marker({
        draggable: true,
      })
        .setLngLat(e.lngLat)
        .addTo(map);


      try {
        const addedMarker = await addMarker(
          { lng: e.lngLat.lng, lat: e.lngLat.lat, description: 'New marker' },
          email
        );


        marker._element.id = addedMarker.marker._id;
      } catch (error) {
        console.error('Error adding marker to database:', error);
      }


      const handleDragEnd = async () => {
        const lngLat = marker.getLngLat();
        console.log('Marker moved to:', lngLat);


        try {
          await addMarker(
            { lng: lngLat.lng, lat: lngLat.lat, description: 'Updated marker' },
            email
          );
        } catch (error) {
          console.error('Error updating marker in database:', error);
        }
      };

      marker.on('dragend', handleDragEnd);


      const handleContextMenu = async (e) => {
        e.preventDefault();
        marker.remove();


        try {
          await deleteMarker(marker._element.id, email);
        } catch (error) {
          console.error('Error deleting marker from database:', error);
        }
      };

      marker.getElement().addEventListener('contextmenu', handleContextMenu);


      return () => {
        marker.getElement().removeEventListener('contextmenu', handleContextMenu);
      };
    };


    map.on('dblclick', addMarkerToMap);


    return () => {
      map.off('dblclick', addMarkerToMap);
    };
  }, [map, email]);

  return null;
};

PointMarkers.propTypes = {
  map: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
};

export default PointMarkers;
