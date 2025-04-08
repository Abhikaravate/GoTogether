// 
import React, { useEffect } from 'react';

const LandingPage = ({ onCut }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onCut();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onCut]);

  const containerStyle = {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    background: 'white',
    overflow: 'hidden',
  };

  const paperBaseStyle = {
    position: 'absolute',
    width: '50%',
    height: '100%',
    background: 'white',
    zIndex: 1,
    top: 0,
    transition: 'transform 2s ease-in-out',
  };

  const leftPaperStyle = {
    ...paperBaseStyle,
    left: 0,
    animation: 'slideLeft 2s forwards',
  };

  const rightPaperStyle = {
    ...paperBaseStyle,
    right: 0,
    animation: 'slideRight 2s forwards',
  };

  const scissorStyle = {
    position: 'absolute',
    top: '50%',
    left: '-100px',
    width: '60px',
    height: '60px',
    animation: 'moveAcross 2s 0.5s forwards',
    zIndex: 2,
    transform: 'translateY(-50%)',
  };

  const circleStyle = {
    width: '20px',
    height: '20px',
    background: 'black',
    borderRadius: '50%',
    position: 'absolute',
    top: '20px',
    left: '20px',
    zIndex: 3,
  };

  const handleStyle = {
    width: '30px',
    height: '8px',
    background: 'black',
    position: 'absolute',
    top: '26px',
    left: 0,
    borderRadius: '4px',
  };

  const bladeBaseStyle = {
    position: 'absolute',
    width: '40px',
    height: '4px',
    background: 'gray',
    top: '28px',
    left: '20px',
    transformOrigin: 'left',
  };

  const blade1Style = {
    ...bladeBaseStyle,
    transform: 'rotate(30deg)',
  };

  const blade2Style = {
    ...bladeBaseStyle,
    transform: 'rotate(-30deg)',
  };

  return (
    <>
      <style>
        {`
          @keyframes slideLeft {
            to { transform: translateX(-100%); }
          }
          @keyframes slideRight {
            to { transform: translateX(100%); }
          }
          @keyframes moveAcross {
            to { left: 110%; }
          }
        `}
      </style>

      <div style={containerStyle}>
        <div style={leftPaperStyle} />
        <div style={rightPaperStyle} />
        <div style={scissorStyle}>
          <div style={circleStyle} />
          <div style={handleStyle} />
          <div style={blade1Style} />
          <div style={blade2Style} />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
