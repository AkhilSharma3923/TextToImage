import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20'>
      {/* Logo */}
      <img src={assets.logo} width={150} alt="Logo" />

      {/* Copyright Text */}
      <p className='flex-1 border-l border-gray-400 pl-4 text-sm max-sm:hidden text-gray-500'>
        All rights reserved. Copyright @imagify
      </p>

      {/* Social Media Icons */}
      <div className='flex gap-2.5'>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src={assets.facebook_icon} width={35} alt="Facebook" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src={assets.twitter_icon} width={35} alt="Twitter" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src={assets.instagram_icon} width={35} alt="Instagram" />
        </a>
      </div>
    </div>
  );
};

export default Footer;