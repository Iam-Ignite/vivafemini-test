'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui';
import { articlesService } from '@/services/api';
import { Article } from '@/types';
import Image from 'next/image';

// Default articles to show when API data is not available
const defaultArticles = [
  {
    _id: '1',
    title: '5 Ways to Reduce Stress During Your Cycle',
    imageUrl: '/Image/blog-1.png',
    slug: 'reduce-stress-during-cycle',
  },
  {
    _id: '2',
    title: 'Best Nutrition Tips for Better Energy',
    imageUrl: '/Image/blog-2.png',
    slug: 'nutrition-tips-better-energy',
  },
  {
    _id: '3',
    title: 'How Sleep Affects Hormonal Balance',
    imageUrl: '/Image/blog-3.png',
    slug: 'sleep-affects-hormonal-balance',
  },
];

export function RecommendedArticles() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await articlesService.getAll(3);
        if (response.data && response.data.length > 0) {
          setArticles(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    };
    fetchArticles();
  }, []);

  // Use default articles if no articles loaded from API
  const displayArticles = articles.length > 0 ? articles : defaultArticles;

  return (
    <div className='bg-[#F3F4F6] p-4 rounded-xl'>
      <h3 className="text-primary font-semibold mb-4">Recommended for You</h3>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 ">
        {displayArticles.map((article) => (
          <Card key={article._id} className="group cursor-pointer p-3 rounded-lg">
            <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
              <Image
                src={article.imageUrl || '/Image/blog-1.png'}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
                unoptimized
              />
            </div>
            <h4 className="font-medium text-gray-900 text-xs lg:text-sm line-clamp-2 mb-1">
              {article.title}
            </h4>
            <button className="text-primary text-xs lg:text-sm font-medium hover:underline">
              Read more →
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
