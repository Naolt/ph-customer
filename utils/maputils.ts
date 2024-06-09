import axios from "axios";

export const getLocationName = async (latitude, longitude) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
  const response = await axios.get(url);
  const address = response.data.address;
  return address;
};
