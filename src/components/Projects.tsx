import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const projects = [
  {
    id: 'global-leadership',
    title: '联合国青年发展项目',
    subtitle: 'UN Youth Development Program',
    description: '来自不同背景的优秀青年们将走进联合国、探索日内瓦，进行一场沉浸式的国际领导力和全球视野教育实训',
    image: 'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-18/1776477105911-1.jpg?auth_key=3fb497066c3075dd44ce93913326cb2f2736329e1718fa3583459a88e2859fe4',
    duration: '12天',
    location: '瑞士 · 法国',
  },
  {
    id: 'tech-innovation',
    title: 'AFS联合国青年大会',
    subtitle: 'AFS UN Youth Assembly',
    description: '联合国最大型、重要的青年会议之一，全球约500名青年参与，赋能青年成为具备跨文化理解与行动力的全球公民',
    image: 'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-18/1776477105915-2.png?auth_key=c469de6d6f132e6a5052c1b3143d2458bf5945424924a54483e3bf3ccbf28d1c',
    duration: '11天',
    location: '瑞士 · 法国',
  },
  {
    id: 'humanities-arts',
    title: '肯尼亚SDGs实景科研所',
    subtitle: 'Kenya SDGs Field Research Institute',
    description: '踏上非洲这片神奇的土地，探访国际组织，走进世界上最大的贫民窟，感受非洲safari的狂野，完成科研产出成果',
    image: 'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-18/1776477322789-3.jpg?auth_key=dd35e235888bbe896508e8b4d1053df0eb5e4b092ae39f059993abf809b7d6ad',
    duration: '11天',
    location: '肯尼亚',
  },
];

function Projects() {
  const navigate = useNavigate();

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
    window.scrollTo(0, 0);
  };

  return (
    <section id="projects" className="relative py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.2em] text-stone-500 uppercase mb-4">Programs</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-4xl md:text-5xl font-medium text-[#0e7cc5] leading-tight">
              专为卓越青年
              <br />
              打造国际化研学项目
            </h2>
            <p className="text-stone-600 max-w-md leading-relaxed">
              为青少年打开通往世界的大门，在探索中成长，在实践中蜕变
            </p>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer h-full"
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-shadow duration-500 h-full flex flex-col">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden flex-shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-stone-500 text-sm mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="text-xl font-medium text-stone-900 mb-2 group-hover:text-stone-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed mb-4 flex-grow line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <span className="text-sm text-stone-400">{project.duration}</span>
                    <div className="flex items-center gap-2 text-stone-900 group-hover:text-stone-700 transition-colors">
                      <span className="text-sm font-medium">了解详情</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
