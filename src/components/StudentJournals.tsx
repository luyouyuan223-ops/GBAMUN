import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

type Journal = {
  title: string;
  date?: string;
  url: string;
  cover: { src: string; width: number; height: number; alt: string; position?: string };
};

// Keep the original article titles when switching languages.
const journals: Journal[] = [
  {
    title: '不囿成见，自见天地｜周靖怡的 UNYDP 研学游记',
    url: 'https://mp.weixin.qq.com/s/lqrFHbbHVuaSn52fMlethg',
    cover: { src: '/media/journal-zhou-jingyi.webp', width: 1440, height: 1920, alt: '周靖怡在马特洪峰前的心形观景装置中留影', position: '50% 60%' },
  },
  {
    title: '行以求知，游以问道｜祝谭皓的 UNYDP 研学游记',
    date: '2026-10-14',
    url: 'https://mp.weixin.qq.com/s/Z25I4_in94oWJnzQssaQfQ',
    cover: { src: '/media/journal-zhu-tanhao.webp', width: 1125, height: 673, alt: '祝谭皓在雪山前的研学旅行照片' },
  },
  {
    title: '观世界，见真我｜Sammi 的 UNYDP 研学游记',
    date: '2026-10-08',
    url: 'https://mp.weixin.qq.com/s/_dZjFFQX2X1W9ZNWogykaQ',
    cover: { src: '/media/journal-sammi.webp', width: 1337, height: 1003, alt: 'Sammi 在雪山与草地前的研学旅行照片' },
  },
];

export default function StudentJournals() {
  const { language } = useLanguage();
  const en = language === 'en';

  return (
    <section id="student-journals" className="pv-section student-journals" aria-labelledby="student-journals-title">
      <div className="pv-container">
        <div className="section-split">
          <div>
            <h2 id="student-journals-title">{en ? 'Student journals' : '学员游记'}</h2>
          </div>
          <p>{en ? 'Read our participants’ journeys on the GBAMUN WeChat official account.' : '跟随学员的文字与镜头，阅读 GBAMUN 公众号中的研学记录。'}</p>
        </div>
        <div className="journal-grid">
          {journals.map(journal => (
            <article className="journal-card" key={journal.url}>
              <a className="journal-link" href={journal.url} target="_blank" rel="noopener noreferrer" aria-label={`${journal.title} — ${en ? 'Read on WeChat (opens in a new tab)' : '阅读公众号原文（在新标签页打开）'}`}>
                <div className="journal-cover"><img src={journal.cover.src} alt={journal.cover.alt} width={journal.cover.width} height={journal.cover.height} style={journal.cover.position ? { objectPosition: journal.cover.position } : undefined} loading="lazy" decoding="async" /></div>
                <div className="journal-body">
                  <div className="journal-meta"><span>{en ? 'GBAMUN · WECHAT' : 'GBAMUN 湾区模联 · 公众号'}</span>{journal.date && <time dateTime={journal.date}>{journal.date.replace(/-/g, '.')}</time>}</div>
                  <h3 lang="zh-CN">{journal.title}</h3>
                  <span className="journal-read">{en ? 'Read on WeChat' : '阅读公众号原文'}<ArrowUpRight size={18} aria-hidden="true" /></span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
