import React from 'react';

interface CareNestLogoProps {
  size?: number;
  showText?: boolean;
}

export const CareNestLogo: React.FC<CareNestLogoProps> = ({ size = 40, showText = false }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <img
        src="/images/image-removebg-preview.png"
        alt="CareNest Logo"
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          display: 'block'
        }}
      />
      {showText && (
        <div
          style={{
            textAlign: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: size * 0.25,
            fontWeight: 600,
            color: '#7B9DAD',
            marginTop: size * 0.1
          }}
        >
          CareNest
        </div>
      )}
    </div>
  );
};
