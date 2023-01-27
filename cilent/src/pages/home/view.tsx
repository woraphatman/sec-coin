import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";

const Data = () => {
  const [data, setData] = useState([]);
  const { current: myArray } = useRef(["one", "two", "three"]);
  const token = localStorage.getItem("Token") as string;
  const lists = async () => {
    const data: any = await axios.get(`http://localhost:4000/users`,{
      headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
     }});
    setData(data.data.message);
  };

  const update = (id: any, value: any) => {
    console.log(id, value);
    axios
      .put(`http://localhost:4000/coin/${id}`,{
        headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
       },
        amount:value,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err: any) => {
            
        console.log(err);
      });
  };

  const changeText = (e: any, index: any) => {
    console.log(e.target.value, index);
    let RawData: any = data;
    RawData[index].coin.totalcoin = e.target.value;
  };


  useEffect(() => {
    lists();
  }, [myArray]);

  return (
    <ul className="bg-slate-50 p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 text-sm leading-6">
      {data?.map((item: any, index: any) => (
        <li className="flex" key={index}>
          <div className="hover:border-purple-500 hover:border-solid hover:bg-rose-700 hover:text-blue-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-sm leading-6 text-slate-900 font-medium py-3">
            {item.username}
            <input
              type="text"
              className="px-3 py-3 flex justify-center "
              onChange={(e) => changeText(e, index)}
              defaultValue={item?.coin?.totalcoin}
            />
            <button
              onClick={() => {
                update(item?.coin?.coinid, item.coin.totalcoin);
              }}
              className="bg-blue-400 px-2 py-1 text-white mt-2 hover:bg-blue-800"
            >
              update
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Data;
