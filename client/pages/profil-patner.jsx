//package&&stateG
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { API } from "../config/api";

//component
import Button from "../components/Atoms/button";
import Navbar from "../components/Navbar/navbar";
import rupiah from "rupiah-format";
import Layout from "../components/layout";
import moment from "moment";

export default function profilePatner() {
  //state
  const router = useRouter();
  const [profil, setProfil] = useState("");
  const [dataT, setDataT] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    router.push("/edit-profil-patner");
  };


  useEffect(() => {
    const getData = async (e) => {
      try {
        const res = await API.get("/get-user", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        });
        setProfil(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

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
      <Layout title="Profil-Patner">
        <Navbar />
        <div>
          <div className="grid md:grid-cols-2 mx-32 my-12 ">
            <div className="">
              <p className="font-extrabold text-3xl font-font_a mb-5">
                Profile Patner
              </p>
              <div className="flex gap-8">
                <img
                  className="w-44 object-center object-cover rounded-md h-56"
                  src={profil.image}
                  alt=""
                />
                <div>
                  <div>
                    <p className="font-extrabold text-fontPrimary text-lg">
                      Name Patner
                    </p>
                    <p className="font-normal text-lg">{profil.name}</p>
                  </div>
                  <div>
                    <p className=" text-fontPrimary font-extrabold text-lg">
                      Email
                    </p>
                    <p className="font-normal text-lg">{profil.email}</p>
                  </div>
                  <p className="font-extrabold text-fontPrimary text-lg">
                    Phone
                  </p>
                  <p className="font-normal text-lg">{profil.phone}</p>
                </div>
              </div>
              <Button
                onClick={handleClick}
                style="w-44  py-2 mt-4 bg-fontPrimary hover:bg-fontPrimary/90"
              >
                Edit Profile
              </Button>
            </div>
            <div>
              <p className=" ml-40 font-extrabold text-4xl font-font_a mb-5">
                History Order
              </p>
              <div className="overflow-y-auto scrollbar-hide h-[17rem]">
                {dataT?.map((item, index) => (
                  <div key={index} className="mb-2 grid justify-end">
                    <div className="grid grid-cols-2   w-96 bg-white rounded-md p-2">
                      <div className="">
                        <p className="font-font_a font-extrabold text-lg">
                          {item.cart?.order[0].product?.user?.name}
                        </p>
                        <div className="flex">
                          <p className="text-sm font-bold">
                            {moment(item.created_at).format("dddd")}
                          </p>
                          <p>
                            , {moment(item.created_at).format("MMM Do YY ")}
                          </p>
                        </div>
                        <p className="font-fontred">
                          {rupiah.convert(item.total)}
                        </p>
                      </div>
                      <div className="grid justify-end">
                        <img
                          src="https://res.cloudinary.com/fnxr/image/upload/v1665626340/Group_16_cb27e3.svg"
                          alt=""
                        />
                        <p
                          className={
                            item.status == "success"
                              ? "bg-green-300/40 text-center rounded font-medium text-xs"
                              : "bg-yellow-300/40 text-center rounded font-medium text-xs"
                          }
                        >
                          {item.status}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
