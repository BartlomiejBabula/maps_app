import axios from "axios";

export const getCoordinates = async (data) => {
  let postLocalization = data.replaceAll(" ", "+");
  try {
    const response = await axios.post(
      `https://nominatim.openstreetmap.org/search?q=${postLocalization}&format=json&polygon=1&addressdetails=1`
    );
    let lat = parseFloat(response.data[0].lat);
    let lng = parseFloat(response.data[0].lon);
    return {
      lat,
      lng,
      spanData: response.data[0].display_name,
    };
  } catch (error) {
    console.log("getCoordinates error", error);
  } finally {
    ///
  }
};
