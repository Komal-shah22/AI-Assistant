import React, { useRef, useContext } from 'react';
import Card from '../components/card.jsx';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/authBg.png';
import image4 from '../assets/image4.png';
import image5 from '../assets/image5.png';
import image6 from '../assets/image6.jpeg';
import image7 from '../assets/image7.jpeg';
import { LuImagePlus, LuArrowLeft } from "react-icons/lu";
import { userdatacontext } from '../context/userContext.jsx';
import { useNavigate } from 'react-router-dom';

function Customize() {
  const {
    frontendImages,
    setFrontendImages,
    backendImages,
    setBackendImages,
    selectedImage,
    setSelectedImage,
  } = useContext(userdatacontext);

  const navigate = useNavigate();
  const inputImage = useRef();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setBackendImages(file);
      setFrontendImages(URL.createObjectURL(file));
    } else {
      alert('Please upload a valid image file.');
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col items-center gap-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      
      {/* 🔙 Back Arrow */}
      <button
        onClick={() => navigate('/home')}   // change '/' if your home route is different
        className="absolute top-6 left-6 text-white hover:text-blue-400 transition-all duration-200 flex items-center gap-2"
      >
        <LuArrowLeft className="text-2xl" />
        <span className="text-lg font-semibold hidden sm:inline">Back</span>
      </button>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-white drop-shadow-lg">
        Select your <span className="text-blue-400 glow-text">Assistant Image</span>
      </h1>

      <div className="w-full max-w-[1300px] flex flex-wrap justify-center gap-6 sm:gap-8 mt-4">
        {[image1, image2, image3, image4, image5, image6, image7].map((img, i) => (
          <Card key={i} image={img} />
        ))}

        <div
          onClick={() => {
            inputImage.current.click();
            setSelectedImage('input');
          }}
          className={`w-[160px] sm:w-[180px] md:w-[200px] h-[240px] sm:h-[270px] md:h-[300px]
                     bg-[#030326] border-2 ${selectedImage === 'input' ? 'border-4 border-white' : 'border-blue-500'}
                     rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-blue-900
                     transition-all duration-300 flex flex-col justify-center items-center hover:scale-105`}
        >
          {!frontendImages ? (
            <>
              <LuImagePlus className="text-white w-[36px] h-[36px] sm:w-[40px] sm:h-[40px]" />
              <p className="text-white text-sm mt-2">Add Image</p>
            </>
          ) : (
            <img
              src={frontendImages}
              alt="Uploaded"
              className="w-full h-full object-cover rounded-2xl transition-all duration-300"
            />
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={inputImage}
          onChange={handleImageUpload}
          hidden
        />
      </div>

      {selectedImage && (
        <button
          className="w-full max-w-[300px] bg-white text-blue-700 py-3 rounded-full font-semibold 
                     hover:bg-blue-700 hover:text-white active:scale-95 cursor-pointer transition-all duration-200 mt-8"
          onClick={() => navigate('/customize_2')}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Customize;


