import React from "react";
import Slider from "react-slick";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  async function getCategories(){
   let{data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    setCategories(data.data);
  }

  useEffect(()=>{
    getCategories();
  },[])
  const settings={
   
    arrows:false,
    infinite:true,
    speed:300,
    slidesToShow:7,
    slidesToScroll:1,
    autoplay:true,
   
    responsive:[
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        }
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        }
      },
    ]
  };
  return(<>
  <Slider {...settings} dots={true}>
   {
    categories.map((c)=> <div key={c._id}>
      <img className="w-full h-40 object-cover" src={c.image} alt="" />
      <h2 className="font-normal text-lg">{c.name}</h2>
    </div>)}
  </Slider>
  </>)
}
