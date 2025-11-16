import { Bus } from "lucide-react";

interface HeaderProps {
  destinationName?: string | null;
  estimatedArrivalGap?: string | null;
}

const Header = ({ destinationName, estimatedArrivalGap }: HeaderProps) => {
  const hasDestination = Boolean(destinationName);

  return (
    <header className="bg-primary text-primary-foreground shadow-lg" dir="rtl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/RoadBudy.jpg" 
              alt="Road Buddy Logo" 
              className="h-12 w-auto rounded-lg object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold">
                Road Buddy
              </h1>
              <p className="text-sm text-primary-foreground/80">
                מערכת מעקב תחבורה ציבורית
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
