import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Helmet } from "react-helmet";

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | GENCORE IT</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>
      
      <div className="min-h-screen w-full flex items-center justify-center bg-[#162237] py-20">
        <Card className="w-full max-w-md mx-4 bg-[#1e2e4a] border border-gray-800 text-[#D1D5DB]">
          <CardContent className="pt-10 pb-8 px-8">
            <div className="flex flex-col items-center mb-6 text-center">
              <AlertCircle className="h-16 w-16 text-[#FFA94D] mb-4" />
              <h1 className="text-3xl font-bold text-white mb-2">404 Page Not Found</h1>
              <p className="text-[#D1D5DB]">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            <div className="flex flex-col space-y-4">
              <Link href="/">
                <Button className="w-full gradient-cta">
                  Return to Home
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="w-full border-[#3B82F6] hover:bg-[#3B82F6]/10">
                  Contact Support
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
