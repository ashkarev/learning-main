import React, { useState, useEffect, useCallback } from "react";
import cor1 from '../assets/cor21.jpg'
import cor2 from '../assets/hero_carousel_2.png'
import cor3 from '../assets/hero_carousel_3.png'
import cor4 from '../assets/cor3.jpg'
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Hero = () => {
  const images = [
    { src: cor1, alt: "Students collaborating" },
    { src: cor2, alt: "Student coding" },
    { src: cor3, alt: "Online learning" },
    { src: cor4, alt: "Graduation" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [nextSlide, isPaused]);

  return (
    <div className="my-10 pt-24 grid grid-cols-1 md:grid-cols-2 gap-8 bg-sky-50 px-6 sm:px-12 pb-12 sm:pb-20">
      {/* Left Content */}
      <div className="my-8 md:my-48 flex flex-col justify-center">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Learn Anytime, <span className="text-blue-500">Anywhere</span>
        </h1>
        <p className="my-6 md:my-10 text-lg md:text-xl text-gray-500">
          Unlock your potential with thousands of courses from expert <br className="hidden md:block" />
          instructors. Start your learning journey today.
        </p>

        <div className="flex gap-4">
          <Link to={'/courses'}>
            <button className="px-6 py-3 rounded-md bg-blue-800 text-white hover:bg-blue-600 transition-colors shadow-lg">
              View Courses
            </button>
          </Link>
        </div>
      </div>

      {/* Right Carousel */}
      <div className="my-6 md:my-20 flex items-center justify-center">
        <div
          className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] rounded-3xl overflow-hidden shadow-2xl bg-white"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Slides */}
          <div className="relative w-full h-full">
            {images.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 backdrop-blur-md hover:bg-white/50 text-gray-800 transition shadow-sm z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 backdrop-blur-md hover:bg-white/50 text-gray-800 transition shadow-sm z-10"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white scale-125" : "bg-white/50"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
