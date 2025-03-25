import { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from "@/components/common/PageHeader";
import BlogList from "@/components/blog/BlogList";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { Search } from 'lucide-react';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [, setLocation] = useLocation();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Helmet>
        <title>Blog | GENCORE IT</title>
        <meta name="description" content="Read the latest industry insights, case studies, and IT trends from the GENCORE IT team." />
      </Helmet>
      
      <div className="pt-24 pb-20">
        <PageHeader 
          title="Our Blog" 
          description="Industry insights, case studies, and the latest IT trends."
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Search and Filter */}
          <div className="mb-12">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10 bg-[#1e2e4a] border-gray-700 text-white"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          
          {/* Featured Article */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">Featured Article</h2>
            <div className="bg-[#1e2e4a] rounded-xl overflow-hidden border border-gray-800 card-hover">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-64 md:h-auto overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800&h=400" 
                    alt="The Future of Cloud Computing in 2023" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-8">
                  <div className="text-sm text-[#FFA94D] mb-2">June 15, 2023</div>
                  <h3 className="text-2xl font-bold text-white mb-4">The Future of Cloud Computing in 2023</h3>
                  <p className="text-[#D1D5DB] mb-6">
                    Exploring the latest trends and innovations in cloud technology that will shape businesses in the coming year, including serverless architecture, edge computing, and multi-cloud strategies.
                  </p>
                  <div className="flex items-center">
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=72&h=72" 
                      alt="Nauman Ahmed" 
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <div className="text-white font-medium">Nauman Ahmed</div>
                      <div className="text-sm text-[#D1D5DB]">CEO & Founder</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* All Blog Posts */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">All Articles</h2>
            <BlogList searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
