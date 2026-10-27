import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

function Contact() {
  return (
    <section id="contact" className="relative py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-medium text-[#0e7cc5] mb-4">
            开启您的研学之旅
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            无论您有任何疑问，我们的团队随时准备为您提供帮助
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-stone-200 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-stone-700" />
              </div>
              <div>
                <h3 className="text-stone-900 font-medium mb-1">公司地址</h3>
                <p className="text-stone-600">深圳市福田区深南大道车公庙本元大厦7楼7B</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-stone-200 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-stone-700" />
              </div>
              <div>
                <h3 className="text-stone-900 font-medium mb-1">联系电话</h3>
                <p className="text-stone-600">15992659619</p>
                <p className="text-stone-500 text-sm">周一至周日 9:00-21:00</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-stone-200 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-stone-700" />
              </div>
              <div>
                <h3 className="text-stone-900 font-medium mb-1">电子邮箱</h3>
                <p className="text-stone-600">gbamun.pr@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-stone-200 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-stone-700" />
              </div>
              <div>
                <h3 className="text-stone-900 font-medium mb-1">工作时间</h3>
                <p className="text-stone-600">周一至周五 9:00-18:00</p>
                <p className="text-stone-500 text-sm">周末及节假日可预约咨询</p>
              </div>
            </div>
          </motion.div>

          {/* QR Code Area */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm flex flex-col items-center justify-center"
          >
            <h3 className="text-stone-900 text-lg font-medium mb-6">扫码联系我们</h3>
            <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src="https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-20/1776665027379-%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260420140235_802_9.jpg?auth_key=3bde95a04f02fc3deacbb33c8d812d3c3ef5d3d30622135250371a6bff76a983"
                alt="微信二维码"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-stone-500 text-sm mt-4">微信扫码添加客服</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
