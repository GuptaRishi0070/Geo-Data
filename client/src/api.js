const API_URL = 'http://127.0.0.1:3001';

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const login = async (userData) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const uploadFile = async (fileData, email) => {
  const formData = new FormData();
  formData.append('file', fileData);

  const response = await fetch(`${API_URL}/upload/file`, {
    method: 'POST',
    headers: {
      'x-user-email': email,
    },
    body: formData,
  });
  return response.json();
};

export const addMarker = async (markerData, email) => {
  try {
    const response = await fetch(`${API_URL}/markers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-email': email,
      },
      body: JSON.stringify(markerData),
    });
    const data = await response.json();
    console.log('Marker added:', data);
    return data;
  } catch (error) {
    console.error('Error adding marker:', error);
  }
};

export const deleteMarker = async (markerId, email) => {
  const response = await fetch(`${API_URL}/markers/${markerId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-user-email': email,
    },
  });
  return response.json();
};

export const getMarkers = async (email) => {
  const response = await fetch(`${API_URL}/markers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-user-email': email,
    },
  });
  return response.json();
};