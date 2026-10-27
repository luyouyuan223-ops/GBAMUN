import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Calendar, MapPin, Users, Clock, CheckCircle2,
  Plane, Hotel, Utensils, Shield, GraduationCap, ArrowRight,
  X, ChevronLeft, ChevronRight
} from 'lucide-react';

const projectsData = {
  'global-leadership': {
    title: '联合国青年发展项目',
    subtitle: 'UN Youth Development Program',
    description: '来自不同背景的优秀青年们将走进联合国、探索日内瓦，进行一场沉浸式的国际领导力和全球视野教育实训。项目涵盖联合国机构参访、国际组织交流、领导力工作坊等多元活动，培养具备全球胜任力的未来领袖。',
    image: 'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-18/1776477105911-1.jpg?auth_key=3fb497066c3075dd44ce93913326cb2f2736329e1718fa3583459a88e2859fe4',
    duration: '12天',
    location: '瑞士 · 法国',
    participants: '20-30人',
    ageRange: '13岁以上',
    price: '¥33,800起',
    departure: '2025年7月',
    pdfUrl: 'https://conversation.cdn.meoo.host/conversations/303390263236231168/file/2026-04-18/1776477731525-_250914版__UNYDP_2026_July_项目手册.pdf?auth_key=b961fe356aa75f54f157da28f2d371f392759599d34944f3df08ed843a9b926c',
    highlights: [
      '联合国万国宫官方参访',
      '世界卫生组织(WHO)交流',
      '世界知识产权组织(WIPO)参访',
      '联合国欧洲总部深度体验',
      '日内瓦国际关系学院课程',
      '国际领导力工作坊',
      '可持续发展目标(SDGs)实践',
      '官方结业证书及推荐信'
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: '飞抵瑞士、前往酒店',
        content: '飞抵瑞士日内瓦，前往酒店办理入住，休息调整时差，为接下来的行程做好准备。',
        location: '日内瓦'
      },
      {
        day: 'Day 2',
        title: 'WMO世界气象组织与UNITAR训研所',
        content: '上午参访WMO世界气象组织，参加UNITAR联合国训研所欢迎仪式，由执行主任Nikhil Seth先生主持；下午参加领导能力培训研讨。',
        location: '日内瓦'
      },
      {
        day: 'Day 3',
        title: '万国宫参访与谈判技能培训',
        content: '上午参加谈判能力培训研讨；下午导览参访联合国日内瓦办事处与万国宫，旁观联合国贸易和发展会议(UNCTAD)多边外交会议。',
        location: '日内瓦'
      },
      {
        day: 'Day 4',
        title: '瑞士常驻联合国使团与WTO世贸组织',
        content: '上午参访瑞士常驻日内瓦联合国使团，由发言人Frédéric Ballenegger先生主持；下午参加WTO世贸组织专家讲座及公共演讲能力培训研讨。',
        location: '日内瓦'
      },
      {
        day: 'Day 5',
        title: '欧洲核子研究组织CERN',
        content: '上午参访欧洲核子研究组织(CERN)，走进世界上最大的粒子物理学实验室，近距离接触研究设施；下午参观「我们的宇宙」与「量子世界」科技展览。',
        location: '日内瓦'
      },
      {
        day: 'Day 6',
        title: 'SDGs培训与联合国职业生涯讲座',
        content: '上午参加联合国可持续发展目标(SDGs)培训研讨；下午参加「联合国职业生涯的十大个人经验」专家讲座及最终汇报、结业仪式，晚上参加日内瓦湖游船晚宴。',
        location: '日内瓦'
      },
      {
        day: 'Day 7',
        title: '霞慕尼-蒙勃朗冰川与勃朗峰',
        content: '上午搭乘大巴前往霞慕尼-蒙勃朗，乘坐始于1908年的红色齿轮小火车登上蒙特维「冰海」冰川；下午搭乘高空缆车游览南针峰，全景观赏欧洲屋脊勃朗峰。',
        location: '霞慕尼'
      },
      {
        day: 'Day 8',
        title: '红十字博物馆与日内瓦艺术历史博物馆',
        content: '上午参访国际红十字与红新月博物馆，了解人道主义行动的历史与发展；下午参访日内瓦艺术与历史博物馆，体会跨越古今的艺术发展和文化演变。',
        location: '日内瓦'
      },
      {
        day: 'Day 9',
        title: '因特拉肯、图恩湖与施皮茨',
        content: '上午搭乘火车前往因特拉肯；下午风景游览湖畔小镇图恩，探访中世纪城堡；随后搭乘古老的明轮游船巡游图恩湖，一览壮美的环湖山峰。',
        location: '因特拉肯'
      },
      {
        day: 'Day 10',
        title: '劳特布伦嫩、米伦与少女峰',
        content: '上午前往劳特布伦嫩，造访山崖上的小镇米伦，徒步在美轮美奂的梦幻山坡之间，一览少女峰、艾格峰与僧侣峰；下午前往童话小镇龙疆，沿着碧玉般的龙疆湖徒步。',
        location: '劳特布伦嫩'
      },
      {
        day: 'Day 11',
        title: '采尔马特与马特洪峰',
        content: '上午搭乘火车前往采尔马特，探索群山环绕的山谷小镇，迷失在马特洪峰的壮丽景色中；下午登上最佳视野观景台，欣赏马特洪峰的最美倒影，享受惬意的湖边烧烤时光。',
        location: '采尔马特'
      },
      {
        day: 'Day 12',
        title: '返程回国',
        content: '办理退房、返回日内瓦，在日内瓦市区午餐后行程结束，整理收获体验，搭乘航班平安返程。',
        location: '日内瓦'
      }
    ],
    includes: [
      '全程三星/四星酒店住宿',
      '每日早餐',
      '联合国机构参访费用',
      '专业导师全程陪同',
      '课程与工作坊费用',
      '高额境外旅游保险',
      '签证办理服务',
      '项目手册与学习资料'
    ],
    gallery: [
      'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-18/1776481444927-%E6%88%90%E5%91%98%E7%85%A7.JPG?auth_key=49e79b52898517b98849030996da9e7e4a79579b3517909f35b44bc0f5342643',
      'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-18/1776481444928-O-%E5%90%8C%E4%BC%A0%E7%BF%BB%E8%AF%91%E5%AE%A4%E7%9C%8B%E4%BC%9A%E8%AE%AE.jpg?auth_key=dfc799a19ffae25a5af41d8024752e7801edd79aedbb8745b3e610d2398ac706',
      'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-18/1776481444918-O-unitar%E5%9B%A2%E9%98%9F.JPG?auth_key=c723c25c22c04d325c7aa801f4f197c72a2def4d248fa3480c5057914d485d67',
      'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-18/1776481444914-IMG_4522.jpg?auth_key=97d60231784c2cd077750b84fc0729eba4ce16cf932ec574d49957bee82174bd',
      'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-20/1776661255763-A-_public_speaking%E5%90%88%E7%85%A723S.jpg?auth_key=7eb3e3570e5f052014c440e5d0553a8ccf3fff42bf89ec0d10f2237da24db5a5',
      'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-20/1776661255762-A-negotiation%E5%AE%9E%E8%B7%B52.JPG?auth_key=1bfcb47a0faef87e9f0e1ce713f4b15ef3675490e1db10fdab67a2b61a1cb385',
      'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-20/1776661255766-A-%E5%A4%9A%E8%BE%B9%E5%A4%96%E4%BA%A4%E8%AF%BE.JPG?auth_key=95cd72020c0e2fa3fd9d0ab82c17b3c70a40de533789e7a0ef5c12d04ad041d5',
      'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-20/1776661255765-A-%E7%BA%A2%E4%B8%8E%E9%BB%911.JPG?auth_key=f13c99404eb4c3e44bc5db70ccf8a6d0712678460e142a8f2af870615510a845',
    ]
  },
  'tech-innovation': {
    title: 'AFS联合国青年大会',
    subtitle: 'AFS UN Youth Assembly',
    description: '联合国最大型、重要的青年会议之一，每年汇聚约500名来自100多个国家和地区的青年代表。2026年8月11-21日在瑞士日内瓦和法国巴黎举行，主题为"崛起·重构·重建：一个属于所有人的世界"。',
    image: 'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-18/1776477105915-2.png?auth_key=c469de6d6f132e6a5052c1b3143d2458bf5945424924a54483e3bf3ccbf28d1c',
    duration: '11天',
    location: '瑞士 · 法国',
    participants: '20-30人',
    ageRange: '13岁以上',
    price: '¥35,800',
    departure: '2026年8月',
    pdfUrl: 'https://conversation.cdn.meoo.host/conversations/303390263236231168/file/2026-04-20/1776669218661-_3_0_AFS青年大会项目.pdf?auth_key=58f6e220535ffa02d581d5bdad99281b8b9e96ac24993c77f74255b7af018cb9',
    highlights: [
      '联合国青年大会正式参与',
      '四大核心议题深度研讨',
      '国际青年日庆祝活动',
      '能力建设型工作坊',
      '解决方案共创工作坊',
      '阿尔卑斯山冰川探索',
      '巴黎文化深度探索'
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: '到达日内瓦机场及破冰仪式',
        content: '参与者将于当日抵达日内瓦，并入住B&B Hotel Geneva Airport。酒店位于日内瓦机场附近，交通便利，可快速连接市区及主要国际机构区域。酒店整体风格简约现代，提供舒适整洁的客房环境，配备基础完善的设施与公共空间，能够满足参与者在项目期间的休息与交流需求，为接下来的行程提供良好的居住体验与状态支持。当晚将举行欢迎及破冰活动，通过轻松有趣的互动形式，参与者将有机会彼此认识、建立初步信任，并在开放与包容的氛围中开启本次项目的交流与合作。',
        location: '日内瓦'
      },
      {
        day: 'Day 2',
        title: '国际青年日庆祝活动 & 大会开幕',
        content: '当日下午，参与者将出席国际青年日庆祝活动（15:00-17:00），本活动通常在联合国日内瓦总部举办（视场地安排而定），是全球青年共同参与的重要年度节点之一。活动将汇聚来自世界各地的青年代表，并邀请青年领袖、联合国高级官员及各领域专家进行分享与对话，围绕全球议题展开交流。该环节不仅为参与者提供近距离接触国际组织与全球治理议题的机会，也标志着本次AFS Youth Assembly的正式启动。',
        location: '日内瓦'
      },
      {
        day: 'Day 3',
        title: '围绕全球议题与青年行动全面展开',
        content: '大会第二天将以高密度的学习与交流活动展开。上午的全体大会（Plenary）将邀请全球领袖发表主题演讲，带来对当下国际议题的多维视角与深度洞察。在此基础上，参与者将进入分论坛与专题工作坊，围绕四大核心议题展开深入探讨，并通过互动式学习强化对全球议题的理解与思考。同时，现场还将设置Opportunities Fair，为参与者提供接触国际项目、组织与发展机会的平台。',
        location: '日内瓦'
      },
      {
        day: 'Day 4',
        title: '围绕全球议题与青年行动全面展开',
        content: '大会第三天将在延续前一日讨论的基础上，进一步深化议题，并逐步转向行动导向与成果呈现。上午将继续全体大会及分论坛讨论，围绕核心主题展开更具针对性的交流。随后，参与者将进入Action & Impact Hub，通过协作与实践，探索将理念转化为具体行动的路径，推动项目构想向实际影响力迈进。当日行程将在闭幕式与颁奖典礼中迎来高潮，对优秀项目与参与成果进行表彰。晚间还将举行文化节与音乐表演（Culture Fest）。',
        location: '日内瓦'
      },
      {
        day: 'Day 5',
        title: '洛桑和蒙特勒',
        content: '上午参访洛桑，从奥林匹克运动、国际治理与湖畔城市文化出发，理解这座"奥林匹克之都"的全球影响力，反思体育精神、国际合作与城市发展之间的关系。随后前往国际奥林匹克博物馆，近距离了解百年奥运的历史传承与当代价值。下午前往蒙特勒，从日内瓦湖风光、爵士文化与欧洲疗养传统出发，理解这座湖畔小镇的独特魅力。漫步湖滨步道与西庸城堡，感受阿尔卑斯山与日内瓦湖交织的诗意画卷。',
        location: '洛桑 · 蒙特勒'
      },
      {
        day: 'Day 6',
        title: '阿尔卑斯山霞慕尼勃朗峰',
        content: '上午参访霞慕尼-蒙勃朗的蒙特维「冰海」冰川，从冰川地貌、气候变迁与人类活动出发，理解阿尔卑斯山冰川退缩的严峻现实，反思全球变暖对山地生态、水资源与人类社会的深远影响。乘坐冰川小火车抵达冰洞，近距离观察冰海的结构与消融痕迹，感受气候变化的直观证据。下午前往阿尔卑斯山最高峰勃朗峰与标志性的南针峰，从高山地貌、登山历史与人类极限挑战出发，理解阿尔卑斯山作为欧洲"屋脊"的文化象征意义。乘坐缆车登顶南针峰，在观景台俯瞰勃朗峰群峰，感受高山环境的极致之美与严酷挑战。',
        location: '霞慕尼'
      },
      {
        day: 'Day 7',
        title: '巴黎市区',
        content: '下午登上埃菲尔铁塔，360°俯瞰巴黎全城，感受这座城市地标背后的工业文明与现代巴黎的城市格局。漫步"世界最美大街"——香榭丽舍大街，沉浸式体验巴黎的时尚气息与浪漫生活风情。探访凯旋门，感受法国历史荣光与城市放射状规划格局；游览协和广场，欣赏方尖碑与古典广场景观，读懂城市的厚重与优雅。傍晚搭乘塞纳河观光游船，以独特水上视角串联巴黎两岸经典地标，在流动风景中沉浸式感受"巴黎的灵魂"。',
        location: '巴黎'
      },
      {
        day: 'Day 8',
        title: '凡尔赛宫',
        content: '上午参访凡尔赛宫，从法国皇家历史、宫廷文化与建筑艺术出发，了解这座世界文化遗产的宏伟与厚重。宫殿内金碧辉煌的厅堂、精美壁画与奢华装饰，完整展现法国古典主义建筑的巅峰成就，透过历史空间感受欧洲皇室的生活场景与权力秩序，深度理解法国宫廷文化与历史变迁。下午漫步凡尔赛花园，在法式古典园林中感受对称美学、喷泉雕塑与自然景观的完美融合。参观大小特里亚农宫，了解法国王室的私密生活与休闲文化，从宫殿的庄重威严过渡到园林的优雅静谧，完整体验凡尔赛宫作为皇家行宫的整体格局与艺术魅力。',
        location: '凡尔赛'
      },
      {
        day: 'Day 9',
        title: '卢浮宫与奥赛博物馆',
        content: '上午参访卢浮宫博物馆，从皇家收藏与艺术史脉络出发，理解西方古典艺术的审美体系与文明传承，反思其对全球艺术叙事、权力结构与历史记忆之间的关系。前往三大镇馆之宝展区，近距离了解古典艺术的巅峰成就与人文价值。下午参访奥赛博物馆，从工业遗产与艺术革新出发，理解19世纪法国社会变革与艺术思潮的交融，反思其对现代艺术语言、城市生活与审美观念之间的关系。沉浸于印象派大师展区，近距离了解光影革命与现代性表达的实践。',
        location: '巴黎'
      },
      {
        day: 'Day 10',
        title: '联合国教科文组织参访',
        content: '上午参访巴黎联合国教科文组织（UNESCO）总部，理解教育公平、文化多样性保护与和平理念的实践，反思其对全球知识生产、权力结构与历史记忆之间的关系。前往其核心展厅与公共空间，近距离了解当代全球文化遗产保护、可持续发展教育的实践与挑战。下午前往位于巴黎奥斯曼大道的老佛爷百货进行参观与自由活动，体验巴黎本地商业氛围，实地感受巴黎作为时尚城市的消费环境与品牌文化。前往商场标志性的穹顶区域参观拍照，了解其历史背景及商业特色，在轻松的城市体验中加深对巴黎商业与生活方式的直观认识。',
        location: '巴黎'
      },
      {
        day: 'Day 11',
        title: '返程回国',
        content: '结束本次充实而精彩的海外参访行程，整理旅途收获与美好回忆，搭乘航班平安返程。在文化交流、艺术鉴赏与国际视野拓展中沉淀思考，将所见所闻转化为成长与收获，圆满收官本次旅程。',
        location: '巴黎 → 国内'
      }
    ],
    includes: [
      '会议注册及官方会议相关费用',
      '系统化行前培训与学术指导',
      '项目期间全程住宿',
      '签证服务费用',
      '欧洲境内统一交通',
      '专业导师全程陪同',
      '高额境外旅游保险',
      '项目手册与学习资料'
    ],
    gallery: [
      'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-18/1776477105915-2.png?auth_key=c469de6d6f132e6a5052c1b3143d2458bf5945424924a54483e3bf3ccbf28d1c',
      'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-20/1776664272812-%E5%9B%BE%E7%89%872.png?auth_key=05666d40ada9fdc28d67beef25f82f241daf59a79a41e5946cceeb9f3825eb52',
      'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-20/1776664272803-%E5%9B%BE%E7%89%873.png?auth_key=103a2440959f7fad3d6a19301436d25f36be5fa387f9806e0c9cedd49f5ec126',
      'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-20/1776664272804-%E5%9B%BE%E7%89%874.png?auth_key=a9c8c9916e9fc3d7b8b3ea2dfecb6a91520e60508ac86492d59d9a0edda8acd0',
      'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-20/1776664272810-%E5%9B%BE%E7%89%875.png?auth_key=99eadf2664a69080db8a3ef41faa4ff4c4a11e52c8d4e36c7cce5501f0d1d43e',
      'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-20/1776664272810-%E5%9B%BE%E7%89%876.png?auth_key=ff0456b294ea74129055d606d926d39178c067cfe2e87b33fabe4af98dce5dbd',
      'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-20/1776664272824-%E5%9B%BE%E7%89%877.jpg?auth_key=cd18739c31180acb26693ac6a093a2daf9ccd5d82824c93330c0992f61936f06',
    ]
  },
  'humanities-arts': {
    title: '肯尼亚SDGs实景科研所',
    subtitle: 'Kenya SDGs Field Research Institute',
    description: '踏上非洲这片神奇的土地，探访联合国环境署，走进世界上最大的贫民窟基贝拉，感受非洲Safari的狂野与自然的壮美。通过实地调研完成SDGs相关科研产出，培养全球视野与社会责任感。',
    image: 'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-18/1776477322789-3.jpg?auth_key=dd35e235888bbe896508e8b4d1053df0eb5e4b092ae39f059993abf809b7d6ad',
    duration: '11天',
    location: '肯尼亚 · 内罗毕',
    participants: '12-15人',
    ageRange: '13岁以上',
    price: '¥43,800',
    departure: '2026年7月31日',
    pdfUrl: 'https://conversation.cdn.meoo.host/conversations/303390263236231168/file/2026-04-20/1776669242397-_3_0_肯尼亚内罗毕实境SDGs研学.pdf?auth_key=f4e8fd2671560b2b39566bf43a9c9cde416d3db4f1d5dad3f93b1dc75384001a',
    highlights: [
      '联合国环境署(UNEP)参访',
      '联合国人居署(UN-Habitat)参访',
      '基贝拉贫民窟实地调研与公益行动',
      '安博塞利国家公园Safari',
      '地狱之门国家公园骑行探索',
      '肯尼亚咖啡与茶文化体验',
      'SDGs科研论文指导与产出',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: '行程出发肯尼亚内罗毕',
        content: '学员自香港国际机场出发，飞往肯尼亚内罗毕；8月1日凌晨抵达内罗毕乔莫·肯雅塔国际机场（JKIA）。内罗毕行程期间入住Holiday Inn Nairobi Two Rivers Mall，酒店融合现代设计与非洲文化元素，坐落于内罗毕Two Rivers Mall高端商业区内，安保配套完整，环境安全便利，配套完善，为项目提供舒适稳定的住宿基础。住宿为现代化宽敞双人间，设施齐全，舒适安静；部分客房可俯瞰城市和森林景观；每日提供自助早餐；直连Two Rivers Mall，购物、餐饮与娱乐一应俱全；酒店还设有室外泳池与健身房，适合放松调整时差。',
        location: '内罗毕'
      },
      {
        day: 'Day 2',
        title: '走进联合国内罗毕总部',
        content: '学员将于下午前往位于内罗毕的United Nations Office at Nairobi (UNON)，参加由官方安排的Guided Tour，重点参访：United Nations Environment Programme（UNEP）和United Nations Human Settlements Programme（UN-Habitat）。作为联合国唯一设立在全球南方的发展中国家的总部，内罗毕联合国总部不仅承载着环境治理与城市发展的核心职能，也直接回应着全球南方在可持续发展中的现实挑战。',
        location: '内罗毕'
      },
      {
        day: 'Day 3',
        title: '《走出非洲》文学与历史理解',
        content: '上午参访凯伦·布里克森博物馆，从个人生活与文学书写出发，理解肯尼亚殖民历史及其对非洲形象建构的影响，引导学员反思文化叙事、权力结构与历史记忆之间的关系。随后前往长颈鹿公园Giraffe Centre，近距离了解当地野生动物保护实践。下午前往内罗毕国家博物馆，系统了解肯尼亚的人类起源、自然生态、族群文化与独立历程，为理解当代肯尼亚及全球南方在发展与身份认同上的现实挑战提供背景。',
        location: '内罗毕'
      },
      {
        day: 'Day 4',
        title: '内罗毕的创意、社区与发展挑战',
        content: '上午前往内罗毕当地艺术品市场，了解肯尼亚手工艺与当代艺术的创作背景，观察文化表达如何转化为社区生计与创意经济的一部分，并思考文化产业在全球南方发展中的现实意义。下午走进基贝拉社区，参访当地学校，与孩子们互动交流，在当地NGO协助下开展调研及基础资源派发。通过真实的社区接触，学员将更直观地理解城市贫困、教育资源不平等以及社区自组织在社会发展中的作用，培养尊重、同理与责任意识。',
        location: '内罗毕'
      },
      {
        day: 'Day 5',
        title: '肯尼亚的咖啡与茶文化',
        content: '上午前往肯尼亚咖啡庄园与咖啡工厂，系统了解咖啡从种植、采摘、处理到出口的完整产业流程，并认识咖啡产业在肯尼亚经济、社区生计与全球贸易体系中的重要角色，从生态与产业双重视角理解农业发展与可持续议题。下午前往Tigoni地区的Ravenswood农场，参访当地茶园，深入了解肯尼亚高地茶叶的种植环境与茶文化传统，在自然景观与农业实践中体会土地、气候与文化如何共同塑造地方产业与生活方式。',
        location: '内罗毕'
      },
      {
        day: 'Day 6',
        title: '自然保护与城市共生',
        content: '全天参访内罗毕国家公园，实地观察野生动物在自然栖息环境中的生存状态，了解这一国家公园如何在紧邻首都城市的背景下探索野生动物保护与城市扩张之间的平衡路径。作为全球少数位于首都城市边缘的国家公园之一，内罗毕国家公园集中呈现了生物多样性保护在现代城市发展进程中所面临的现实挑战。通过实地参访与引导式讲解，学员将进一步理解生态系统保护、社区利益、经济发展与公共政策之间的复杂关系，并思考自然保护在全球南方城市化背景下所承载的长期意义。',
        location: '内罗毕'
      },
      {
        day: 'Day 7',
        title: '自然保护与城市共生',
        content: '上午在地狱之门国家公园骑行探索。地狱之门是肯尼亚唯一允许步行或骑行进入的野生动物保护区，公园内几乎没有大型猛兽，学员将在骑行过程中近距离观察斑马、长颈鹿、羚羊、疣猪等食草类动物，并结合对火山地貌与东非大裂谷演化的讲解，理解地理环境如何塑造区域生态系统与生物多样性。下午前往纳瓦沙湖开展船游活动，观察河马、水鸟及湖泊湿地生态系统，通过实地体验进一步了解淡水资源、湿地保护与野生动物栖息地之间的关系，并思考自然保护、旅游活动与生态可持续之间的平衡。',
        location: '地狱之门 · 纳瓦沙湖'
      },
      {
        day: 'Day 8',
        title: '安博塞利的生态序章',
        content: '学员将从内罗毕出发前往安博塞利国家公园，沿途观察地貌、聚落与生计方式的变化，建立对水源分布、野生动物迁徙路径与栖息地形成的初步理解。抵达后入住Kibo Safari Camp，傍晚在专业向导带领下开启首场safari drive，在乞力马扎罗山背景下观赏大象种群。Kibo Safari Camp是一处坐落于乞力马扎罗山脚下、毗邻安博塞利国家公园的高端野奢营地，以独立套房式帐篷、完善公共空间与专业接待体系，将精致舒适与原野自然融为一体，提供静谧而沉浸的非洲草原体验。',
        location: '安博塞利'
      },
      {
        day: 'Day 9',
        title: '安博塞利湿地系统 & 捕食链观察',
        content: '安博塞利国家公园位于肯尼亚南部、坦桑尼亚边境附近，以直面乞力马扎罗山的壮阔景观而闻名。公园地处半干旱草原地带，却因地下水补给与季节性湿地的存在，形成了独特而脆弱的生态系统，为大量野生动物提供关键栖息地。这里拥有非洲最具代表性、研究最为深入的大象种群之一，同时也是长颈鹿、角马、斑马及多种捕食者的重要活动区域。行程以轻松的观赏型safari为主，学员在专业向导带领下进入公园核心区域，沿湿地与草原交汇地带进行safari drive，近距离观赏以大象为代表的大型草食动物，以及长颈鹿、角马、斑马等常见物种，在乞力马扎罗山背景下感受安博塞利最具代表性的自然景观。',
        location: '安博塞利'
      },
      {
        day: 'Day 10',
        title: '乞力马扎罗下的象群 & 返回内罗毕',
        content: '安博塞利的生态价值不仅体现在物种多样性上，更体现在水源、迁徙路径与人类活动之间的动态平衡。乞力马扎罗山冰川融水经地下渗流形成的湿地系统，是公园生命网络的核心，也使安博塞利成为研究气候变化、土地利用与野生动物保护之间关系的典型案例。在国家公园边界之外，当地社区的放牧、生计与保护实践相互交织，使这里成为理解全球南方自然保护现实复杂性的关键现场。第二天通过清晨黄金时段的safari drive，学员有机会观察到不同时间段动物的活动状态，包括清晨取食、迁移以及傍晚返回水源区域的过程，同时也更容易遇到狮子、鬣狗等捕食者，全面感受安博塞利丰富而生动的野生动物生态。',
        location: '安博塞利'
      },
      {
        day: 'Day 11',
        title: '结束行程返回国内',
        content: '项目进入返程阶段。团队根据航班时间安排早餐及退房，在工作人员陪同下统一前往机场，办理登机与行李托运手续。返程途中，学生将对本次肯尼亚研学旅程进行阶段性回顾与整理，项目团队全程协助，确保行程安全、有序完成。',
        location: '内罗毕 → 国内'
      }
    ],
    includes: [
      '国际往返机票',
      '肯尼亚境内交通',
      '全程四星级酒店双人间住宿',
      '每日三餐',
      '肯尼亚电子签证(ETA)',
      'Safari门票与导览',
      '联合国机构参访费用',
      '贫民窟调研与公益行动安排',
      '专业导师全程陪同',
      '科研论文指导',
      '境外研学保险',
      '项目手册与学习资料'
    ],
    gallery: [
      'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-18/1776477322789-3.jpg?auth_key=dd35e235888bbe896508e8b4d1053df0eb5e4b092ae39f059993abf809b7d6ad',
      'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-20/1776663224177-pexels-alex-ning-523843601-33650538.jpg?auth_key=d95a3ac086758fd29562d8a29e0e5b8cd291647cbb24ba256dd549830ddabd81',
      'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-20/1776663224179-pexels-entumoto-26921822.jpg?auth_key=d40ee241fa8c9e1284e049474ac5dff41e256ffdd8bb11906b694ebe360fe6eb',
      'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-20/1776663224178-pexels-harsha-kiriti-kopalley-119108649-29119781.jpg?auth_key=04e48f95d55e68a31e5b318d6b69438652484dd907d962969df932e92d0cf323',
      'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-20/1776663224181-pexels-mateo-arteaga-323524896-13819623.jpg?auth_key=feed41049f0bdbc389a2c6ec68ae9f809596b39264642b38233ea09b497754a2',
      'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-20/1776663224198-pexels-michael-burrows-7125425.jpg?auth_key=feb84254e91110e726cb5f701d366bec17e24ac5a00d29b5d47ab76776950240',
      'https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-20/1776663224185-pexels-twilightkenya-14510937.jpg?auth_key=f27ac544327e0f60d4484125b60d55f90bd4726c7550fd5a2cf0069a5874d9b5',
    ]
  }
};

