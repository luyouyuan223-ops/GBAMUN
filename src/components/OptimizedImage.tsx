import React from 'react';
import images from '../media/images.json';

type ImageData = { width: number; height: number; variants: { src: string; width: number }[] };
const manifest: Record<string, ImageData> = images;
type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> & { name: string };

export default function OptimizedImage({ name, sizes = '(max-width: 600px) 100vw, (max-width: 900px) 50vw, 45vw', ...props }: Props) {
  const image = manifest[name];
  if (!image) return <img {...props} src={`/media/${name}`} />;
  return <picture className="optimized-picture">
    <source type="image/webp" srcSet={image.variants.map(v => `${v.src} ${v.width}w`).join(', ')} sizes={sizes} />
    <img decoding="async" width={image.width} height={image.height} {...props} src={`/media/${name}`} />
  </picture>;
}
