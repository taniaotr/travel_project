import React from "react";
import mainPhoto from "../assets/mainph.avif";

const Hero = (props) => {
  const {onStart} = props;
  return (
    <section className="container mx-auto px-18 pt-20 pb-15 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 text-center md:text-left">
      <h1 className="text-4xl font-bold font-inter mb-4">   
          Планування подорожей за лічені хвилини
        </h1>
        <p className="text-gray-600 text-base mb-6">
          Відповідай на кілька запитань, і наш ШІ підбере для тебе ідеальний маршрут.
        </p>
        <button className="btn text-white rounded-full px-6 font-montserrat"
          style={{ backgroundColor: "#205CDE" }}
          onClick={onStart}>
          Почати зараз
        </button>
      </div>

      <div className="md:w-1/2 w-full flex justify-end mt-10 md:mt-0">
      <div className="w-[440px] h-[420px] rounded-lg shadow-lg overflow-hidden">
        <img
          src={mainPhoto}
          alt="Travel Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
    </section>
  );
};
  
export default Hero;
