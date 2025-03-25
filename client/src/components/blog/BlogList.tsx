import { useQuery } from '@tanstack/react-query';
import { BlogPost } from '@shared/schema';
import BlogCard from './BlogCard';
import { Loader2 } from 'lucide-react';

interface BlogListProps {
  searchQuery?: string;
}

const BlogList = ({ searchQuery = '' }: BlogListProps) => {
  const { data: posts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
    staleTime: 60 * 1000, // 1 minute
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 text-[#FFA94D] animate-spin" />
        <span className="ml-2 text-white">Loading articles...</span>
      </div>
    );
  }

  if (error || !posts) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">Failed to load articles. Please try again later.</p>
      </div>
    );
  }

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#D1D5DB]">No articles match your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredPosts.map(post => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;
