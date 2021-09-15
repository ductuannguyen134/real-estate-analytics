import { gql } from "@apollo/client";

export const GET_ALL_CITIES = gql`
  query getAllCities {
    cities {
      id
      name
      place_id
      coordinates {
        lat
        lng
      }
    }
  }
`;

export const TOTAL_HOUSES_BY_DISTRICT = gql`
  query totalHousesByDistrict($cityID: ID!) {
    totalHousesByDistrict(cityID: $cityID) {
      _id
      name
      place_id
      houseCount
      city {
        name
      }
      coordinates {
        lat
        lng
      }
    }
  }
`;

export const GET_HOUSE_PRICE_BY_DISTRICT = gql`
  query housePricesByDistrict($cityID: ID!) {
    housePricesByDistrict(cityID: $cityID) {
      _id
      name
      average_price
      insight
      mean_price
      place_id
      city {
        name
      }
      coordinates {
        lat
        lng
      }
    }
  }
`;
