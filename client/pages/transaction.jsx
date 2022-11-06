//package&&stateG
import { useEffect, useState } from "react";
import { API } from "../config/api";

//component
import Layout from "../components/layout";
import Navbar from "../components/Navbar/navbar";
import moment from "moment";

export default function Transaction() {
  //state
  const [dataT, setDataT] = useState([]);

  useEffect(() => {
    const getTransaction = async (e) => {
      try {
        const respon = await API.get("/incomes");
        setDataT(respon.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTransaction();
  }, []);

  return (
    <>
      <Layout title="Transaction">
        <Navbar />
        <div className="my-20 mx-24">
          <p className="text-4xl mb-8 font-bold ">Income Transaction</p>
          <div>
            <table className="border-collapse border table-auto rounded border-slate-500 bg-white">
              <thead>
                <tr>
                  <th className="border w-20 border-gray-400 bg-neutral-200">
                    NO
                  </th>
                  <th className="border w-60 border-gray-400 bg-neutral-200">
                    Name
                  </th>
                  <th className="border w-60 border-gray-400 bg-neutral-200">
                    Address
                  </th>
                  <th className="border w-60 border-gray-400 bg-neutral-200">
                    Total
                  </th>
                  <th className="border w-60 border-gray-400 bg-neutral-200">
                    Status
                  </th>
                  <th className="border w-60 border-gray-400 bg-neutral-200">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataT?.map((item, index) => (
                  <tr key={item.id} className="text-center">
                    <td className="pl-2 bg-white border border-gray-400">
                      {index + 1}
                    </td>
                    <td className="pl-2 bg-white border border-gray-400">
                      {item?.buyer?.name}
                    </td>
                    <td className="pl-2 bg-white border border-gray-400">
                      {item?.buyer?.location}
                    </td>
                    <td className="pl-2 bg-white border border-gray-400">
                      {item?.cart?.total}
                    </td>
                    <td className="pl-2 bg-white border border-gray-400">
                      {item?.cart?.status}
                    </td>
                    <td className="pl-2 bg-white border  border-gray-400">
                      {moment(item.created_at).format("dddd ,MMM Do YY ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
}
