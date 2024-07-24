import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import Actions from './Actions';

const PackageList = ({data,deleted,edit}) => {
 
const array = [1,2,3,4,5,6,7,8,9,10]

  return (
    <div className='relative w-full h-full'>
    <div className='w-full max-h-[90%] overflow-auto min-h-[90%] '>
      <table className="min-w-full  divide-y overflow-auto divide-gray-200">
        <thead className="bg-[#11aaf6]  text-center">
          <tr className='text-center'>
            <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
              Country
            </th>
            <th className="px-6 py-3 min-w-32 bg-[#11aaf6]  text-xs font-medium text-white uppercase tracking-wider">
              Heading
            </th>
            <th className="px-6 py-3 min-w-32 bg-[#11aaf6]  text-xs font-medium text-white uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
              Actions
            </th>
                     </tr>
        </thead>
        <tbody className="bg-white divide-y text-center divide-gray-200">
          {array.map((pkg) => (
            <tr key={pkg.id}>
              {/* <td className="px-6 py-4 whitespace-nowrap">{pkg.country}</td>
              <td className="px-6 py-4 whitespace-nowrap">{pkg.heading}</td>
              <td className="px-6 py-4 whitespace-nowrap">{pkg.description}</td>
              <td className="px-6 py-4 whitespace-nowrap">{pkg.price}</td> */}
              <td className="px-6 py-1 whitespace-nowrap">1</td>
              <td className="px-6 py-1 whitespace-nowrap">bbbbbbbbb</td>
              <td className="px-6 py-1 whitespace-nowrap">bbbbbbbbbbbbbbbbbb</td>
              <td className="px-6 py-1 whitespace-nowrap">mmmmmmmmmmmmm</td>
               <td className="px-6 flex justify-center items-center py-1 whitespace-nowrap">
                <Actions
                  onEdit={() => edit(pkg.id)}
                  onDelete={() => deleted(pkg.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  
     </div>
  );
};

export default PackageList;
