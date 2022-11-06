//package/stateG
import { useRouter } from "next/router";
import { API } from "../config/api";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
//component
import Button from "../components/Atoms/button";
import Input from "../components/Atoms/input";
import Layout from "../components/layout";
import Navbar from "../components/Navbar/navbar";
import swal from 'sweetalert';


export default function EditProfil() {
  const router = useRouter();

  const [preview, setPreview] = useState(null);
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState("");


  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      setPreview(e.target.files[0].name);
    }
  };


  useEffect(() => {
    const getData = async (e) => {
      try {
        const res = await API.get("/get-user", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        });

        setProfile({
          name: res.data.data.name,
          email: res.data.data.email,
          phone: res.data.data.phone,
          image: res.data.data.image,
          location: res.data.data.location,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [data]);

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();

      formData.set("name", profile.name);
      formData.set("email", profile.email);
      formData.set("phone", profile.phone);
      formData.set("location", profile.location);
      formData.set("imagename", profile.image);
      if (preview) {
        formData.set("image", profile?.image[0], profile?.image[0]?.name);
      }
     await API.patch("/user", formData);
     
      swal(`Edit Profil success  `);
      router.push("/profil");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Layout title="Edit-Profil">
        <Navbar />
        <div>
          <div className="my-12 mx-16">
            <p className="font-extrabold text-4xl font-font_a">Edit Profile</p>

            <form
              onSubmit={(e) => handleSubmit.mutate(e)}
              className="grid md:grid-cols-12 gap-2"
            >
              <div className="grid col-span-8">
                <Input
                  name="name"
                  onChange={handleChange}
                  type="text"
                  defaultValue={profile.name}
                  placeholder="Full Name"
                />
              </div>
              <div className="grid col-span-4">
                <label
                  className="bg-fontPrimary h-10 hover:bg-fontPrimary/90 text-white w-full pt-2 text-center text-xs font-bold transition duration-300 rounded"
                  htmlFor="imageProfil"
                >
                  <div className="text-white">
                    {preview ? preview : "Attach Image"}
                  </div>
                </label>
                <Input
                  name="image"
                  hidden
                  onChange={handleChange}
                  // value=
                  id="imageProfil"
                  type="file"
                />
              </div>
              <div className="grid col-span-12">
                <Input
                  name="email"
                  type="email"
                  defaultValue={profile.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <div className="grid col-span-12">
                <Input
                  name="phone"
                  type="number"
                  defaultValue={profile.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                />
              </div>
              <div className="grid col-span-8">
                <Input
                  name="location"
                  type="text"
                  defaultValue={profile.location}
                  placeholder="Location"
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
                <Button
                  type="onsubmit"
                  style="h-8 bg-fontPrimary hover:bg-fontPrimary/80"
                >
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
