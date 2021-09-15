import { allCitiesResolver } from "./resolvers/City";
require("dotenv").config();
import { ApolloServer, gql } from "apollo-server";
import mongoose from "mongoose";
import { CityModel } from "./models/City";
import { ascendingHousesByCityResolver } from "./resolvers/House";
import {
  districtsByCityResolver,
  housePricesByDistrictResolver,
  totalHousesByDistrictResolver,
} from "./resolvers/District";

const typeDefs = gql`
  scalar Date

  type City {
    id: ID!
    name: String
    place_id: String
    coordinates: Coordinate
  }

  type District {
    id: ID!
    city: City
    name: String
    coordinates: Coordinate
    place_id: String
  }

  type House {
    id: ID!
    title: String
    price: Float
    area: Area
    date: String
    location: District
    url: String
    unixTime: Date
  }

  type Area {
    value: Float
    unit: String
  }

  type Coordinate {
    lat: Float
    lng: Float
  }

  type DistrictAndHouseCount {
    _id: ID!
    city: City
    name: String
    coordinates: Coordinate
    place_id: String
    houseCount: Int
  }

  type DistrictWithHousePrices {
    _id: ID!
    city: City
    name: String
    coordinates: Coordinate
    place_id: String
    average_price: Float
    insight: String
    mean_price: Float
  }

  type Query {
    cities: [City]
    districtsByCity(cityID: ID!): [District]
    totalHousesByDistrict(cityID: ID!): [DistrictAndHouseCount]
    housePricesByDistrict(cityID: ID!): [DistrictWithHousePrices]
  }
`;

const resolvers = {
  Query: {
    cities() {
      return allCitiesResolver();
    },
    districtsByCity(parent: any, args: any, context: any) {
      return districtsByCityResolver(args.cityID);
    },
    totalHousesByDistrict(parent: any, args: any, context: any) {
      return totalHousesByDistrictResolver(args.cityID);
    },
    housePricesByDistrict(parent: any, args: any, context: any) {
      return housePricesByDistrictResolver(args.cityID);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    if (mongoose.connection.readyState !== 1) {
      mongoose
        .connect(
          `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.dngkg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
        )
        .then(() => {
          console.log("Connected to Mongoose");
        });
    }
  },
});

server.listen({ port: 4000 }).then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
