import React, { useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";
import { GET_HOUSE_PRICE_BY_DISTRICT } from "../../GraphQL/Queries";
import { useQuery } from "@apollo/client";
import { PieChartData, DistrictAndHousePrice } from "../../types";
import PieChart from "../../components/DistrictHouseCount/PieChart";
import TableView from "../../components/DistrictHouseCount/TableView";
import dynamic from "next/dynamic";
import SideBar from "../../components/SideBar";
import Loading from "../../components/Loading";
import { formatPrice } from "../../utils/formatText";
import Head from "next/head";

const loadingMap = () => <p>A map is loading</p>;
const Map = dynamic(() => import("../../components/Map"), {
  loading: loadingMap,
  ssr: false,
});

const PriceAnalytics = () => {
  const router = useRouter();
  let districtsWithHousePrices = [];
  const { cityID } = router.query;

  const { loading, error, data } = useQuery(GET_HOUSE_PRICE_BY_DISTRICT, {
    variables: { cityID: cityID },
  });

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;

  districtsWithHousePrices = data.housePricesByDistrict;

  const chartData: PieChartData[] = districtsWithHousePrices.map(
    (district: DistrictAndHousePrice) => {
      return {
        id: district.name,
        label: district.name,
        value: district.average_price,
        color: "hsl(302, 70%, 50%)",
      };
    }
  );

  return (
    <div>
      <Head>
        <title>Giá BĐS Theo Khu Vực</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      <SideBar
        cityID={cityID}
        cityName={districtsWithHousePrices[0].city.name}
        mode="price"
      >
        <div className="mx-40">
          {districtsWithHousePrices.length === 0 && (
            <p>Không tìm thấy quận nào đăng bán nhà</p>
          )}
          <h1 className="break-words text-2xl font-bold leading-7 text-gray-900 sm:text-3xl my-5">
            Phân tích số bật động sản được rao bán theo từng khu vực tại{" "}
            {districtsWithHousePrices[0].city.name}
          </h1>
          <div className="my-5">
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500">
                  {"Giá trung bình"}
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {formatPrice(districtsWithHousePrices[0].mean_price)} VND
                </dd>
              </div>
            </dl>
          </div>
          <h1 className="text-xl my-3 font-bold leading-7 text-gray-900 sm:text-xl sm:truncate ">
            Bản đồ thống kê
          </h1>
          <Map points={districtsWithHousePrices} isHousePrice />
          <div className="flex flex-row justify-center">
            <p className="font-bold mx-5">{"Chú thích: "} </p>
            <p>
              <span className="text-red-500">
                Đỏ: {"Giá cao hơn trung bình "}
              </span>
            </p>
            <p className="mx-5">
              <span className="text-yellow-500">Vàng: {"Giá trung bình "}</span>
            </p>
            <p className="mx-5">
              <span className="text-green-500">
                Xanh: {"Giá thấp hơn trung bình"}
              </span>
            </p>
          </div>
          <h1 className="text-xl my-3 font-bold leading-7 text-gray-900 sm:text-xl sm:truncate ">
            Biểu đồ thống kê (theo VND)
          </h1>
          <PieChart chartData={chartData} />
          <h1 className="text-xl my-3 font-bold leading-7 text-gray-900 sm:text-xl sm:truncate ">
            Danh sách thống kê
          </h1>
          <TableView
            rows={["Tên Quận", "Giá Bất Động Sản Trung Bình (VND)"]}
            data={districtsWithHousePrices}
          />
        </div>
      </SideBar>
    </div>
  );
};

export default PriceAnalytics;
