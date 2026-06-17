import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface PhoneMockupProps {
  screenImage: string;
  alt?: string;
  tilt?: number;
  floatDelay?: number;
}

export default function PhoneMockup({
  screenImage,
  alt = '手机屏幕内容',
  tilt = -12,
  floatDelay = 0,
}: PhoneMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Floating animation
    gsap.to(containerRef.current, {
      y: -8,
      duration: 2 + floatDelay * 0.3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: floatDelay * 0.2,
    });
  }, [floatDelay]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto"
      style={{
        perspective: '1000px',
        width: '260px',
      }}
    >
      <div
        className="relative"
        style={{
          transform: `rotateY(${tilt}deg) rotateX(4deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = `rotateY(${tilt * 0.5}deg) rotateX(2deg) scale(1.02)`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = `rotateY(${tilt}deg) rotateX(4deg)`;
        }}
      >
        {/* Phone shadow */}
        <div
          className="absolute -bottom-4 left-4 right-4 h-8 rounded-full blur-lg opacity-30"
          style={{
            background: 'linear-gradient(90deg, rgba(155,89,182,0.4), rgba(255,140,105,0.4))',
            transform: 'translateZ(-40px)',
          }}
        />

        {/* Phone frame */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: '36px',
            backgroundColor: '#1a1a1a',
            padding: '10px',
            boxShadow: `
              0 0 0 2px #333,
              0 25px 50px -12px rgba(0,0,0,0.4),
              0 0 0 1px rgba(255,255,255,0.1) inset
            `,
          }}
        >
          {/* Dynamic Island */}
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 z-10"
            style={{
              width: '90px',
              height: '24px',
              borderRadius: '12px',
              backgroundColor: '#000',
            }}
          />

          {/* Screen */}
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: '28px',
              backgroundColor: '#fff',
              aspectRatio: '9/19',
            }}
          >
            <img
              src={screenImage}
              alt={alt}
              className="w-full h-full object-cover"
              draggable={false}
            />

            {/* Screen reflection */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.05) 100%)',
                borderRadius: '28px',
              }}
            />
          </div>
        </div>

        {/* Side buttons (decorative) */}
        <div
          className="absolute top-20 -left-1 w-1 h-8 rounded-full"
          style={{ backgroundColor: '#333' }}
        />
        <div
          className="absolute top-32 -left-1 w-1 h-12 rounded-full"
          style={{ backgroundColor: '#333' }}
        />
        <div
          className="absolute top-24 -right-1 w-1 h-14 rounded-full"
          style={{ backgroundColor: '#333' }}
        />
      </div>
    </div>
  );
}
