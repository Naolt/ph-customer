import axios from "axios";

export const getRoutePolyline = async (
  start,
  end = [9.0343915, 38.7526558]
) => {
  const url = `http://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=polyline`;

  const response = await axios.get(url);
  const polyline = response.data.routes[0].geometry;
  const distance = response.data.routes[0].distance;
  return { distance, polyline };
};
