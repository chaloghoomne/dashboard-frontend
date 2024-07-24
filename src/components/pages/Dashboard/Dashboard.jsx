import React, { useEffect, useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchDataFromAPI } from '../../../Api/fetchData';
import { BASE_URL, NetworkConfig } from './../../../Api/urls';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState();
  const [post, setPost] = useState({});
  const [news, setNews] = useState();
  const [events, setEvents] = useState();
  const [companies, setCompanies] = useState();
  const [schemes, setSchemes] = useState();
  const [ads, setAds] = useState();
  const [premiumusers, setPremiumusers] = useState([]);
  const [validPremiumUsers, setValidPremiumUsers] = useState([]);
  const [users, setUsers] = useState();
  const [companyLabels, setCompanyLabels] = useState([]);
  const [companyDatasets, setCompanyDataSets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}${NetworkConfig.DASHBOARD}`,
        );
        console.log(response);
        setDashboardData(response.data);
        setUsers(response.data.user);
        setSchemes(response.data.schemes);
        setPost(response.data.post);
        setNews(response.data.news);
        setEvents(response.data.events);
        setCompanies(response.data.companies);
        setAds(response.data.ads);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (companies) {
      const company = companies.map((item) => item.sector_id);
      const datasets = [{
        label: 'Companies',
        data: companies.map((item) => item._count.created_at),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#32a836', '#fcba03', '#039dfc'],
      }];
      setCompanyLabels(company);
      setCompanyDataSets(datasets);
    }
  }, [companies]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}/order-history`,
        );
        console.log(response);
        setPremiumusers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const validUsers = premiumusers.filter(user => user && user.first_name && user.created_at);
    setValidPremiumUsers(validUsers);
  }, [premiumusers]);

  const adsImage = ads?.map((item) => item.image);
  const newsImage = news?.map((item) => item.image);

  return (
    <div className="p-6 bg-gray-100 max-h-full overflow-y-auto min-h-[90%]">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {post?.labels?.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Post</h2>
            </div>
            <Line data={post} />
          </div>
        )}

        {users?.labels?.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">User</h2>
            </div>
            <Bar data={users} />
          </div>
        )}

        {events?.labels?.length > 0 && (
          <div className="bg-white p-4 h-auto rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">All Events</h2>
            </div>
            <div className='pt-5'><Line data={events} /></div>
          </div>
        )}

        {companyLabels.length > 0 && companyDatasets.length > 0 && (
          <div className="bg-white  relative p-4 rounded-lg shadow-md chart-container">
             <div className="flex absolute top-3  justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Sectors</h2>
            </div>
            <div className="legend-container">
              <ul className="chart-legend">
                {companyLabels.map((label, index) => (
                  <li key={index} className='text-xs'>
                    <span
                      className="color-box text-xs"
                      style={{ backgroundColor: companyDatasets[0].backgroundColor[index] }}
                    ></span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="chart-wrapper canvas-container">
              <Pie 
                data={{ labels: companyLabels, datasets: companyDatasets }}
                options={{
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  maintainAspectRatio: false
                }}
                width={200}
                height={200}
              />
            </div>
          </div>
        )}

        {schemes?.labels?.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Schemes</h2>
            </div>
            <Line data={schemes} />
          </div>
        )}

        {validPremiumUsers.length > 0 && (
          <div className="bg-white p-4 w-full rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Premiership</h2>
            </div>
            <div className='max-h-72 w-full overflow-y-auto overflow-clip'>
              <table className="bg-white w-full">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">User Name</th>
                    <th className="py-2 px-4 border-b">Date</th>
                  </tr>
                </thead>
                <tbody className='text-center'>
                  {validPremiumUsers.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{item.first_name}</td>
                      <td className="py-2 px-4 border-b">{item.created_at.slice(0, 10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {newsImage && newsImage.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">News</h2>
            <div className="grid grid-cols-4 gap-4">
              {newsImage.slice(0, 4).map((image, index) => (
                <div key={index} className="h-24 bg-gray-200 rounded">
                  <img className='h-24' src={image} alt="" />
                </div>
              ))}
            </div>
          </div>
        )}

        {adsImage && adsImage.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Ads</h2>
            <div className="flex flex-wrap gap-4">
              {adsImage.slice(0, 4).map((image, index) => (
                <div key={index} className="h-24 bg-gray-200 rounded">
                  <img className='h-24' src={image} alt="" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
