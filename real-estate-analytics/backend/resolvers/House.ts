import { DistrictModel } from "./../models/Districts";
import mongoose from "mongoose";
import { HouseModel } from "./../models/House";

export const ascendingHousesByCityResolver = async (cityID: string) => {
  console.log(cityID);
  const houses = await HouseModel.find().populate({
    path: "location",
    match: {
      location: cityID,
    },
    model: DistrictModel,
  });
  console.log(houses);
};
