import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Is it legal to download videos?',
      answer: 'Downloading videos for personal use is generally allowed, but you should respect copyright laws and terms of service of the platforms.'
    },
    {
      question: 'What video formats are supported?',
      answer: 'We support MP4, MP3, and other common formats. You can choose your preferred format during download.'
    },
    {
      question: 'Do I need to create an account?',
      answer: 'No, you can download videos without an account. However, creating an account allows you to save your download history.'
    },
    {
      question: 'Can I download playlists?',
      answer: 'Yes, we support playlist downloads for YouTube and other platforms that support playlists.'
    },
  ];

  return (
    <div className="faq">
      <div className="container">
        <h1>Frequently Asked Questions</h1>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                <span className="faq-toggle">{openIndex === index ? '−' : '+'}</span>
              </div>
              {openIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
