import React from 'react';

export default function Logo({ size = 26, src = '/lottie/ai-loading.lottie' }) {
  return (
    <div className="logo-lottie" aria-hidden="true" style={{ width: `${size}px`, height: `${size}px` }}>
      <dotlottie-wc
        src={src}
        autoplay
        loop
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}