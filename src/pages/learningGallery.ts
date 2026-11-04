import type { Pair } from './homeContent';

type GalleryPhoto = { image: string; caption: Pair };

export const afsPhotos: GalleryPhoto[] = [
  { image: 'afs-assembly-01.jpg', caption: ['AFS 大会现场', 'At the AFS Youth Assembly'] },
  { image: 'afs-assembly-05.jpg', caption: ['学员参访世界卫生组织', 'Participants visiting the World Health Organization'] },
  { image: 'afs-assembly-07.jpg', caption: ['与不同背景的青年相遇', 'Meeting young people from different backgrounds'] },
  { image: 'afs-assembly-08.jpg', caption: ['跨文化交流与分享', 'Cross-cultural conversations'] },
  { image: 'afs-assembly-09.jpg', caption: ['记录共同的学习旅程', 'A shared learning journey'] },
  { image: 'afs-assembly-02.jpg', caption: ['聆听大会嘉宾分享', 'Listening to guest speakers at the assembly'] },
  { image: 'afs-assembly-03.jpg', caption: ['专题学习与现场讨论', 'Learning and discussion in the room'] },
  { image: 'afs-assembly-04.jpg', caption: ['走进国际议题讨论现场', 'Exploring international issues'] },
  { image: 'afs-assembly-06.jpg', caption: ['参与大会学习活动', 'Taking part in assembly sessions'] },
  { image: 'afs-assembly-10.jpg', caption: ['从现场拓展全球视野', 'Broadening perspectives through participation'] },
  { image: 'afs-assembly-11.jpg', caption: ['在对话中建立连接', 'Building connections through dialogue'] },
];

export const kenyaPhotos: GalleryPhoto[] = [
  { image: 'kenya-field-01.jpg', caption: ['肯尼亚社区交流现场', 'Community conversations in Kenya'] },
  { image: 'kenya-field-02.jpg', caption: ['在当地社区相遇', 'Meeting people in the local community'] },
  { image: 'kenya-field-03.jpg', caption: ['记录肯尼亚社区参访', 'A moment from a community visit in Kenya'] },
  { image: 'kenya-field-04.jpg', caption: ['走进当地文化与艺术', 'Exploring local culture and art'] },
  { image: 'kenya-field-05.jpg', caption: ['在茶园了解当地生活', 'Learning about local life at a tea plantation'] },
  { image: 'kenya-field-06.jpg', caption: ['与当地向导交流学习', 'Learning from a local guide'] },
  { image: 'kenya-field-07.jpg', caption: ['走进田野，观察与提问', 'Observing and asking questions in the field'] },
];

export const experiencePhotos: GalleryPhoto[] = [afsPhotos[0], afsPhotos[1], afsPhotos[2], kenyaPhotos[2], kenyaPhotos[4]];

export const learningGallery: GalleryPhoto[] = [
  ...afsPhotos,
  ...kenyaPhotos,
  { image: 'scene-18.jpg', caption: ['走近国际事务', 'Discover global affairs'] },
  { image: 'scene-19.jpg', caption: ['表达与分享', 'Present and share'] },
  { image: 'scene-22.jpg', caption: ['讨论与协作', 'Discuss and collaborate'] },
  { image: 'scene-21.jpg', caption: ['连接不同背景', 'Connect across backgrounds'] },
  { image: 'scene-24.jpg', caption: ['交流中的学习', 'Learn through conversation'] },
  { image: 'scene-20.jpg', caption: ['共同完成旅程', 'Complete the journey together'] },
];
