import React from "react";
import cor1 from '../assets/cor21.jpg'
import cor2 from '../assets/hero_carousel_2.png'
import cor3 from '../assets/hero_carousel_3.png'
import cor4 from '../assets/cor3.jpg'
import { Carousel } from "flowbite-react";
import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <>
      <div className="my-10 pt-20 grid grid-cols-1 md:grid-cols-2 gap-8 bg-sky-50 px-6 sm:px-12">

        <div className="my-10 md:my-48 flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Learn Anytime, <span className="text-blue-500">Anywhere</span>
          </h1>
          <p className="my-6 md:my-10 text-lg md:text-xl text-gray-500">
            Unlock your potential with thousands of courses from expert <br className="hidden md:block" />
            instructors. Start your learning journey today.
          </p>

          <div className="flex gap-4">
            {/* <Link to={'/login'}>
           
          </Link> */}

            <Link to={'/course'} >
              <button className="px-6 py-3 rounded-md bg-blue-800 text-white hover:bg-blue-600 transition-colors shadow-lg">
                View Courses
              </button>
            </Link>
          </div>
        </div>


        <div className="my-10 md:my-20">
          <div className="hero-carousel-container w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Carousel slide indicators className="h-full">
              <img
                src={cor1}
                alt="Students collaborating in modern learning space"
                className="w-full h-full object-cover"
              />
              <img
                src={cor2}
                alt="Student coding on laptop"
                className="w-full h-full object-cover"
              />
              <img
                src={cor3}
                alt="Online learning session"
                className="w-full h-full object-cover"
              />
              <img
                src={cor4}
                alt="Graduation and achievement"
                className="w-full h-full object-cover"
              />
            </Carousel>
          </div>
        </div>




      </div>
    </>
  );
};

export default Hero;
