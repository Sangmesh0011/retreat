import { AiOutlineCopyrightCircle } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import axios, { all } from "axios";
import Box from "./Box";

const BottomBox = () => {
  const [type, setType] = useState("");
  const [date, setDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [pageno, setPageno] = useState(1);
  const [limit, setLimit] = useState(3);
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  //Here we fetch all events to know the full count for pagination help
  const fetchEvents = async () => {
    await axios
      .get(`https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats`)
      .then((data) => {
        const total = data.data.length;
        setTotalPages(Math.floor(total / limit));
      });
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  //Here we use string literals with api call to conditionally make api calls based on what data is given frpm the state vairables
  const fetchAllEvents = async () => {
    await axios
      .get(
        `https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?page=${pageno}&limit=${limit}${
          location === "" ? "" : `&location=${location}`
        }${type === "" ? "" : `&filter=${type}`}${
          search === "" ? "" : `&search=${search}`
        }`
      )
      .then((data) => {
        setEvents(data.data);
      });
  };

  //This updates the events based on the dependencies which can change through state varibles
  useEffect(() => {
    fetchAllEvents();
  }, [location, type, search, pageno]);

  //getting dates in seconds
  const date2022 = new Date(2022, 0);
  const time2022 = date2022.getTime() / 1000;

  const date2023 = new Date(2023, 0);
  const time2023 = date2023.getTime() / 1000;

  const date2024 = new Date(2024, 0);
  const time2024 = date2024.getTime() / 1000;

  //pagination logic
  const handleNext = () => {
    if (pageno < totalPages) setPageno((prev) => prev + 1);
    else setPageno(totalPages + 1);
  };
  const handlePrevious = () => {
    if (pageno > 1) setPageno((prev) => prev - 1);
    else setPageno(1);
  };

  return (
    <div className="w-[95vw] min-h-[50vh] mx-8 p-2 flex flex-col justify-start items-center gap-y-3 rounded-md pb-3">
      <div className="filters w-full flex md:flex-row flex-col justify-between py-5 md:p-5 rounded-xl md:gap-y-0 gap-y-4">
        <div className="left flex md:flex-row flex-col justify-center items-center gap-y-3 md:gap-x-3">
          <div className="filterbox w-full">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="px-3 py-3 text-gray-400 md:py-1 rounded-sm md:rounded-md md:bg-[#1b3252] md:w-fit md:text-white w-full bg-neutral-200"
            >
              <option value="">Filter by type</option>
              <option value="Yoga">Yoga</option>
              <option value="Meditation">Meditation</option>
              <option value="Detox">Detox</option>
            </select>
          </div>
          <div className="filterbox w-full">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-3 py-3 text-gray-400 md:py-1 rounded-sm md:rounded-md md:bg-[#1b3252] md:text-white w-full md:w-fit bg-neutral-200"
            >
              <option value="">Filter by place</option>
              <option value="pune">Pune</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
            </select>
          </div>
          <div className="filterbox w-full">
            <select
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-3 py-3 text-gray-400 md:py-1 rounded-sm md:rounded-md md:bg-[#1b3252] md:w-fit md:text-white w-full bg-neutral-200"
            >
              <option value="">Filter by dates</option>
              <option value={time2022}>2022</option>
              <option value={time2022}>2023</option>
              <option value={time2024}>2024</option>
            </select>
          </div>
        </div>
        <div className="right">
          <input
            type="text"
            placeholder="Search for retreats"
            className="px-3 py-3 md:py-1 md:bg-[#1b3252] border-2 rounded-sm w-full md:w-[30vw] md:rounded-md text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="boxes w-full flex md:flex-row flex-col justify-between items-center gap-y-3">
        {events.map((ev, i) => {
          return (
            <Box
              key={i}
              imgUrl={ev.image}
              title={ev.title}
              desc={ev.description}
              date={ev.date}
              location={ev.location}
              price={ev.price}
            />
          );
        })}
      </div>
      <div className="w-full flex justify-center items-center gap-x-4 mt-4">
        <button
          onClick={() => handlePrevious()}
          className="px-4 py-2 bg-[#1b3252] text-white rounded-xl md:rounded-md"
        >
          Previous
        </button>
        <button
          onClick={() => handleNext()}
          className="px-4 py-2 bg-[#1b3252] text-white rounded-xl md:rounded-md"
        >
          Next
        </button>
      </div>
      <div className="w-full flex justify-center items-center gap-x-4 text-sm mt-8">
        <span>
          <AiOutlineCopyrightCircle />
        </span>
        <span>Wellness Retreats. All rights reserved.</span>
      </div>
    </div>
  );
};

export default BottomBox;
