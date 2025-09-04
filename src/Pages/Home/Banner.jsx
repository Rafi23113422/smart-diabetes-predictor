import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";
const Banner = () => {
  const navigate = useNavigate();

   const slides = [img1, img2, img3];


  const [current, setCurrent] = useState(0);

 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <img
        src={slides[current]}
        alt="Diabetes health background"
        className="absolute w-full h-full object-cover opacity-50 transition-all duration-1000"
      />

      <div className="absolute inset-0 bg-black/60"></div>

   
      <div className="relative z-10 text-center px-4">
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
          SmartDiabetes: Predict Your Risk with AI
        </h1>
        <p className="text-gray-200 text-lg md:text-xl mb-8">
          Choose your prediction type below
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6">
          <button
            onClick={() => navigate("/api/full_details_prediction")}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white text-lg rounded-xl shadow-md cursor-pointer"
          >
            Full Info Prediction
          </button>
          <button
            onClick={() => navigate("/api/simple_details_prediction")}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg rounded-xl shadow-md cursor-pointer"
          >
            Quick Prediction
          </button>
        </div>
      </div>

      {/* Manual Arrows */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
        <button
          onClick={() =>
            setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
          }
          className="text-white bg-black/50 px-3 py-2 rounded-full"
        >
          ❮
        </button>
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
          className="text-white bg-black/50 px-3 py-2 rounded-full"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Banner;
