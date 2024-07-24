import React from "react";

const Box = ({ imgUrl, title, desc, date, location, price }) => {
  const newDate=Date(date); 
  return (
    <div className="w-full md:w-[30vw] md:h-[45vh] bg-[#e0d9ce] p-4 border-2 rounded-md text-wrap overflow-auto">
      <img
        src={imgUrl}
        alt="i"
        className="object-cover aspect-video shadow-sm shadow-black md:aspect-square w-full md:w-1/2 h-1/4 md:h-3/6 rounded-md"
      />
      <div className="mt-3">
        <p className="mb-2 font-semibold">{title}</p>
        <p className="text-sm min-h-11">{desc}</p>
        <p className="text-sm">Date : {newDate.slice(0,15)}</p>
        <p className="text-sm">Location : {location}</p>
        <p className="text-sm">Price : ${price}</p>
      </div>
    </div>
  );
};

export default Box;
