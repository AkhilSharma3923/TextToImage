import React from 'react';
import { assets, testimonialsData } from '../assets/assets';
import { motion } from "framer-motion";


const Testimonials = () => {
  return (
    <motion.div 
    initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0 }}
    viewport={{once:true}}
    className='flex flex-col items-center justify-center my-20 py-12 px-6 sm:px-12 lg:px-20'>
      {/* Heading */}
      <h1 className='text-4xl font-semibold mb-3 text-center'>
        Customer Testimonials
      </h1>
      
      {/* Subheading */}
      <p className='text-gray-500 mb-10 text-center text-lg'>
        What Our Users Are Saying
      </p>

      {/* Testimonials Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl'>
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className='bg-white/10 backdrop-blur-lg p-6 sm:p-8 rounded-xl shadow-lg border border-gray-300 transition-all transform hover:scale-105 hover:shadow-xl'
          >
            <div className='flex flex-col items-center text-center'>
              {/* User Image */}
              <img
                src={testimonial.image}
                className='rounded-full w-16 h-16 object-cover mb-4 border-2 border-white'
                alt={testimonial.name}
              />
              
              {/* User Name */}
              <h2 className='text-xl font-medium'>{testimonial.name}</h2>
              
              {/* User Role */}
              <p className='text-sm text-gray-600 mb-4'>{testimonial.role}</p>

              {/* Star Rating */}
              <div className='flex mb-4'>
                {Array(testimonial.stars)
                  .fill()
                  .map((_, i) => (
                    <img
                      src={assets.rating_star}
                      key={i}
                      className='w-5 h-5'
                      alt='Rating star'
                    />
                  ))}
              </div>

              {/* Testimonial Text */}
              <p className='text-gray-600'>{testimonial.text}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;