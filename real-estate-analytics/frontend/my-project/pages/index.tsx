import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

const navigation = [
  { name: "Phân tích số lượng", path: "/cities", mode: "house-count" },
  { name: "Phân tích giá", path: "/cities", mode: "house-price" },
];

export default function Example() {
  const router = useRouter();
  return (
    <div className="relative bg-white overflow-hidden">
      <Head>
        <title>Phân Tích BĐS Toàn Quốc</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
            <nav
              className="relative flex items-center justify-between sm:h-10 lg:justify-start"
              aria-label="Global"
            >
              <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <Link href="/">
                    <img
                      className="h-8 w-auto sm:h-10 cursor-pointer"
                      src="https://static.thenounproject.com/png/30626-200.png"
                    />
                  </Link>
                </div>
              </div>
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
                    <a className="font-medium text-gray-500 hover:text-gray-900">
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
            </nav>
          </div>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">
                  Phân tích giá bất động sản
                </span>{" "}
                <span className="block text-indigo-600 xl:inline">
                  toàn quốc
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Chúng tôi phân tích giá bất động sản dựa vào dữ liệu được thu
                thập từ các website mua bán bất động sản khác nhau, nhằm đưa ra
                giải pháp phân tích giá nhà đất tối ưu cho người dùng
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow cursor-pointer">
                  <Link
                    href={{
                      pathname: "/cities",
                      query: { mode: "house-count", ...router.query },
                    }}
                  >
                    <div className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                      <a>Bắt Đầu</a>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://cdn.vietnammoi.vn/171464242508312576/2021/2/11/20210109144613-1c68-1613010233245461537899.jpg"
          alt=""
        />
      </div>
    </div>
  );
}
