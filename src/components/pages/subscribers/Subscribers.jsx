import React, { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../../Api/fetchData";
import { BASE_URL } from "../../../Api/urls";
import { MdAttachEmail } from "react-icons/md";
import Pagination from "../Packages/components/Pagination";

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      {icon}
    </div>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
  </div>
);

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState();
  const [getTotalPage,setTotalPages] = useState(0);
    const [getCurrentPage,setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}subscriptions?page=${getCurrentPage}`
        );
        if (response) {
          setSubscribers(response.data);
          setTotalPages(response.totalPages)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfileImage();
  }, [getCurrentPage]);

  return (
    <div className="bg-gray-100 min-h-screen p-8 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Subscriber Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Subscribers"
          value={subscribers?.length}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          }
        />
        {/* <StatCard
          title="New This Month"
          value="5"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          }
        />
        <StatCard
          title="Unsubscribed"
          value="2"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"
              />
            </svg>
          }
        /> */}
      </div>

      <div className="bg-slate-300 rounded-lg shadow-md overflow-hidden">
        <h2 className="text-xl font-semibold p-6 bg-blue-500 border-b">
          Subscriber List
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-center ">
            <thead>
              <tr className="bg-blue-400 text-center">
                <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sno
                </th>
                <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y text-center divide-gray-200">
              {subscribers?.map((subscriber, index) => (
                <tr key={subscriber.id} className="text-center">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {subscriber.s_no}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subscriber.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subscriber.createdAt.slice(0, 10)}
                  </td>
                  <td className="px-6 flex justify-center py-4 whitespace-nowrap text-sm text-gray-500">
                    <a
                      href={`mailto:${subscriber.email}?subject=Your%20Subscription%20Status`}
                      title="Send Email"
                    >
                      <MdAttachEmail size={22} color="blue" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination currentPage={getCurrentPage} totalPages={getTotalPage} onPageChange={setCurrentPage}/>
    </div>
  );
};

export default Subscribers;
