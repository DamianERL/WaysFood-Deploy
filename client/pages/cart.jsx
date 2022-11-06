//package/stateG
import { useMutation } from "react-query";
import { API } from "../config/api";
import { useState } from "react";
import { useEffect } from "react";

//component
import Button from "../components/Atoms/button";
import Input from "../components/Atoms/input";
import Modal from "../components/Atoms/modal";
import Layout from "../components/layout";
import Map from "../components/Modal/map";
import Navbar from "../components/Navbar/navbar";
import Rupiah from "rupiah-format";

export default function Cart() {
  //state
  const [location, setLocation] = useState();
  const [map, setMap] = useState(false);
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (e) => {
    setLocation({
      ...location,
      [e.target.name]: e.target.value,
    });
  };

  //

  useEffect(() => {
    // if (isLoading)
    {
      const findPending = async (e) => {
        try {
          const res = await API.get("/cart-status");
          setData(res.data.data);

          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      };
      findPending();
    }
  }, []);

  //Component lifecycle

  const handleDelete = useMutation(async (id) => {
    try {
      await API.delete(`/order/${id}`);
      const res = await API.get("/cart-status");
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  });

  const increaseOrder = useMutation(async ({ id, qty, price }) => {
    const updateQty = qty + 1;
    const updateTotal = price * updateQty;

    const body = JSON.stringify({
      qty: updateQty,
      sub_amount: updateTotal,
    });
    await API.patch(`/order/${id}`, body);
    const res = await API.get("/cart-status");
    setData(res.data.data);
  });

  const decreaseOrder = useMutation(async ({ id, qty, sub_amount, price }) => {
    const updateQty = qty - 1;
    const updateTotal = sub_amount - price;
    const body = JSON.stringify({
      qty: updateQty,
      sub_amount: updateTotal,
    });
    await API.patch(`/order/${id}`, body);
    const res = await API.get("/cart-status");
    setData(res.data.data);
  });

  //Payment

  const totalqty = data?.order?.reduce((a, b) => {
    return a + b.qty;
  }, 0);

  const newtotal = data?.order?.reduce((a, b) => {
    return a + b.sub_amount;
  }, 0);

  const shiping = 10000;

  const totalPay = shiping + newtotal;

  const handleSubmit = useMutation(async (e) => {
    try {
      // e.preventDefault();
      const datatransaction = {
        seller_id: parseInt(data.order[0].product.user.id),
        total: totalPay,
      };

      const response = await API.post("/transaction", datatransaction);

      const token = response.data.data.token;

      const dataUpdate = {
        qty: totalqty,
        total: totalPay,
        status: "success",
      };

      await API.patch("cartID", dataUpdate);

      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log("success", result);
          history.push("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log("pending", result);
          history.push("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log("error", result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });

      //
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-aj9Q1utSyh4wGP4-";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <Layout title="Cart">
            <Navbar counter={totalqty} />
            {data?.order?.length != 0 ? (
              <div className=" mx-14 my-8">
                <p className="text-4xl flex gap-4 mb-4 items-center font-font_a font-extrabold">
                  <img
                    className="w-16 h-16 object-cover object-center cursor-pointer  rounded-full"
                    src={
                      data?.order ? data?.order[0]?.product?.user?.image : ""
                    }
                    alt=""
                  />
                  {data?.order ? data?.order[0]?.product?.user?.name : ""}
                </p>
                <p className="text-lg font-normal text-fontPrimary ">
                  Delivery Location
                </p>
                <div className="grid mt-6 md:grid-cols-5 gap-4">
                  <div className="col-span-4">
                    <Input
                      style=" text-base bg-white"
                      name="locations"
                      onChange={handleChange}
                    />
                  </div>
                  <div className=" col-span-1">
                    <Button
                      onClick={() => setMap(true)}
                      style=" h-10 flex justify-center items-center gap-2  bg-fontPrimary hover:bg-fontPrimary/90"
                    >
                      select on map
                      <img
                        src="https://res.cloudinary.com/fnxr/image/upload/v1665602704/map_1_gt40ww.svg"
                        alt=""
                      />
                    </Button>
                  </div>
                </div>
                <p className="m-2">Review Your order</p>

                <div className="grid md:grid-cols-3 gap-2">
                  <div
                    className=" col-span-2 p-2
              border-t-2 border-b-2 border-fontPrimary
              "
                  >
                    <div className="overflow-y-auto scrollbar-hide h-[15rem] ">
                      {data.order.map((item) => (
                        <div key={item.id} className="grid grid-cols-2 mb-6 ">
                          <div className=" flex">
                            <div className="w-[10rem] h-[6rem]  ">
                              <img
                                className="md:w-[8rem] rounded  object-cover object-center h-[6rem] "
                                src={item.product.image}
                                alt=""
                              />
                            </div>
                            {/* <div className="text-start cols-span-1"> */}
                            <div className="ml-4  w-80 h-24   ">
                              <p>{item.product.Name}</p>
                              <div className="flex mt-8 justify-center items-center ">
                                <button
                                  onClick={() =>
                                    decreaseOrder.mutate({
                                      id: item.id,
                                      qty: item.qty,
                                      price: item.product.price,
                                      sub_amount: item.sub_amount,
                                    })
                                  }
                                  className="md:mx-3 flex justify-center items-center md:text-xl active:bg-main/50 w-8 h-8 rounded"
                                >
                                  -
                                </button>
                                <p className="inline px-1 bg-main/50 rounded">
                                  {item.qty}
                                </p>
                                <button
                                  onClick={() =>
                                    increaseOrder.mutate({
                                      id: item.id,
                                      qty: item.qty,
                                      price: item.product.price,
                                    })
                                  }
                                  className="md:ml-3 flex justify-center items-center md:text-xl active:bg-main/50 w-8 h-8 rounded"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            {/* </div> */}
                          </div>
                          <div className="col-span-1  text-end">
                            <div className="flex flex-col items-end">
                              <p className="text-fontRedrp mb-6">
                                {Rupiah.convert(item?.product.price)}
                              </p>
                              <img
                                className=" w-8"
                                onClick={() => handleDelete.mutate(item.id)}
                                src="https://res.cloudinary.com/fnxr/image/upload/v1665676293/bin_1_lovaty.svg"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div
                      className=" w-full
              border-t-2 border-b-2 border-fontPrimary
              "
                    >
                      <div className="grid grid-cols-2 ">
                        <div className="">
                          <p className="mt-2">SubTotal</p>
                          <p className="my-2">QTY</p>
                          <p className="mt-2">Ongkir</p>
                        </div>
                        <div className="grid text-end">
                          <p className="text-fontRedrp mt-2">
                            {Rupiah.convert(newtotal)}
                          </p>
                          <p className="my-2">{totalqty}</p>
                          <p className="text-fontRedrp my-2">
                            {Rupiah.convert(shiping)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-extrabold my-2">Total</p>
                        </div>
                        <div className="grid text-end">
                          <p className="text-fontRedrp font-extrabold my-2">
                            {Rupiah.convert(totalPay)}
                          </p>
                        </div>
                      </div>
                      <div className=" md:ml-60 md:mt-20">
                        <Button
                          onClick={() => handleSubmit.mutate()}
                          style=" h-10 flex justify-center items-center w-40 bg-fontPrimary hover:bg-fontPrimary/90"
                        >
                          order
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className=" flex my-12 justify-center">
                <img
                  className="rounded-xl"
                  src="https://res.cloudinary.com/fnxr/image/upload/v1667146623/transaksi_elpynm.png"
                  alt=""
                />
              </div>
            )}
          </Layout>
          <Modal isVisible={map} onClose={() => setMap(false)}>
            <Map />
          </Modal>
        </>
      )}
    </>
  );
}
