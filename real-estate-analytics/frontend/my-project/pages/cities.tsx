import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { useQuery } from "@apollo/client";
import { GET_ALL_CITIES } from "../GraphQL/Queries";
import Link from "next/link";
import { City } from "../types";
import Card from "../components/Card";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Loading from "../components/Loading";
import Head from "next/head";

const loadingMap = () => <p>A map is loading</p>;

const Map = dynamic(() => import("../components/Map"), {
  loading: loadingMap,
  ssr: false,
});

const Cities = () => {
  const router = useRouter();
  const { mode } = router.query;

  let cities = [];
  const { loading, error, data } = useQuery(GET_ALL_CITIES);
  const [searchItem, setSearchItem] = useState<string>("");

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;

  cities = data.cities;
  cities = cities.filter((city: City) => {
    console.log(searchItem);
    return city.name.toLowerCase().includes(searchItem.toLocaleLowerCase());
  });
  console.log(cities);
  return (
    <div>
      <Head>
        <title>Thành Phố</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      <div className="mx-40">
        <Map points={data.cities} />
        <div className="flex justify-center my-5 items-center ">
          <div className="flex justify-center items-center border-2 border-indigo-700 rounded bg-indigo-500">
            <input
              type="text"
              placeholder="Search"
              className="p-2 rounded  border-2 border-indigo-500"
              value={searchItem}
              onChange={(e) => {
                setSearchItem(e.target.value);
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 m-2 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-3">
          {cities.map((city: City, index: number) => (
            // eslint-disable-next-line @next/next/link-passhref
            <Link
              key={city.id}
              href={{
                pathname: `/district/${router.query.mode}`,
                query: {
                  cityID: city.id,
                },
              }}
            >
              <a>
                <Card>{city.name}</Card>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cities;
