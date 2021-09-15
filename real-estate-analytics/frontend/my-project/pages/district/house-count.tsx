import React, { useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";
import { TOTAL_HOUSES_BY_DISTRICT } from "../../GraphQL/Queries";
import { useQuery } from "@apollo/client";
import { District, DistrictAndHouseCount, PieChartData } from "../../types";
import Card from "../../components/Card";
import { ResponsivePie } from "@nivo/pie";
import PieChart from "../../components/DistrictHouseCount/PieChart";
import TableView from "../../components/DistrictHouseCount/TableView";
import dynamic from "next/dynamic";
import SideBar from "../../components/SideBar";
import Loading from "../../components/Loading";
import Head from "next/head";

const loadingMap = () => <p>A map is loading</p>;
const Map = dynamic(() => import("../../components/Map"), {
  loading: loadingMap,
  ssr: false,
});

const DistrictList = () => {
  const router = useRouter();
  const { cityID } = router.query;

  const { loading, error, data } = useQuery(TOTAL_HOUSES_BY_DISTRICT, {
    variables: { cityID: cityID },
  });

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;

  const chartData: PieChartData[] = data.totalHousesByDistrict.map(
    (district: DistrictAndHouseCount) => {
      return {
        id: district.name,
        label: district.name,
        value: district.houseCount,
        color: "hsl(302, 70%, 50%)",
      };
    }
  );

  const houseCountList = data.totalHousesByDistrict.map(
    (district: DistrictAndHouseCount) => district.houseCount
  );

  const sumOfHouses = houseCountList.reduce(
    (partial_sum: number, a: number) => partial_sum + a,
    0
  );

  return (
    <div>
      {" "}
      <Head>
        <title>Số Lượng BĐS Theo Khu Vực</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      <SideBar
        mode="count"
        cityID={cityID}
        cityName={data.totalHousesByDistrict[0].city.name}
      >
        <div className="mx-40">
          {data.totalHousesByDistrict.length === 0 && (
            <p>Không tìm thấy quận nào đăng bán nhà</p>
          )}
          <h1 className="break-words text-2xl font-bold leading-7 text-gray-900 sm:text-3xl my-5">
            Phân tích số bật động sản được rao bán theo từng khu vực tại{" "}
            {data.totalHousesByDistrict[0].city.name}
          </h1>
          <div className="my-5">
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500">
                  {"Tổng số bất động sản được rao bán"}
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {sumOfHouses}
                </dd>
              </div>
            </dl>
          </div>
          <h1 className="text-xl my-3 font-bold leading-7 text-gray-900 sm:text-xl sm:truncate ">
            Bản đồ thống kê
          </h1>
          <Map points={data.totalHousesByDistrict} isHouseCount />
          <div className="flex flex-row justify-center">
            <p className="font-bold mx-5">{"Chú thích: "} </p>
            <p>
              <span className="text-red-500">
                Đỏ: {">= 200 bất động sản, "}
              </span>
            </p>
            <p className="mx-5">
              <span className="text-yellow-500">
                Cam: {">= 100 bất động sản, "}
              </span>
            </p>
            <p className="mx-5">
              <span className="text-yellow-300">
                Vàng: {">= 50 bất động sản, "}
              </span>
            </p>
            <p className="mx-5">
              <span className="text-green-500">
                Xanh: {"< 50 bất động sản"}
              </span>
            </p>
          </div>
          <h1 className="text-xl my-3 font-bold leading-7 text-gray-900 sm:text-xl sm:truncate ">
            Biểu đồ thống kê
          </h1>
          <PieChart chartData={chartData} />
          <h1 className="text-xl my-3 font-bold leading-7 text-gray-900 sm:text-xl sm:truncate ">
            Danh sách thống kê
          </h1>
          <TableView
            rows={["Tên Quận", "Số Lượng Bất Động Sản Đang Rao Bán"]}
            data={data.totalHousesByDistrict}
          />
        </div>
      </SideBar>
    </div>
  );
};

export default DistrictList;
