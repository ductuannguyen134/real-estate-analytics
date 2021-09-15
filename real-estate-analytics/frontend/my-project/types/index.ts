export interface City {
  id: string;
  name: string;
  placeId: string;
  coordinates: Coordinate;
}

export interface District {
  id: string;
  city: City;
  coordinates: Coordinate;
  name: string;
  place_id: string;
}

export interface DistrictAndHouseCount {
  _id: string;
  city: City;
  coordinates: Coordinate;
  name: string;
  place_id: string;
  houseCount: number;
}

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface PieChartData {
  id: string;
  label: string;
  value: number;
  color: string;
}

export interface DistrictAndHousePrice {
  _id: string;
  city: City;
  coordinates: Coordinate;
  name: string;
  place_id: string;
  average_price: number;
  insight: string;
  mean_price: number;
}
