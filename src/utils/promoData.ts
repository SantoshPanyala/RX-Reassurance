/**
 * Promotional poster data - placeholder for designer-provided images
 * 
 * This is a container system for visual posters, not coded ads.
 * Designers will upload poster images later.
 * 
 * In production, this would come from a CMS or asset management system.
 */

export interface PromoPoster {
  imageSrc: string;
  imageAlt: string;
  caption?: string;
  ctaText?: string;
}

/**
 * Placeholder promotional posters
 * 
 * These are example placeholders. In production:
 * - Images would be hosted assets
 * - Content would be managed by marketing team
 * - Rotation logic would be handled by a service
 */
export const promoPosters: PromoPoster[] = [
  {
    imageSrc: 'https://via.placeholder.com/800x400/E4EBF8/235BC5?text=Free+Delivery+Available',
    imageAlt: 'Free delivery promotion - Free delivery available for refill orders',
    caption: 'Have your medications delivered to your door at no extra cost.',
    ctaText: 'Learn more',
  },
  {
    imageSrc: 'https://via.placeholder.com/800x400/E8F5E9/4CAF50?text=New+Patient+Discount',
    imageAlt: 'New patient discount - Save on your first refill order',
    caption: 'Welcome savings available for new patients.',
    ctaText: 'View offer',
  },
  {
    imageSrc: 'https://via.placeholder.com/800x400/FFF3E0/FF9800?text=Immunization+Services',
    imageAlt: 'Immunization services - Schedule your flu shot and other immunizations',
    caption: 'Schedule your flu shot and other immunizations with our pharmacy.',
    ctaText: 'Schedule now',
  },
];

/**
 * Get a promotional poster (simple rotation for demo)
 * 
 * In production, this would be handled by:
 * - CMS rotation rules
 * - A/B testing service
 * - User preference tracking
 */
export function getPromoPoster(): PromoPoster {
  // Simple rotation based on day of week for demo
  const dayOfWeek = new Date().getDay();
  return promoPosters[dayOfWeek % promoPosters.length];
}