function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const project = projectId ? projectsData[projectId as keyof typeof projectsData] : null;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = useCallback(() => {
    if (project) {
      setCurrentImageIndex((prev) => (prev === 0 ? project.gallery.length - 1 : prev - 1));
    }
  }, [project]);

  const goToNext = useCallback(() => {
    if (project) {
      setCurrentImageIndex((prev) => (prev === project.gallery.length - 1 ? 0 : prev + 1));
    }
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, goToPrevious, goToNext]);

  // Type assertion for pdfUrl
  const projectWithPdf = project as typeof project & { pdfUrl?: string };

  if (!project) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-stone-900 mb-4">项目未找到</h1>
          <button 
            onClick={() => navigate('/')}
            className="text-stone-600 hover:text-stone-900"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回首页</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-stone-500 text-sm tracking-widest uppercase mb-4">{project.subtitle}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-stone-900 mb-6">{project.title}</h1>
            <p className="text-lg text-stone-600 w-full leading-relaxed">{project.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Main Image */}
      <section className="relative mb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[21/9] rounded-2xl overflow-hidden"
          >
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm"
            >
              <Clock className="w-6 h-6 text-stone-600 mb-3" />
              <div className="text-stone-900 font-semibold text-lg">{project.duration}</div>
              <div className="text-stone-500 text-sm">行程时长</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm"
            >
              <MapPin className="w-6 h-6 text-stone-600 mb-3" />
              <div className="text-stone-900 font-semibold text-lg">{project.location}</div>
              <div className="text-stone-500 text-sm">目的地</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm"
            >
              <Users className="w-6 h-6 text-stone-600 mb-3" />
              <div className="text-stone-900 font-semibold text-lg">{project.ageRange}</div>
              <div className="text-stone-500 text-sm">适合年龄</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm"
            >
              <Calendar className="w-6 h-6 text-stone-600 mb-3" />
              <div className="text-stone-900 font-semibold text-lg">{project.departure}</div>
              <div className="text-stone-500 text-sm">出发时间</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-medium text-[#0e7cc5] mb-8 whitespace-nowrap">项目亮点</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white border border-stone-200 shadow-sm w-full"
                >
                  <CheckCircle2 className="w-5 h-5 text-stone-600 flex-shrink-0" />
                  <span className="text-stone-700 flex-grow">{highlight}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Itinerary */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-medium text-[#0e7cc5] mb-8 whitespace-nowrap">行程安排</h2>
            <div className="space-y-6">
              {project.itinerary.map((day, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 p-6 rounded-2xl bg-white border border-stone-200 shadow-sm"
                >
                  <div className="flex-shrink-0 w-20">
                    <span className="text-stone-600 font-medium">{day.day}</span>
                  </div>
                  <div className="flex-grow w-full">
                    <h3 className="text-stone-900 font-medium mb-2">{day.title}</h3>
                    <p className="text-stone-600 text-sm mb-2 w-full">{day.content}</p>
                    <div className="flex items-center gap-2 text-stone-400 text-xs">
                      <MapPin className="w-3 h-3" />
                      <span>{day.location}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's Included */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-medium text-[#0e7cc5] mb-8 whitespace-nowrap">费用包含</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.includes.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-xl bg-stone-100 w-full"
                >
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                    {index === 0 && <Plane className="w-4 h-4 text-stone-600" />}
                    {index === 1 && <Hotel className="w-4 h-4 text-stone-600" />}
                    {index === 2 && <Utensils className="w-4 h-4 text-stone-600" />}
                    {index === 3 && <GraduationCap className="w-4 h-4 text-stone-600" />}
                    {index === 4 && <Users className="w-4 h-4 text-stone-600" />}
                    {index === 5 && <Shield className="w-4 h-4 text-stone-600" />}
                    {(index >= 6 || index > 5) && <CheckCircle2 className="w-4 h-4 text-stone-600" />}
                  </div>
                  <span className="text-stone-700 text-sm flex-grow">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-medium text-[#0e7cc5] mb-8 whitespace-nowrap">精彩瞬间</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.gallery.slice(0, 3).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image}
                    alt={`${project.title} ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && project && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 text-white/80 hover:text-white transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-4 md:left-8 p-3 text-white/80 hover:text-white transition-colors z-10"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 md:right-8 p-3 text-white/80 hover:text-white transition-colors z-10"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={project.gallery[currentImageIndex]}
                alt={`${project.title} ${currentImageIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm">
              {currentImageIndex + 1} / {project.gallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-20 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 rounded-3xl bg-[#0e7cc5]"
          >
            <div>
              <h2 className="text-3xl font-medium text-white mb-2">准备好开启研学之旅了吗？</h2>
              <p className="text-white/80">名额有限，立即预约咨询</p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="text-left">
                <p className="text-white/70 text-sm mb-1">项目费用</p>
                <p className="text-3xl font-medium text-white">{project.price}<span className="text-lg text-white/70">/人</span></p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <p className="text-white/70 text-xs">查阅完整项目行程</p>
                <div className="flex items-center gap-3">
                  {projectWithPdf.pdfUrl && (
                    <a
                      href={projectWithPdf.pdfUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-white/20 text-white font-medium rounded-xl hover:bg-white/30 transition-colors flex items-center gap-2 whitespace-nowrap"
                    >
                      下载行程PDF
                    </a>
                  )}
                  <Link
                    to="/"
                    onClick={() => setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100)}
                    className="px-6 py-3 bg-white text-[#0e7cc5] font-medium rounded-xl hover:bg-white/90 transition-colors flex items-center gap-2 whitespace-nowrap"
                  >
                    立即咨询
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default ProjectDetail;
