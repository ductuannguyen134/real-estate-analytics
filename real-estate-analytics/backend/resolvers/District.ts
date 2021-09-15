import { DistrictModel } from "../models/Districts";
import mongoose from "mongoose";
import { HouseModel } from "../models/House";

export const districtsByCityResolver = async (cityID: string) => {
  console.log(new mongoose.Types.ObjectId(cityID));
  const districts = await DistrictModel.find({
    city: new mongoose.Types.ObjectId(cityID),
  })
    .populate("city")
    .sort("district");
  return districts;
};

export const totalHousesByDistrictResolver = async (cityID: string) => {
  const districtIds = await getDistrictIdsByCityId(cityID);
  const groupedDistrictIds = await HouseModel.aggregate([
    {
      $group: {
        _id: "$location",
        houseCounts: { $sum: 1 },
      },
    },
    {
      $match: {
        _id: {
          $in: districtIds,
        },
      },
    },
    {
      $sort: {
        houseCounts: -1,
      },
    },
  ]);

  const results = await Promise.all(
    groupedDistrictIds.map(async (district) => {
      const foundDistrict = await DistrictModel.findOne({
        _id: district._id,
      })
        .populate("city")
        .lean()
        .exec();

      const houseCount = {
        houseCount: district.houseCounts,
      };
      const formattedDistrict = await Object.assign(
        {},
        foundDistrict,
        houseCount
      );
      return formattedDistrict;
    })
  );
  return results;
};

export const housePricesByDistrictResolver = async (cityID: string) => {
  const PRICE_DIFFERENCE = 2000000000;
  const districtIds = await getDistrictIdsByCityId(cityID);
  const groupedDistrictIds = await HouseModel.aggregate([
    {
      $group: {
        _id: "$location",
        url: { $first: "$url" },
        totalPrice: { $sum: "$price" },
        houseCount: { $sum: 1 },
      },
    },
    {
      $match: {
        _id: {
          $in: districtIds,
        },
      },
    },
  ]);
  const retrievedPriceList = groupedDistrictIds.map(
    (district: any) => district.totalPrice
  );
  const retrievedHouseCounts = groupedDistrictIds.map(
    (district: any) => district.houseCount
  );
  const totalPrice = retrievedPriceList.reduce(
    (price, accumulatedPrice) => price + accumulatedPrice,
    0
  );
  const totalHouseCount = retrievedHouseCounts.reduce(
    (count, accumulatedCount) => count + accumulatedCount,
    0
  );
  const meanPrice = totalPrice / totalHouseCount;
  const results = await Promise.all(
    groupedDistrictIds.map(async (district) => {
      const foundDistrict = await DistrictModel.findOne({
        _id: district._id,
      })
        .populate("city")
        .lean()
        .exec();
      const averagePrice = district.totalPrice / district.houseCount;
      const additionalInfo = {
        average_price: Math.round(averagePrice),
        mean_price: Math.round(meanPrice),
        insight:
          averagePrice > meanPrice + PRICE_DIFFERENCE
            ? "high"
            : averagePrice <= meanPrice + PRICE_DIFFERENCE &&
              averagePrice >= meanPrice - PRICE_DIFFERENCE
            ? "medium"
            : averagePrice < meanPrice - PRICE_DIFFERENCE && "low",
      };
      const formattedDistrict = await Object.assign(
        {},
        foundDistrict,
        additionalInfo
      );
      return formattedDistrict;
    })
  );
  return results.sort((a, b) => b.average_price - a.average_price);
};

const getDistrictIdsByCityId = async (cityID: string) => {
  const districts = await DistrictModel.find({
    city: new mongoose.Types.ObjectId(cityID),
  }).populate("city");
  const districtIds = districts.map(
    (district) => new mongoose.Types.ObjectId(district.id)
  );
  return districtIds;
};
