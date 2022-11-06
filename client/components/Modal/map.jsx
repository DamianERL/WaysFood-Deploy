import React from "react";

export default function Map() {
  return (
    <>
      <iframe
        width="100%"
        height="400px"
        id="gmap_canvas"
        src="https://maps.google.com/maps?q=Dumbways%20&t=&z=17&ie=UTF8&iwloc=&output=embed"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        title="myFrame"
      ></iframe>
    </>
  );
}
