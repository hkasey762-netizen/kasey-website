import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = ['摄影', '文案', '排版', '策划'];
const skillColors = ['#FF8C69', '#7FFFD4', '#9B59B6', '#FFF44F'];

const experiences = [
  {
    period: '2026.02 - 至今',
    title: '东吴大学 校园大使',
    desc: '新媒体运营、校园推广大使',
  },
  {
    period: '2026.02 - 2026.04',
    title: '茉莉数科 AE执行',
    desc: '广告运营、社媒传播策略',
  },
];

const projects = [
  {
    period: '2024.08 - 2024.09',
    title: '旧金山州立大学暑期培训',
    desc: '跨文化沟通与国际视野',
  },
  {
    period: '2025.07 - 2025.08',
    title: '牛津大学展望计划',
    desc: 'LLD Module 文学-语言-数字文化',
  },
];

export default function BentoGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.bento-card');
    cards.forEach((card, i) => {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.4)',
        delay: i * 0.08,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="bento"
      ref={sectionRef}
      className="relative z-10 w-full px-4 md:px-8 py-20"
      style={{ backgroundColor: '#FFF0F5' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <div className="text-center mb-12">
          <div
            className="inline-block px-4 py-1.5 mb-4 text-sm font-bold cute-pill"
            style={{
              backgroundColor: '#7FFFD4',
              color: '#2D3436',
              border: '2px solid #2D3436',
            }}
          >
            About Me
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-tilt"
            style={{
              color: '#2D3436',
              fontFamily: "'Quicksand', 'Noto Sans SC', sans-serif",
            }}
          >
            我的个人简历
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-auto">
          {/* Large Avatar Card */}
          <div
            className="bento-card md:col-span-4 md:row-span-2 relative overflow-hidden p-6 flex flex-col items-center justify-center"
            style={{
              backgroundColor: '#FF8C69',
              borderRadius: '28px',
              minHeight: '380px',
            }}
          >
            {/* Decorative flower */}
            <div
              className="absolute top-3 right-3 w-12 h-12 opacity-30"
              style={{ animation: 'spin-slow 8s linear infinite' }}
            >
              <svg viewBox="0 0 48 48" fill="white">
                <path d="M24 4c2 8 8 14 16 16-8 2-14 8-16 16-2-8-8-14-16-16 8-2 14-8 16-16z" />
              </svg>
            </div>

            <div
              className="w-36 h-36 rounded-full overflow-hidden mb-4"
              style={{
                border: '4px solid white',
                boxShadow: '0px 8px 24px rgba(0,0,0,0.15)',
              }}
            >
              <img
                src="/images/image5.jpeg"
                alt="黄可欣头像"
                className="w-full h-full object-cover"
              />
            </div>

            <h3
              className="text-3xl font-bold text-white mb-1"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              ESTELLE
            </h3>
            <p className="text-white/80 text-sm mb-3">黄可欣</p>

            <div
              className="px-3 py-1 text-xs font-bold text-white/90 cute-pill"
              style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
            >
              🎂 2005.02.19
            </div>

            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {['📷 摄影', '🎨 设计', '✍️ 文案'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-semibold text-white cute-pill"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bio Card */}
          <div
            className="bento-card md:col-span-4 p-6 bg-white"
            style={{ borderRadius: '24px' }}
          >
            <div
              className="inline-block px-3 py-1 text-xs font-bold mb-3 cute-pill"
              style={{ backgroundColor: '#FFF0F5', color: '#FF8C69' }}
            >
              💬 个人简介
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#2D3436' }}>
              华南师范大学法语专业（中外联合培养）本科在读。具备良好的法、英双语能力与国际视野，曾参与美国、英国暑期交流项目。在新媒体运营、活动策划与宣传方面表现突出，擅长运用专业摄影设备完成宣传物料创作。
            </p>
            <div className="mt-3 flex gap-2">
              <span
                className="px-2 py-0.5 text-xs font-semibold cute-pill"
                style={{ backgroundColor: '#E0FFF0', color: '#2D3436' }}
              >
                🇫🇷 法语
              </span>
              <span
                className="px-2 py-0.5 text-xs font-semibold cute-pill"
                style={{ backgroundColor: '#E6E6FA', color: '#2D3436' }}
              >
                🇬🇧 英语
              </span>
            </div>
          </div>

          {/* Education Card */}
          <div
            className="bento-card md:col-span-4 p-6"
            style={{ backgroundColor: '#E6E6FA', borderRadius: '24px' }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                style={{ backgroundColor: 'rgba(155, 89, 182, 0.15)' }}
              >
                🎓
              </div>
              <div>
                <h4 className="font-bold text-base" style={{ color: '#2D3436' }}>
                  华南师范大学
                </h4>
                <p className="text-sm mt-1" style={{ color: '#636E72' }}>
                  国际商学院法语专业
                </p>
                <p className="text-sm" style={{ color: '#636E72' }}>
                  （中外联合培养）2023级 本科在读
                </p>
                <div className="mt-2 flex gap-2">
                  <span
                    className="px-2 py-0.5 text-xs font-bold cute-pill"
                    style={{ backgroundColor: '#9B59B6', color: 'white' }}
                  >
                    已修 125 学分
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Card */}
          <div
            className="bento-card md:col-span-6 p-6"
            style={{ backgroundColor: '#E0FFF0', borderRadius: '24px' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📸</span>
              <h4
                className="font-bold text-lg"
                style={{ color: '#2D3436', fontFamily: "'Quicksand', 'Noto Sans SC', sans-serif" }}
              >
                核心技能
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {skills.map((skill, i) => (
                <div
                  key={skill}
                  className="px-4 py-3 rounded-2xl font-bold text-center text-base transition-transform hover:scale-105"
                  style={{
                    backgroundColor: skillColors[i],
                    color: i === 3 ? '#2D3436' : 'white',
                    boxShadow: `0px 4px 12px ${skillColors[i]}40`,
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs" style={{ color: '#636E72' }}>
              熟练使用秀米、可画、剪映、PS等工具 | 已过计算机二级
            </p>
          </div>

          {/* Internship Card */}
          <div
            className="bento-card md:col-span-6 p-6 bg-white cute-sticker"
            style={{ borderRadius: '24px' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">💼</span>
              <h4 className="font-bold text-lg" style={{ color: '#2D3436' }}>
                实习经历
              </h4>
            </div>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.title} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: '#FF8C69' }}
                    />
                    <div
                      className="w-0.5 h-full"
                      style={{ backgroundColor: '#FFE0D6' }}
                    />
                  </div>
                  <div className="pb-3">
                    <p className="text-xs font-semibold" style={{ color: '#FF8C69' }}>
                      {exp.period}
                    </p>
                    <p className="font-bold text-sm" style={{ color: '#2D3436' }}>
                      {exp.title}
                    </p>
                    <p className="text-xs" style={{ color: '#636E72' }}>
                      {exp.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Card */}
          <div
            className="bento-card md:col-span-4 p-6 text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #FF8C69, #9B59B6)',
              borderRadius: '24px',
            }}
          >
            <div
              className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-20"
              style={{ backgroundColor: 'white' }}
            />
            <div
              className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full opacity-20"
              style={{ backgroundColor: 'white' }}
            />

            <h4
              className="text-2xl font-bold text-white mb-2 relative z-10"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              Let's Chat!
            </h4>
            <p className="text-white/70 text-xs mb-4 relative z-10">随时欢迎交流 💌</p>
            <a
              href="mailto:20233636029@m.scnu.edu.cn"
              className="relative z-10 inline-block px-5 py-2 text-sm font-bold cute-pill transition-transform hover:scale-105"
              style={{
                backgroundColor: 'white',
                color: '#FF8C69',
                boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              📧 发送邮件
            </a>
            <p className="text-white/60 text-xs mt-3 relative z-10">
              20233636029@m.scnu.edu.cn
            </p>
          </div>

          {/* Projects Card */}
          <div
            className="bento-card md:col-span-4 p-6"
            style={{ backgroundColor: '#FFF8E7', borderRadius: '24px' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🌍</span>
              <h4 className="font-bold" style={{ color: '#2D3436' }}>
                项目经历
              </h4>
            </div>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div
                  key={proj.title}
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
                >
                  <p className="text-xs font-semibold" style={{ color: '#9B59B6' }}>
                    {proj.period}
                  </p>
                  <p className="font-bold text-sm mt-0.5" style={{ color: '#2D3436' }}>
                    {proj.title}
                  </p>
                  <p className="text-xs" style={{ color: '#636E72' }}>
                    {proj.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Languages Card */}
          <div
            className="bento-card md:col-span-4 p-6"
            style={{ backgroundColor: '#F0E6FF', borderRadius: '24px' }}
          >
            <h4 className="font-bold mb-3" style={{ color: '#2D3436' }}>
              🌐 语言能力
            </h4>
            <div className="space-y-2.5">
              {[
                { lang: '英语', level: 'CET-6', pct: 85, color: '#7FFFD4' },
                { lang: '法语', level: '专四/TCF B1', pct: 75, color: '#9B59B6' },
              ].map((item) => (
                <div key={item.lang}>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span style={{ color: '#2D3436' }}>
                      {item.lang} · {item.level}
                    </span>
                  </div>
                  <div
                    className="h-2.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: 'rgba(155,89,182,0.1)' }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${item.pct}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools Card */}
          <div
            className="bento-card md:col-span-4 p-5"
            style={{ backgroundColor: '#FFE4EC', borderRadius: '24px' }}
          >
            <h4 className="font-bold mb-3" style={{ color: '#2D3436' }}>
              🛠️ 工具软件
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                'Excel',
                'Word',
                'PPT',
                '秀米',
                '可画',
                '剪映',
                'PS',
                'Canva',
              ].map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl"
                  style={{
                    backgroundColor: 'white',
                    color: '#FF8C69',
                    boxShadow: '0px 2px 8px rgba(255,140,105,0.1)',
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Campus Experience Card */}
          <div
            className="bento-card md:col-span-4 p-5"
            style={{ backgroundColor: '#E6F7FF', borderRadius: '24px' }}
          >
            <h4 className="font-bold mb-3" style={{ color: '#2D3436' }}>
              🏫 在校经历
            </h4>
            <div className="space-y-2">
              {[
                { org: '党团学服务中心宣传部', role: '干事', period: '2023-2024' },
                { org: '校团委实践部', role: '干事', period: '2023-2024' },
              ].map((item) => (
                <div
                  key={item.org}
                  className="p-2.5 rounded-xl"
                  style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
                >
                  <p className="font-semibold text-sm" style={{ color: '#2D3436' }}>
                    {item.org}
                  </p>
                  <p className="text-xs" style={{ color: '#636E72' }}>
                    {item.role} · {item.period}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
