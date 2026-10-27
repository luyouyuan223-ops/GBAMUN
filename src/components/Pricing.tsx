import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

const plans = [
  {
    name: '基础探索',
    price: '9,800',
    period: '每人',
    description: '适合初次体验研学之旅',
    features: ['5天4晚行程', '专业导师带队', '基础保险', '标准住宿', '每日三餐', '学习资料包'],
    popular: false,
  },
  {
    name: '标准深度',
    price: '28,800',
    period: '每人',
    description: '最受欢迎的研学方案',
    features: ['7天6晚行程', '资深专家讲解', '全面保险', '精品酒店', '特色餐饮', '实践证书', '行前培训', '家长群实时分享'],
    popular: true,
  },
  {
    name: '高级定制',
    price: '58,000',
    period: '每人',
    description: '尊享个性化研学体验',
    features: ['10天9晚行程', '一对一导师', '高端保险', '五星酒店', '私厨定制', '专属证书', '终身会员', '名校推荐信', 'VIP接送'],
    popular: false,
  },
];

function Pricing() {
  return (
    <section className="relative py-32 bg-slate-950">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-sm tracking-[0.3em] text-blue-400 uppercase mb-4">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            选择适合您的研学方案
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            我们提供多种行程选择，满足不同年龄段和学习需求
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative rounded-2xl p-10 transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-b from-blue-600/20 to-slate-900 border-2 border-blue-500/50'
                  : 'bg-slate-900 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-blue-600 text-white text-xs tracking-widest uppercase rounded-full flex items-center gap-2">
                  <Sparkles className="w-3 h-3" />
                  推荐
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-400">
                  {plan.description}
                </p>
              </div>

              <div className="mb-10">
                <span className="text-4xl font-bold text-white">
                  ¥{plan.price}
                </span>
                <span className="text-sm ml-2 text-slate-500">
                  /{plan.period}
                </span>
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check size={16} className={plan.popular ? 'text-blue-400' : 'text-slate-400'} />
                    <span className="text-sm text-slate-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-medium tracking-wide transition-all duration-300 ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-500'
                    : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
              >
                立即预订
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
