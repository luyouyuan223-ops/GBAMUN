import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonialImages = [
  {
    id: 1,
    image: 'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-06-30/1782796252562-dad6e3494da86b719b8f537ff0900576.jpg?auth_key=5f989b175031dce4b81677e4a1dc64e9d1492e85430ee5d3e9f9571ec6db4d03',
  },
  {
    id: 2,
    image: 'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-06-30/1782796261146-b613145b54c6af88a5c7dda73864ce2f.jpg?auth_key=82786d27b44f07555ba7fd3fb7b52e0169f8cf14fa5c85ef850d351a42c03b44',
  },
  {
    id: 3,
    image: 'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-06-30/1782796279506-bed53b3f0dcee16c3db098357015f327.jpg?auth_key=a068ce18971d3561fb1ef8c8b04174daf6784415d6db147e858a847f38925c4e',
  },
  {
    id: 4,
    image: 'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-06-30/1782796303152-b4e8762dd902188a76f54a7dfed5230a.jpg?auth_key=f3a6960701d1563e7d78ceeb5f58a5b1e2366ef1d138bc3d79efff336d2e92be',
  },
  {
    id: 5,
    image: 'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-06-30/1782796307805-7ba3537bc39ca8f7b40f8092c9872062.jpg?auth_key=0593c7df0192b53de85230dfd8b9121583b829c05d8ff734b9ea6e4791cdb032',
  },
  {
    id: 6,
    image: 'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-06-30/1782796312611-ecd2bd09ef269e578d32169430d09890.jpg?auth_key=db052afdb826514a1de4eccef3ca160bebbe305f36e8cd85d1a75b5b83af9cec',
  },
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonialImages.length) % testimonialImages.length);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonialImages.length);
  }, []);

  // 自动轮播
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goToNext, 4000);
    return () => clearInterval(timer);
  }, [isPaused, goToNext]);

  // 计算每张卡片的位置和样式
  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    const normalizedDiff = ((diff % testimonialImages.length) + testimonialImages.length) % testimonialImages.length;

    if (normalizedDiff === 0) {
      return {
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        zIndex: 10,
        opacity: 1,
        isMain: true,
      };
    } else if (normalizedDiff === 1 || normalizedDiff === testimonialImages.length - 1) {
      const direction = normalizedDiff === 1 ? 1 : -1;
      return {
        x: direction * 240,
        y: 30,
        scale: 0.88,
        rotate: direction * 6,
        zIndex: 5,
        opacity: 1,
        isMain: false,
      };
    } else if (normalizedDiff === 2 || normalizedDiff === testimonialImages.length - 2) {
      const direction = normalizedDiff === 2 ? 1 : -1;
      return {
        x: direction * 420,
        y: 50,
        scale: 0.76,
        rotate: direction * 12,
        zIndex: 2,
        opacity: 1,
        isMain: false,
      };
    } else {
      return {
        x: 0,
        y: 0,
        scale: 0.5,
        rotate: 0,
        zIndex: 0,
        opacity: 0,
        isMain: false,
      };
    }
  };

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.2em] text-stone-500 uppercase mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-medium text-[#0e7cc5]">
            来自学员的声音
          </h2>
        </motion.div>

        {/* 卡片堆叠区域 */}
        <div className="relative flex items-center justify-center" style={{ minHeight: '680px' }}>
          {/* 左箭头 */}
          <button
            onClick={goToPrev}
            className="absolute left-0 md:left-4 z-20 w-14 h-14 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-[#0e7cc5] transition-colors shadow-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* 卡片容器 */}
          <div className="relative w-full mx-auto" style={{ height: '620px' }}>
            <AnimatePresence mode="popLayout">
              {testimonialImages.map((item, index) => {
                const style = getCardStyle(index);
                return (
                  <motion.div
                    key={item.id}
                    initial={false}
                    animate={{
                      x: style.x,
                      y: style.y,
                      scale: style.scale,
                      rotate: style.rotate,
                      opacity: style.opacity,
                      zIndex: style.zIndex,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 180,
                      damping: 22,
                    }}
                    whileHover={style.isMain ? { scale: 1.08 } : undefined}
                    onMouseEnter={() => {
                      if (style.isMain) setIsPaused(true);
                    }}
                    onMouseLeave={() => {
                      if (style.isMain) setIsPaused(false);
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ pointerEvents: style.isMain ? 'auto' : 'none' }}
                  >
                    <div
                      className="relative w-full max-w-[380px] overflow-hidden rounded-xl"
                      style={{
                        aspectRatio: '3/4',
                        background: '#f5f5f5',
                        border: 'none',
                        boxShadow: style.isMain ? '0 8px 24px rgba(0,0,0,0.12)' : 'inset 0 0 20px rgba(0,0,0,0.15)',
                      }}
                    >
                      <img
                        src={item.image}
                        alt={`学员 ${item.id}`}
                        className="w-full h-full object-cover"
                        style={{
                          filter: style.isMain ? 'none' : 'blur(6px)',
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* 右箭头 */}
          <button
            onClick={goToNext}
            className="absolute right-0 md:right-4 z-20 w-14 h-14 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-[#0e7cc5] transition-colors shadow-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* 指示点 */}
        <div className="flex justify-center gap-2 mt-10">
          {testimonialImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-[#0e7cc5] w-8' : 'bg-stone-300 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
