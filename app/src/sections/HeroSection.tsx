import { useEffect, useRef } from 'react';
import CuteDaytimeBackground from '../components/CuteDaytimeBackground';
import gsap from 'gsap';

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Title animation
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)',
        delay: 0.3,
      });
    }

    // Subtitle typewriter-like animation
    if (subtitleRef.current) {
      const chars = subtitleRef.current.textContent?.split('') || [];
      subtitleRef.current.textContent = '';
      subtitleRef.current.style.opacity = '1';

      chars.forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.style.display = 'inline';
        subtitleRef.current!.appendChild(span);

        gsap.to(span, {
          opacity: 1,
          y: 0,
          duration: 0.05,
          delay: 0.8 + i * 0.06,
          ease: 'none',
        });
      });
    }

    // Stars twinkle animation
    if (starsRef.current) {
      const stars = starsRef.current.querySelectorAll('.star');
      stars.forEach((star, i) => {
        gsap.to(star, {
          opacity: 0.4,
          scale: 0.7,
          duration: 0.8 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.4,
        });
      });
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: '100vh' }}
    >
      <CuteDaytimeBackground />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* Floating stars */}
        <div ref={starsRef} className="absolute inset-0 pointer-events-none">
          <div
            className="star absolute"
            style={{
              top: '20%',
              left: '15%',
              fontSize: '2rem',
              color: '#FFF44F',
            }}
          >
            ✦
          </div>
          <div
            className="star absolute"
            style={{
              top: '30%',
              right: '20%',
              fontSize: '1.5rem',
              color: '#FFF44F',
            }}
          >
            ✦
          </div>
          <div
            className="star absolute"
            style={{
              bottom: '25%',
              left: '25%',
              fontSize: '1.2rem',
              color: '#FF8C69',
            }}
          >
            ✦
          </div>
          <div
            className="star absolute"
            style={{
              bottom: '35%',
              right: '15%',
              fontSize: '1.8rem',
              color: '#7FFFD4',
            }}
          >
            ✦
          </div>
        </div>

        {/* Camera icon floating */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '18%',
            right: '18%',
            animation: 'float 3s ease-in-out infinite',
          }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            style={{ filter: 'drop-shadow(0px 4px 8px rgba(255, 140, 105, 0.3))' }}
          >
            <rect x="8" y="18" width="48" height="36" rx="10" fill="#FF8C69" />
            <rect x="22" y="10" width="20" height="12" rx="4" fill="#FF8C69" />
            <circle cx="32" cy="36" r="12" fill="#FFF" />
            <circle cx="32" cy="36" r="8" fill="#9B59B6" />
            <circle cx="44" cy="24" r="3" fill="#FFF44F" />
            <rect x="42" y="18" width="8" height="4" rx="2" fill="#2D3436" />
          </svg>
        </div>

        {/* Main content */}
        <div className="text-center max-w-3xl">
          {/* Hello tag */}
          <div
            className="inline-block px-4 py-1.5 mb-6 text-sm font-bold text-white cute-pill"
            style={{
              backgroundColor: '#FF8C69',
              transform: 'rotate(-3deg)',
              fontFamily: "'Quicksand', sans-serif",
            }}
          >
            Bonjour!
          </div>

          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold mb-4 text-tilt"
            style={{
              color: '#2D3436',
              fontFamily: "'Quicksand', 'Noto Sans SC', sans-serif",
              textShadow: '2px 2px 0px rgba(255, 140, 105, 0.3)',
            }}
          >
            你好呀，我是黄可欣
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl font-medium"
            style={{
              color: '#636E72',
              fontFamily: "'Quicksand', 'Noto Sans SC', sans-serif",
              opacity: 0,
            }}
          >
            一名热爱新媒体与设计的法语生 ✨
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <a
              href="#bento"
              className="cute-btn px-8 py-3 text-white text-base inline-block"
              style={{
                backgroundColor: '#FF8C69',
                boxShadow: '0px 6px 20px rgba(255, 140, 105, 0.35)',
              }}
            >
              认识我 👋
            </a>
            <a
              href="#social"
              className="cute-btn px-8 py-3 text-base inline-block"
              style={{
                backgroundColor: '#E0FFF0',
                color: '#2D3436',
                border: '2px solid #2D3436',
                boxShadow: '4px 4px 0px #2D3436',
              }}
            >
              看作品 🎨
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ animation: 'float 2s ease-in-out infinite' }}
        >
          <span className="text-xs font-medium" style={{ color: '#636E72' }}>
            向下滚动
          </span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF8C69"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
