import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

function Description() {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-10 p-6 md:px-28"
    >
      <h1 className="text-3xl sm:text-4xl text-center">Generate AI Images</h1>
      <p className="text-gray-500 mb-8 text-center">
        Bring Creative Vision to life
      </p>

      <div className="flex flex-col md:flex-row items-center gap-30 mb-3">
        {/* Image */}
        <img
          src={assets.sample_img_2}
          alt=""
          className="w-80 xl:w-100 rounded-lg shadow-md"
        />
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-medium max-w-lg mb-4">
            Introducing the AI Website — Your Ultimate Text-to-Image Generator
          </h2>
          <p className="text-gray-600 mb-2">
            Effortlessly bring your ideas to life with our free AI image
            generator.
            Effortlessly bring your ideas to life with our free AI image
            generator.
          </p>
          <p className="text-gray-600">
            Type a text prompt, and our advanced AI will generate high-quality
            images in seconds.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Description;
