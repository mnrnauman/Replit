import { BlogPost } from '@shared/schema';
import { formatDate, truncateString } from '@/lib/utils';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="bg-[#1e2e4a] rounded-xl overflow-hidden border border-gray-800 h-full card-hover"
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={post.imageUrl || "https://via.placeholder.com/800x400"} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
        <div className="text-sm text-[#FFA94D] mb-2">{formatDate(post.publishedAt)}</div>
        <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
        <p className="text-[#D1D5DB] mb-6 flex-grow">{truncateString(post.excerpt, 120)}</p>
        <div className="flex justify-between items-center mt-auto">
          <div className="text-sm text-[#D1D5DB]">By {post.author}</div>
          <Link href={`/blog/${post.slug}`}>
            <a className="text-[#FFA94D] hover:text-white flex items-center transition-colors duration-300">
              Read More
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
