import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";

function CarrouselImg({ one }) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 400,
    autoplaySpeed: 4000,
    cssEase: "linear",
  }

  const sliderStyle = {
    width: "100%",
    height: "100%",
    maxHeight: "500px", // adjust as needed
    maxWidth: "100%", // adjust as needed
    overflow: "hidden",
  };

  const imgStyle = {
    width: "100%",
    height: "auto",
  };

  return (
    <div style={sliderStyle}>
      <Slider {...settings}>
        {one.imgUrl.map((url, index) => (
          <div key={index}>
            <img src={url} alt={one.productName} style={imgStyle} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CarrouselImg;
