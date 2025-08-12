import React from 'react';
import { assets } from '../assets/assets';
import { motion } from "framer-motion";


const Description = () => {
  return (
    <motion.div
    initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0 }}
    viewport={{once:true}}
    className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
      {/* Heading */}
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2 text-center'>
        Create AI Images
      </h1>
      
      {/* Subheading */}
      <p className='text-gray-500 mb-8 text-center text-lg'>
        Turn your imagination into visuals
      </p>

      {/* Content Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
        {/* Image */}
        <div className='flex justify-center'>
          <img
            src={assets.sample_img_1}
            className='w-80 xl:w-96 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105'
            alt="Sample AI-generated image"
          />
        </div>

        {/* Text Content */}
        <div className='max-w-lg space-y-4'>
          <h2 className='text-3xl font-medium'>
            Introducing the AI-Powered Text to Image Generator
          </h2>
          <p className='text-gray-600'>
            Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks.
          </p>
          <p className='text-gray-600'>
            Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even concepts that don’t yet exist can be visualized effortlessly.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
