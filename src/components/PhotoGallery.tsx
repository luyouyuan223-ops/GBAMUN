import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { learningGallery } from '../pages/learningGallery';
import OptimizedImage from './OptimizedImage';

export default function PhotoGallery() {
  const { language } = useLanguage();
  const en = language === 'en';
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const current = index === null ? null : learningGallery[index];
  const caption = (photo: typeof learningGallery[number]) => photo.caption[en ? 1 : 0];
  const close = () => setIndex(null);
  const move = (offset: number) => setIndex(value => value === null ? null : (value + offset + learningGallery.length) % learningGallery.length);

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (index !== null && !node.open) node.showModal();
    if (index === null && node.open) node.close();
  }, [index]);

  return <>
    <div className="dialog-gallery">
      {learningGallery.map((photo, photoIndex) => <figure key={photo.image}>
        <button className="gallery-thumbnail" onClick={() => setIndex(photoIndex)} aria-label={`${en ? 'View full photo' : '查看大图'}：${caption(photo)}`} aria-haspopup="dialog">
          <OptimizedImage name={photo.image} alt={caption(photo)} sizes="(max-width: 700px) 100vw, 50vw" loading="lazy" />
          <span className="gallery-zoom" aria-hidden="true"><Maximize2 size={19} /></span>
        </button>
        <figcaption>{caption(photo)}</figcaption>
      </figure>)}
    </div>
    <dialog ref={dialog} className="photo-lightbox" aria-label={en ? 'Full photo viewer' : '活动照片大图'} onClose={close}
      onCancel={event => { event.preventDefault(); event.stopPropagation(); close(); }}
      onClick={event => { if (event.target === event.currentTarget) close(); }}
      onKeyDown={event => {
        event.stopPropagation();
        if (event.key === 'Escape') { event.preventDefault(); close(); }
        if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
        if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
      }}>
      <button className="lightbox-close" aria-label={en ? 'Return to gallery' : '返回活动图集'} onClick={close} autoFocus><X size={24} /></button>
      <button className="lightbox-prev" aria-label={en ? 'Previous photo' : '上一张照片'} onClick={() => move(-1)}><ChevronLeft size={28} /></button>
      {current && <figure className="lightbox-content">
        <img key={current.image} src={`/media/${current.image}`} alt={caption(current)} decoding="async" />
        <figcaption aria-live="polite" aria-atomic="true">{caption(current)}<span>{(index ?? 0) + 1} / {learningGallery.length}</span></figcaption>
      </figure>}
      <button className="lightbox-next" aria-label={en ? 'Next photo' : '下一张照片'} onClick={() => move(1)}><ChevronRight size={28} /></button>
    </dialog>
  </>;
}
