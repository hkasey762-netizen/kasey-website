import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PhoneMockup from '../components/PhoneMockup';

gsap.registerPlugin(ScrollTrigger);

// ===== 运营作品数据 =====

// 微信公众号推文
const wechatWorks = [
  {
    title: '社媒运营-微信公众号',
    subtitle: '华师国商公众号推文编撰 2023.09-2024.06',
    desc: '负责学院宣传工作，运用专业设备拍摄活动素材，制作宣传海报、短视频等。参与学院公众号运营及推送，进行公众号推文排版和PPT制作',
    images: ['/images/wechat1.jpg', '/images/wechat3.jpg', '/images/wechat4.jpg'],
  },
];

// 小红书作品（带手机样机展示）
const xiaohongshuWorks = [
  {
    screen: '/images/image18.png',
    title: '台湾跳石车站',
    desc: '到底值不值得去',
    likes: '342',
    collects: '205',
  },
  {
    screen: '/images/image19.png',
    title: '东吴大学研修',
    desc: '校园研修体验分享',
    likes: '1.2k',
    collects: '89',
  },
  {
    screen: '/images/image20.png',
    title: '高雄一日游',
    desc: '懒人版台北高雄攻略',
    likes: '98',
    collects: '42',
  },
  {
    screen: '/images/image21.png',
    title: '花莲一日游',
    desc: '在台周末出游攻略',
    likes: '88',
    collects: '38',
  },
];

// 实习作品数据
const internWork = {
  title: '实习作品-小红书',
  subtitle: '中国台湾东吴大学校园推广大使 2026.03-05',
  stats: [
    { num: '15+', label: '累计图文' },
    { num: '6w+', label: '最高单篇曝光' },
    { num: '10+', label: '私域引流' },
  ],
  desc: '累计产出图文15+篇，最高单篇曝光 6w+，成功引流 10+位 潜在用户至私域社群。利用图文、短视频、社群等方式，创作东吴研修的学术宣传内容，提升其在学术平台和社交媒体的影响力',
  highlights: ['/images/image18.png', '/images/image19.png', '/images/image20.png'],
};

// 活动策划
const activityWorks = [
  {
    title: '活动策划',
    desc: '参与学院"文化节"、"院庆"等活动的推文排版、通讯稿撰写、海报制作、拍摄等工作',
    images: ['/images/image6.png'],
  },
];

// ===== 设计作品数据 - 按三个分组 =====

// 分组1：宣传海报（图一的两张）
const posterGroup1 = {
  title: '宣传海报',
  category: '设计作品',
  desc: '系列讲座宣传海报与暑期研修班宣传海报',
  images: [
    { src: '/images/image24.png', name: '菁才领航系列讲座海报', desc: '以浅蓝几何元素构建简洁秩序，竖排标题强化主题，分栏布局清晰梳理信息，配色统一传递校园活动的专业与活力' },
    { src: '/images/image25.png', name: '暑期研修班宣传海报', desc: '以飞机与城市拼贴构图，突出"出发与探索"的研修主题，营造年轻且国际化的视觉氛围' },
  ],
};

// 分组2：活动海报（图二的三张）
const posterGroup2 = {
  title: '活动海报',
  category: '平面设计',
  desc: '校园活动宣传物料设计',
  images: [
    { src: '/images/image27.png', name: '广州全运会法语海报', desc: '法语主题海报设计，融合体育精神与法式浪漫' },
    { src: '/images/image26.png', name: '"光盘行动"吉祥物设计大赛', desc: '吉祥物设计大赛二轮作品投票宣传' },
    { src: '/images/image28.png', name: '迎新海报', desc: 'Welcome to 国际商学院，欢迎23级新生' },
  ],
};

// 分组3：全英PPT制作（图三+图四的三张截图）
const pptGroup = {
  title: '全英PPT制作',
  category: '演示设计',
  desc: 'Canva制作的全英文PPT演示文稿',
  images: [
    { src: '/images/image30.png', name: 'Language and Communication', desc: '全英学术演示PPT' },
    { src: '/images/image29.png', name: 'SF Discover Program', desc: '研学项目反思日记PPT' },
  ],
};

// ===== 拍摄作品数据 =====
const photoWorks = [
  { src: '/images/image32.jpeg' },
  { src: '/images/image33.jpeg' },
  { src: '/images/image34.jpeg' },
];

