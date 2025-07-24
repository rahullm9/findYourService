import React from 'react';


// Sample data for demonstration
const feedbackData = [
  {
    id: 1,
    name: 'Sarah L.',
    role: 'Product Manager',
    comment: 'This is hands-down the best tool I have ever used. It has completely streamlined our workflow and saved us countless hours. Highly recommended! 👍',
  },
  {
    id: 2,
    name: 'Michael B.',
    role: 'Lead Developer',
    comment: 'Incredibly well-designed and intuitive. The integration was a breeze, and the performance is outstanding. My team loves it.',
  },
  {
    id: 3,
    name: 'Emily C.',
    role: 'UX Designer',
    comment: 'Aesthetically pleasing and functionally robust. It\'s clear that a lot of thought went into the user experience. A joy to work with.',
  },
  {
    id: 4,
    name: 'David R.',
    role: 'Startup Founder',
    comment: 'As a startup, we need tools that are both powerful and affordable. This product hits the sweet spot. It has been a game-changer for our growth.',
  },
  {
    id: 5,
    name: 'Jessica T.',
    role: 'Marketing Head',
    comment: 'The analytics features are top-notch. We\'ve gained so much insight into our customer base since we started using this platform.',
  },
];

const FeedbackSlider = () => {
  // We duplicate the data to create a seamless loop effect
  const extendedFeedback = [...feedbackData, ...feedbackData];

  return (
    <div className="feedback-slider-container mt-9 px-6 md:px-12">
    <div className="feedback-slider-track px-6 md:px-12">
      {extendedFeedback.map((feedback, index) => (
        <div 
          key={index} 
          // ✨ All styling classes are now here instead of the CSS file
          className="feedback-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <blockquote className="text-gray-700 dark:text-gray-300">
            "{feedback.comment}"
          </blockquote>
          <div className="mt-4 flex items-center">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">{feedback.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{feedback.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default FeedbackSlider;