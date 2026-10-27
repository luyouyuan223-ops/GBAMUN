import { useLanguage, useLocalizedContent } from '../i18n/LanguageContext';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqsContent = [
  {
    question: '研学课程适合什么年龄段孩子？',
    answer: '我们的研学课程主要面向13岁以上的青少年，根据不同年龄段设计了不同的行程线路和活动难度。我们推荐13岁以上英语能力较为良好的可以参加联合国青年发展项目'
  },
  {
    question: '研学费用包含哪些内容？',
    answer: '个别行程费用包含国际/国内往返机票、全程酒店住宿、每日三餐及特色餐饮、名校课程及参访费用、专业导师全程陪同、高额旅游保险、签证办理服务（境外项目）、学习材料包及结业证书。不包含个人消费和额外活动费用。'
  },
  {
    question: '如何保障孩子的安全？',
    answer: '我们配备专业安全团队，师生比例1:7，并为每位学员购买高额意外保险。所有导师均经过严格筛选和安全培训，确保孩子在安全的环境中学习和成长。'
  },
  {
    question: '可以退款或改期吗？',
    answer: '具体情况请详细咨询，行程老师。因不可抗力因素（如疫情、自然灾害等）导致无法出行，可全额退款或免费改期。'
  },
  {
    question: '家长如何了解孩子的情况？',
    answer: '通过1对1的家长群分享活动照片和视频，导师会定期汇报孩子表现，紧急情况下会第一时间联系家长。境外项目还会提供每日行程简报，让家长实时了解孩子的动态。'
  },
  {
    question: '需要准备什么物品？',
    answer: '我们会提供详细物品清单，通常包括换洗衣物、个人洗漱用品、防晒用品、常用药品等。建议不要携带贵重物品。境外项目我们会协助办理签证，并提供行前培训。'
  }
];

function FAQItem({ faq, index }: { faq: typeof faqsContent[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="border-b border-stone-200"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-medium text-stone-900 pr-8">
          {faq.question}
        </span>
        <div className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center flex-shrink-0 group-hover:border-stone-900 transition-colors">
          {isOpen ? (
            <Minus className="w-4 h-4 text-stone-900" />
          ) : (
            <Plus className="w-4 h-4 text-stone-600" />
          )}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-stone-600 leading-relaxed max-w-3xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FAQ() {
  const faqs = useLocalizedContent(faqsContent);
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.2em] text-stone-500 uppercase mb-4">FAQ</p>
          <h2 className="text-4xl font-medium text-[#0e7cc5] mb-4">{t('常见问题')}</h2>
          <p className="text-lg text-stone-500">{t('关于研学课程的常见疑问解答')}</p>
        </motion.div>
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
