import React, { useContext } from "react";
import { userdatacontext } from "../context/userContext.jsx"; // ✅ Correct import

const Card = ({ image }) => {
  const { selectedImage, setSelectedImage } = useContext(userdatacontext);

  return (
    <div
      className={`w-[200px] h-[300px] bg-[#030326] border-2 border-blue-500 rounded-2xl 
                 overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-blue-950 
                 transition-all duration-300 hover:scale-105 
                 ${selectedImage === image ? 'border-4 border-white shadow-2xl shadow-blue-950' : ''}`}
      onClick={() =>{setSelectedImage(image)
        setBackendImages(null);
        setFrontendImages(null);
      }}
    >
      <img
        src={image}
        alt="card image"
        loading="lazy"
        className="w-full h-full object-cover rounded-2xl 
                   hover:border-4 hover:border-white transition-all duration-300"
      />
    </div>
  );
};

export default Card;

