//package/stateG
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { API } from "../config/api";

//component
import Button from "../components/Atoms/button";
import Input from "../components/Atoms/input";
import Layout from "../components/layout";
import Navbar from "../components/Navbar/navbar";
import swal from 'sweetalert';
export default function editProfilPatner() {
  //state
  const router = useRouter();
  const [patner, setPatner] = useState("");
  const [preImage, setpreImage] = useState(null);
  const [data,setData]=useState([])

  const handleChange = (e) => {
    e.preventDefault();
    setPatner({
      ...patner,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.type === "file") setpreImage(e.target.files[0].name);
  };

  useEffect(()=>{
    const getData= async(e)=>{
      try {
        const res = await API.get("/get-user",{
          headers : {
            Authorization:`Bearer ${localStorage.token}`
          }
        });
        setPatner(res.data.data)
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  },[setData])

  const handleSubmit=useMutation(async(e)=>{
    try {
      e.preventDefault()
      const formData = new FormData();
      formData.set("name", patner.name);
      formData.set("email", patner.email);
      formData.set("phone", patner.phone);
      formData.set("location", patner.location);
      formData.set("imagename", patner.image);
      if(preImage){
        formData.set("image",patner?.image[0],patner?.image[0]?.name)
      }
      await API.patch("/user",formData) 
      swal(`Edit Profil success  `);
      router.push("profil-patner")
    } catch (error) {
      console.log(error);
    }
  })

  return (
    <>
      <Layout title="Edit-Profil-Patner">
        <Navbar />
        <div>
          <div className="my-12 mx-16">
            <p className="font-extrabold text-4xl font-font_a">
              Edit Profile Patner
            </p>

            <form
              onSubmit={(e) => handleSubmit.mutate(e)}
              className="grid md:grid-cols-12 gap-2"
            >
              <div className="grid col-span-8">
                <Input
                  name="name"
                  onChange={handleChange}
                  type="text"
                  placeholder="Full Name"
                  defaultValue={patner.name}
                />
              </div>
              <div className="grid col-span-4">
                <label
                  className="bg-fontPrimary h-10 hover:bg-fontPrimary/90 text-white w-full pt-2 text-center text-xs font-bold transition duration-300 rounded"
                  htmlFor="imageProfil"
                >
                  <div className="text-white">
                    {preImage ? preImage : "Attach Image"}
                  </div>
                </label>
                <Input
                  id="imageProfil"
                  hidden
                  onChange={handleChange}
                  type="file"
                  name="image"
                />
              </div>
              <div className="grid col-span-12">
                <Input
                  name="email"
                  type="email"
                  defaultValue={patner.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <div className="grid col-span-12">
                <Input
                  name="phone"
                  type="number"
                  onChange={handleChange}
                  placeholder="Phone"
                  defaultValue={patner.phone}
                />
              </div>
              <div className="grid col-span-8">
                <Input
                  name="location"
                  type="text"
                  placeholder="Location"
                  defaultValue={patner.location}
                  onChange={handleChange}
                />
              </div>
              <div className="grid col-span-4">
                <Button style="h-10 flex justify-center items-center gap-2 py-2 px-10 bg-fontPrimary hover:bg-fontPrimary/90">
                  select on map{" "}
                  

                  <img
                    src="https://res.cloudinary.com/fnxr/image/upload/v1665602704/map_1_gt40ww.svg"
                    alt=""
                    />
                    
                </Button>
              </div>
              <div className="grid col-span-8"></div>
              <div className="grid col-span-4">
                <Button style="h-8 bg-fontPrimary hover:bg-fontPrimary/80">
                  oke
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
