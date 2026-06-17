export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative z-10 w-full py-12 text-center"
      style={{ backgroundColor: '#FFF0F5' }}
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center justify-center w-12 h-12 mb-6 transition-transform hover:scale-110"
          style={{
            backgroundColor: '#FF8C69',
            borderRadius: '50%',
            boxShadow: '0px 6px 20px rgba(255, 140, 105, 0.3)',
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>

        <p
          className="text-lg font-bold"
          style={{
            color: '#2D3436',
            fontFamily: "'Quicksand', 'Noto Sans SC', sans-serif",
          }}
        >
          Made with 💖 by Estelle
        </p>
        <p className="text-sm mt-2" style={{ color: '#636E72' }}>
          黄可欣 · 华南师范大学 · 2025
        </p>

        {/* Contact info */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <a
            href="mailto:20233636029@m.scnu.edu.cn"
            className="px-4 py-2 text-sm font-semibold cute-pill transition-transform hover:scale-105"
            style={{
              backgroundColor: 'white',
              color: '#FF8C69',
              boxShadow: '0px 2px 8px rgba(255,140,105,0.15)',
            }}
          >
            📧 邮箱
          </a>
          <span
            className="px-4 py-2 text-sm font-semibold cute-pill"
            style={{
              backgroundColor: 'white',
              color: '#9B59B6',
              boxShadow: '0px 2px 8px rgba(155,89,182,0.15)',
            }}
          >
            📱 13516593219
          </span>
        </div>

        {/* Decorative bottom */}
        <div className="flex justify-center gap-2 mt-8">
          {['#FF8C69', '#7FFFD4', '#9B59B6', '#FFF44F', '#E6E6FA'].map((color, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: color,
                animation: `float ${2 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