export default function PortfolioGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'social' | 'design' | 'photo'>('all');

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.portfolio-card');
    cards.forEach((card) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [activeTab]);

  const openLightbox = (img: string) => setSelectedImage(img);
  const closeLightbox = () => setSelectedImage(null);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative z-10 w-full py-20"
      style={{ backgroundColor: '#E8FFF5' }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div
            className="inline-block px-4 py-1.5 mb-4 text-sm font-bold cute-pill"
            style={{ backgroundColor: '#FF8C69', color: 'white' }}
          >
            Portfolio
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-tilt"
            style={{
              color: '#2D3436',
              fontFamily: "'Quicksand', 'Noto Sans SC', sans-serif",
            }}
          >
            个人作品集
          </h2>
          <p className="mt-3 text-base" style={{ color: '#636E72' }}>
            运营 · 设计 · 拍摄，记录每一个创意瞬间
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {[
              { key: 'all', label: '全部作品' },
              { key: 'social', label: '运营作品' },
              { key: 'design', label: '设计作品' },
              { key: 'photo', label: '拍摄作品' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className="px-5 py-2 text-sm font-bold cute-pill transition-all duration-300"
                style={{
                  backgroundColor: activeTab === tab.key ? '#FF8C69' : 'white',
                  color: activeTab === tab.key ? 'white' : '#2D3436',
                  boxShadow: activeTab === tab.key
                    ? '0px 4px 12px rgba(255,140,105,0.3)'
                    : '0px 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ===== 运营作品 ===== */}
        {(activeTab === 'all' || activeTab === 'social') && (
          <div id="social" className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{ backgroundColor: '#FF8C6920' }}
              >
                📱
              </div>
              <div>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: '#2D3436', fontFamily: "'Quicksand', 'Noto Sans SC', sans-serif" }}
                >
                  运营作品
                </h3>
                <p className="text-xs" style={{ color: '#636E72' }}>
                  微信公众号 · 小红书 · 活动策划
                </p>
              </div>
            </div>

            {/* 1. 微信公众号 */}
            {wechatWorks.map((work, idx) => (
              <div
                key={idx}
                className="portfolio-card mb-8 p-6"
                style={{
                  backgroundColor: 'white',
                  borderRadius: '28px',
                  boxShadow: '0px 4px 20px rgba(0,0,0,0.06)',
                }}
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h4 className="text-xl font-bold" style={{ color: '#2D3436' }}>
                    {work.title}
                  </h4>
                  <span
                    className="px-3 py-1 text-xs font-bold cute-pill"
                    style={{ backgroundColor: '#E0FFF0', color: '#2D3436' }}
                  >
                    {work.subtitle}
                  </span>
                </div>
                <p className="text-sm mb-4" style={{ color: '#636E72' }}>
                  {work.desc}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {work.images.map((img, i) => (
                    <div
                      key={i}
                      className="cursor-pointer overflow-hidden"
                      style={{ borderRadius: '16px' }}
                      onClick={() => openLightbox(img)}
                    >
                      <img
                        src={img}
                        alt={`${work.title}-${i}`}
                        className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* 2. 实习作品-小红书（带数据亮点） */}
            <div
              className="portfolio-card mb-8 p-6"
              style={{
                backgroundColor: 'white',
                borderRadius: '28px',
                boxShadow: '0px 4px 20px rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h4 className="text-xl font-bold" style={{ color: '#2D3436' }}>
                  {internWork.title}
                </h4>
                <span
                  className="px-3 py-1 text-xs font-bold cute-pill"
                  style={{ backgroundColor: '#FF8C6920', color: '#FF8C69' }}
                >
                  {internWork.subtitle}
                </span>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {internWork.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-3 rounded-2xl"
                    style={{ backgroundColor: '#FFF0F5' }}
                  >
                    <div
                      className="text-2xl font-bold"
                      style={{ color: '#FF8C69', fontFamily: "'Quicksand', sans-serif" }}
                    >
                      {stat.num}
                    </div>
                    <div className="text-xs mt-1" style={{ color: '#636E72' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm mb-4" style={{ color: '#636E72' }}>
                {internWork.desc}
              </p>
            </div>

            {/* 3. 小红书作品 - 3D Phone Mockup Gallery */}
            <div
              className="portfolio-card mb-8 p-6"
              style={{
                background: 'linear-gradient(135deg, #FFF0F5 0%, #E6E6FA 50%, #E0FFF0 100%)',
                borderRadius: '28px',
                boxShadow: '0px 4px 20px rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h4 className="text-xl font-bold" style={{ color: '#2D3436' }}>
                  小红书 · 作品分享
                </h4>
                <span
                  className="px-3 py-1 text-xs font-bold cute-pill"
                  style={{ backgroundColor: '#FF8C69', color: 'white' }}
                >
                  3D展示
                </span>
              </div>
              <p className="text-sm mb-6" style={{ color: '#636E72' }}>
                点击手机屏幕可查看大图
              </p>

              {/* Phone Mockups Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {xiaohongshuWorks.map((work, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div onClick={() => openLightbox(work.screen)} className="cursor-pointer">
                      <PhoneMockup
                        screenImage={work.screen}
                        alt={work.title}
                        tilt={i % 2 === 0 ? -12 : 12}
                        floatDelay={i}
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <p className="font-bold text-sm" style={{ color: '#2D3436' }}>
                        {work.title}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: '#636E72' }}>
                        {work.desc}
                      </p>
                      <div className="flex gap-3 justify-center mt-1.5">
                        <span className="text-xs" style={{ color: '#FF8C69' }}>
                          ❤️ {work.likes}
                        </span>
                        <span className="text-xs" style={{ color: '#9B59B6' }}>
                          ⭐ {work.collects}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. 活动策划 */}
            {activityWorks.map((work, idx) => (
              <div
                key={idx}
                className="portfolio-card mb-8 p-6"
                style={{
                  backgroundColor: 'white',
                  borderRadius: '28px',
                  boxShadow: '0px 4px 20px rgba(0,0,0,0.06)',
                }}
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h4 className="text-xl font-bold" style={{ color: '#2D3436' }}>
                    {work.title}
                  </h4>
                </div>
                <p className="text-sm mb-4" style={{ color: '#636E72' }}>
                  {work.desc}
                </p>
                <div className="grid grid-cols-1 max-w-md">
                  {work.images.map((img, i) => (
                    <div
                      key={i}
                      className="cursor-pointer overflow-hidden"
                      style={{ borderRadius: '16px' }}
                      onClick={() => openLightbox(img)}
                    >
                      <img
                        src={img}
                        alt={`${work.title}-${i}`}
                        className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== 设计作品 ===== */}
        {(activeTab === 'all' || activeTab === 'design') && (
          <div id="design" className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{ backgroundColor: '#9B59B620' }}
              >
                🎨
              </div>
              <div>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: '#2D3436', fontFamily: "'Quicksand', 'Noto Sans SC', sans-serif" }}
                >
                  设计作品
                </h3>
                <p className="text-xs" style={{ color: '#636E72' }}>
                  海报设计 · 平面物料
                </p>
              </div>
            </div>

            {/* 分组1：宣传海报 - 两张竖版海报并排 */}
            <div
              className="portfolio-card mb-8 p-6"
              style={{
                backgroundColor: 'white',
                borderRadius: '28px',
                boxShadow: '0px 4px 20px rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h4 className="text-xl font-bold" style={{ color: '#2D3436' }}>
                  {posterGroup1.title}
                </h4>
                <span
                  className="px-3 py-1 text-xs font-bold cute-pill"
                  style={{ backgroundColor: '#E6E6FA', color: '#9B59B6' }}
                >
                  {posterGroup1.category}
                </span>
              </div>
              <p className="text-sm mb-4" style={{ color: '#636E72' }}>
                {posterGroup1.desc}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {posterGroup1.images.map((img, i) => (
                  <div key={i}>
                    <div
                      className="cursor-pointer overflow-hidden"
                      style={{ borderRadius: '20px' }}
                      onClick={() => openLightbox(img.src)}
                    >
                      <img
                        src={img.src}
                        alt={img.name}
                        className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                        style={{ maxHeight: '500px' }}
                      />
                    </div>
                    <p className="font-bold text-sm mt-2" style={{ color: '#2D3436' }}>
                      {img.name}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: '#636E72' }}>
                      {img.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 分组2：活动海报 - 三张不对称布局 */}
            <div
              className="portfolio-card mb-8 p-6"
              style={{
                backgroundColor: 'white',
                borderRadius: '28px',
                boxShadow: '0px 4px 20px rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h4 className="text-xl font-bold" style={{ color: '#2D3436' }}>
                  {posterGroup2.title}
                </h4>
                <span
                  className="px-3 py-1 text-xs font-bold cute-pill"
                  style={{ backgroundColor: '#E6E6FA', color: '#9B59B6' }}
                >
                  {posterGroup2.category}
                </span>
              </div>
              <p className="text-sm mb-4" style={{ color: '#636E72' }}>
                {posterGroup2.desc}
              </p>

              {/* 不对称布局：左边大竖版，右边两张横幅 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 左边：全运会大竖版 */}
                <div
                  className="cursor-pointer overflow-hidden md:row-span-2"
                  style={{ borderRadius: '20px' }}
                  onClick={() => openLightbox(posterGroup2.images[0].src)}
                >
                  <img
                    src={posterGroup2.images[0].src}
                    alt={posterGroup2.images[0].name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    style={{ maxHeight: '540px' }}
                  />
                  <p className="font-bold text-sm mt-2" style={{ color: '#2D3436' }}>
                    {posterGroup2.images[0].name}
                  </p>
                </div>
                {/* 右边两张 */}
                <div className="flex flex-col gap-4">
                  {posterGroup2.images.slice(1).map((img, i) => (
                    <div key={i}>
                      <div
                        className="cursor-pointer overflow-hidden"
                        style={{ borderRadius: '16px' }}
                        onClick={() => openLightbox(img.src)}
                      >
                        <img
                          src={img.src}
                          alt={img.name}
                          className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                          style={{ maxHeight: '220px' }}
                        />
                      </div>
                      <p className="font-bold text-sm mt-1.5" style={{ color: '#2D3436' }}>
                        {img.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 分组3：全英PPT制作 - 两张并排 */}
            <div
              className="portfolio-card mb-8 p-6"
              style={{
                backgroundColor: 'white',
                borderRadius: '28px',
                boxShadow: '0px 4px 20px rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h4 className="text-xl font-bold" style={{ color: '#2D3436' }}>
                  {pptGroup.title}
                </h4>
                <span
                  className="px-3 py-1 text-xs font-bold cute-pill"
                  style={{ backgroundColor: '#FFF0F5', color: '#FF8C69' }}
                >
                  {pptGroup.category}
                </span>
              </div>
              <p className="text-sm mb-4" style={{ color: '#636E72' }}>
                {pptGroup.desc}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {pptGroup.images.map((img, i) => (
                  <div key={i}>
                    <div
                      className="cursor-pointer overflow-hidden"
                      style={{ borderRadius: '16px' }}
                      onClick={() => openLightbox(img.src)}
                    >
                      <img
                        src={img.src}
                        alt={img.name}
                        className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                        style={{ maxHeight: '320px' }}
                      />
                    </div>
                    <p className="font-bold text-sm mt-2" style={{ color: '#2D3436' }}>
                      {img.name}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: '#636E72' }}>
                      {img.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== 拍摄作品 ===== */}
        {(activeTab === 'all' || activeTab === 'photo') && (
          <div id="photo">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{ backgroundColor: '#7FFFD420' }}
              >
                📷
              </div>
              <div>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: '#2D3436', fontFamily: "'Quicksand', 'Noto Sans SC', sans-serif" }}
                >
                  拍摄作品
                </h3>
                <p className="text-xs" style={{ color: '#636E72' }}>
                  风景摄影 · 旅行记录
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photoWorks.map((photo, i) => (
                <div
                  key={i}
                  className="portfolio-card cursor-pointer overflow-hidden"
                  style={{ borderRadius: '24px' }}
                  onClick={() => openLightbox(photo.src)}
                >
                  <img
                    src={photo.src}
                    alt="摄影作品"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    style={{ minHeight: '240px' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.88)' }}
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={selectedImage}
              alt="预览"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl"
            />
            <button
              className="absolute -top-10 right-0 text-white text-2xl font-bold hover:text-[#FF8C69] transition-colors"
              onClick={closeLightbox}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
