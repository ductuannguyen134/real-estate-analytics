import Link from "next/link";
import { useRouter } from "next/router";

const navigation = [
  { name: "Phân tích số lượng", path: "/cities", mode: "house-count" },
  { name: "Phân tích giá", path: "/cities", mode: "house-price" },
];

const NavBar = () => {
  const router = useRouter();
  return (
    <div className=" max-w-7xl mx-auto px-4 sm:px-6 ">
      <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
        <div className="flex justify-between lg:w-0 lg:flex-1 items-center">
          <Link href="/">
            <img
              className="h-8 w-auto sm:h-10 cursor-pointer"
              src="https://static.thenounproject.com/png/30626-200.png"
            />
          </Link>
          <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={{
                  pathname: item.path,
                  query: {
                    ...router.query,
                    mode: item.mode,
                  },
                }}
              >
                <a className="font-medium text-gray-500 hover:text-gray-900 ">
                  {item.name}
                </a>
              </Link>
            ))}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
