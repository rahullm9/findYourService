import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const reviews = [
  {
    id: 1,
    name: 'Michael B.',
    role: 'Lead Developer',
    comment: 'Incredibly well-designed and intuitive. The integration was a breeze, and the performance is outstanding. My team loves it.',
    rating: 5,
    initials: 'MB',
  },
  {
    id: 2,
    name: 'Emily C.',
    role: 'UX Designer',
    comment: "Aesthetically pleasing and functionally robust. It's clear that a lot of thought went into the user experience. A joy to work with.",
    rating: 5,
    initials: 'EC',
  },
  {
    id: 3,
    name: 'David R.',
    role: 'Startup Founder',
    comment: 'As a startup, we need tools that are both powerful and affordable. This product hits the sweet spot. It has been a game-changer for our growth.',
    rating: 5,
    initials: 'DR',
  },
];

const FeedbackSlider = () => {
  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut', delay } },
  });

  return (
    <section className="bg-white py-20 px-6 md:px-12 border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold tracking-wider uppercase mb-3"
            style={{ color: "#e85d04" }}
          >
            User Testimonials
          </motion.p>
          
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4"
          >
            What Our Customers Say
          </motion.h3>

          {/* Rating Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" style={{ color: "#f48c06" }} />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">
              4.9/5 stars based on over 1,200+ verified customer reviews
            </span>
          </motion.div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp(index * 0.15)}
              whileHover={{ y: -6, boxShadow: "0 12px 30px rgba(232, 93, 4, 0.08)" }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 flex flex-col justify-between relative"
            >
              {/* Quote Icon Background */}
              <div className="absolute top-6 right-8 pointer-events-none">
                <Quote size={32} className="stroke-[1.5]" style={{ color: "rgba(232, 93, 4, 0.06)" }} />
              </div>

              <div>
                {/* Individual Stars */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" style={{ color: "#f48c06" }} />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-600 leading-relaxed mb-6 italic text-[15px]">
                  "{review.comment}"
                </p>
              </div>

              {/* Reviewer Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm tracking-wide"
                  style={{ background: "linear-gradient(135deg, #e85d04, #f48c06)" }}
                >
                  {review.initials}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                  <p className="text-xs text-gray-500 font-medium">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedbackSlider;
