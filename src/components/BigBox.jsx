import React, { useState, useEffect } from "react";
import axios from "axios";

const BigBox = () => {
  const [event, setEvent] = useState({});

  //We will be one from 10 randomly to display in the first box
  const fetchRandom = async () => {
    const randomInt = Math.floor(Math.random() * 10) + 1;
    await axios
      .get(
        `https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats/${randomInt}`
      )
      .then((data) => {
        setEvent(data.data);
      });
  };
  //this will load once
  useEffect(() => {
    fetchRandom();
  }, []);

  return (
    <div className="hidden w-[95vw] min-h-[50vh] bg-[#e0d9ce] mx-8 p-2 md:flex flex-col justify-center items-center gap-y-5 rounded-md pb-3">
      <img
        src={event.image}
        alt="cover"
        className="object-cover aspect-[16/3] w-[98%] h-3/4 bg-slate-200 rounded-md"
      />

      <div className="w-[98%] h-1/4 flex flex-col gap-y-3">
        <p className="font-semibold text-xl">{event.title}</p>
        <p>{event.description}</p>
      </div>
    </div>
  );
};

export default BigBox;
