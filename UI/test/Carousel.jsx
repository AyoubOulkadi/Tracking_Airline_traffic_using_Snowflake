import { useState } from "react";

export default function Carousel({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const previousImage = () => {
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setActiveIndex((activeIndex + 1) % images.length);
  };

  return (
    <div className="relative">
      <div className="absolute top-0 bottom-0 left-0 right-0">
        <img
          src={images[(activeIndex - 1 + images.length) % images.length]}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-0 bottom-0 left-0 right-0">
        <img src={images[activeIndex]} className="w-full h-full object-cover" />
      </div>
      <div className="absolute top-0 bottom-0 left-0 right-0">
        <img
          src={images[(activeIndex + 1) % images.length]}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
        <button
          onClick={previousImage}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-l"
        >
          Previous
        </button>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
        <button
          onClick={nextImage}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-r"
        >
          Next
        </button>
      </div>
    </div>
  );
}
