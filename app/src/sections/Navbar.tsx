import { useState, useEffect } from 'react';

const navLinks = [
  { label: '主页', href: '#hero' },
  { label: '运营', href: '#social' },
  { label: '设计', href: '#design' },
  { label: '拍摄', href: '#photo' },
];

export default function Navbar() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, idx: number) => {
    e.preventDefault();
    setActiveIdx(idx);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled ? 'top-3' : 'top-6'
      }`}
    >
      <div
        className="flex items-center gap-1 px-2 py-2 rounded-full"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0px 4px 20px rgba(255, 140, 105, 0.15)',
          border: '2px solid rgba(255, 255, 255, 0.5)',
        }}
      >
        {navLinks.map((link, idx) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleClick(e, link.href, idx)}
            className="relative px-5 py-2 text-sm font-semibold transition-colors duration-200"
            style={{
              color: activeIdx === idx ? '#FF8C69' : '#2D3436',
              fontFamily: "'Quicksand', 'Noto Sans SC', sans-serif",
            }}
          >
            {link.label}
            {activeIdx === idx && (
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: '#FF8C69' }}
              />
            )}
          </a>
        ))}
      </div>
    </nav>
  );
}
