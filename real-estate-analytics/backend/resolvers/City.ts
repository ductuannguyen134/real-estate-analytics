import { CityModel } from "../models/City";

export const allCitiesResolver = async () => {
  const cities = await CityModel.find().sort("city");
  return cities;
};
