import React from "react";
import Link from "next/link";

const SideBar = (props: any) => {
  return (
    <div className="flex flex-wrap bg-gray-100 w-full">
      <div className="w-3/12 bg-white rounded p-3 shadow-lg">
        <div className="flex items-center space-x-4 p-2 mb-5">
          <div>
            <h4 className="font-semibold text-lg text-gray-700 capitalize font-poppins tracking-wide">
              {props.cityName}
            </h4>
            <span className="text-sm tracking-wide flex items-center space-x-1">
              <span className="text-gray-600">Phân tích bất động sản</span>
            </span>
          </div>
        </div>
        <ul className="space-y-2 text-sm">
          <li>
            <Link
              href={{
                pathname: "/district/house-count",
                query: {
                  cityID: props.cityID,
                },
              }}
            >
              <a
                className={`flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 ${
                  props.mode === "count" ? "bg-gray-200" : ""
                } focus:shadow-outline`}
              >
                <span>Phân tích số lượng trong thành phố</span>
              </a>
            </Link>
          </li>
          <li>
            <Link
              href={{
                pathname: "/district/house-price",
                query: {
                  cityID: props.cityID,
                },
              }}
            >
              <a
                className={`flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 ${
                  props.mode === "price" ? "bg-gray-200" : ""
                } focus:shadow-outline`}
              >
                <span>Phân tích giá trong thành phố</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>

      <div className="w-9/12">
        <div className="p-4 text-gray-500">{props.children}</div>
      </div>
    </div>
  );
};

export default SideBar;
