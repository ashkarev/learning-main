import { Card } from 'flowbite-react'
import course from '../assets/course.jpg'
import { Link } from 'react-router-dom'
import web from "../assets/web.jpg";
import ui from "../assets/ui.jpg";
import ml from "../assets/ml.jpg";



const CourseCard = () => {
    return (
        <>
            <div>
                <div className='text-center mb-10'>
                    <h1 className='text-3xl md:text-4xl text-blue-500 font-bold'>Popular Courses</h1>
                    <p className='text-lg md:text-2xl text-gray-400 mt-2'>Explore our most popular courses chosen by thousands of students</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10 mx-4 sm:mx-8 lg:mx-20'>
                    <div>
                        <Card
                            className="max-w-sm h-full bg-white dark:bg-white dark:border-gray-200 hover:scale-105 transition duration-200"
                            imgAlt="Web Development Bootcamp"
                            imgSrc={web}
                        >
                            <h5 className="text-2xl font-bold tracking-tight">
                                Web Development Bootcamp
                            </h5>
                            <p className="font-normal text-gray-500">
                                Master HTML, CSS, JavaScript, and React to build modern web applications from scratch.
                            </p>
                        </Card>
                    </div>
                    <div>
                        <Card
                            className="max-w-sm h-full bg-white dark:bg-white dark:border-gray-200 hover:scale-105 transition duration-200"
                            imgAlt="Data Science & Machine Learning"
                            imgSrc={ml}
                        >
                            <h5 className="text-2xl font-bold tracking-tight">
                                Data Science & Machine Learning A-Z
                            </h5>
                            <p className="font-normal text-gray-500">
                                Advanced with PowerBI and all
                            </p>
                        </Card>
                    </div>
                    <div>
                        <Card
                            className="max-w-sm h-full bg-white dark:bg-white dark:border-gray-200 hover:scale-105 transition duration-200"
                            imgAlt="UI/UX Design Masterclass"
                            imgSrc={ui}
                        >
                            <h5 className="text-2xl font-bold tracking-tight">
                                UI/UX Design Masterclass
                            </h5>
                            <p className="font-normal text-gray-500">
                                Explore the various design skills
                            </p>
                        </Card>
                    </div>
                </div>


                <div className='flex justify-center'>

                    <Link to={'/course'}>
                        <button className="px-6 py-3 rounded-lg bg-blue-800 text-white hover:bg-blue-600 transition-colors shadow-lg font-medium">
                            View More Courses
                        </button>
                    </Link>

                </div>


            </div>




        </>
    )
}

export default CourseCard
