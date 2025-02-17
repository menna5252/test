import React from "react";
import Slider from "react-slick";
import fixed_1 from "../../assets/fixed-1.jpeg";
import fixed_2 from "../../assets/fixed-2.png";
import slider_1 from "../../assets/slider-1.jpeg";
import slider_2 from "../../assets/slider-2.jpeg";
import { useEffect } from "react";
import { useState } from "react";

export default function MainSlider() {
    const [counter, setCounter] = useState(0);
    const settings={
      arrows:false,
      infinite:true,
      speed:500,
      slidesToShow:1,
      slidesToScroll:1,
      autoplay:true,
       
    }
    useEffect(() => {
    
      return () => {
      }
    }, []);
    
  return (<>
   <div className="grid grid-cols-12 mb-8">
    <div className="col-span-12 sm:col-span-8">
       <Slider {...settings}  dots={true} >
        <img className="h-[300px] object-cover"  src={slider_1} alt="" />
        <img className="h-[300px] object-cover"  src={slider_2} alt="" />
       </Slider>
    </div>
    <div className="col-span-12 sm:col-span-4">
      <img className="h-[150px] w-full object-cover" src={fixed_1} alt="" />
      <img className="h-[150px] w-full object-cover" src={fixed_2} alt="" />
    </div>
   </div>
  </>)
}
