import React from "react";

const Hero = () => {
  return (
    <section className="container mx-auto px-18 pt-50 pb-15 flex flex-col md:flex-row items-center">
      {/* Ліва частина - текст */}
      <div className="md:w-1/2 text-center md:text-left">
      <h1 className="text-4xl font-bold font-inter mb-4">   
          Планування подорожей за лічені хвилини
        </h1>
        <p className="text-gray-600 text-base mb-6">
          Відповідай на кілька запитань, і наш ШІ підбере для тебе ідеальний маршрут.
        </p>
        <button className="btn text-white rounded-full px-6 font-montserrat"
          style={{ backgroundColor: "#205CDE" }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#1A4CAF"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#205CDE"}
          onClick={scrollToForm}>
          Почати зараз
        </button>
      </div>

      {/* Права частина - Placeholder */}
      <div className="md:w-1/2 w-full flex justify-end mt-10 md:mt-0">
        <div className="w-[440px] h-[420px] bg-gray-300 rounded-lg shadow-lg flex items-center justify-center">
        </div>
      </div>
    </section>
  );
};

const scrollToForm = () => {
    const formElement = document.getElementById("question-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  

export default Hero;
