import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

const PageHeader = ({ title, description, className }: PageHeaderProps) => {
  return (
    <div className={cn("bg-[#1e2e4a] py-16", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{title}</h1>
          {description && (
            <p className="text-xl text-[#D1D5DB] max-w-3xl mx-auto">
              {description}
            </p>
          )}
          <div className="w-20 h-1 bg-[#FFA94D] mx-auto mt-4 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
