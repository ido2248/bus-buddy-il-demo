import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bus, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface BusLineCardProps {
  lineNumber: string;
  destination: string;
  arrivalTime: number; // minutes
  status: "on-time" | "delayed" | "cancelled";
  stopName: string;
}

const BusLineCard = ({ lineNumber, destination, arrivalTime, status, stopName }: BusLineCardProps) => {
  const getStatusBadge = () => {
    switch (status) {
      case "on-time":
        return <Badge className="bg-success text-success-foreground">בזמן</Badge>;
      case "delayed":
        return <Badge className="bg-warning text-warning-foreground">מעוכב</Badge>;
      case "cancelled":
        return <Badge className="bg-destructive text-destructive-foreground">בוטל</Badge>;
    }
  };

  const getArrivalTimeColor = () => {
    if (status === "cancelled") return "text-destructive";
    if (arrivalTime <= 2) return "text-accent";
    if (arrivalTime <= 5) return "text-warning";
    return "text-success";
  };

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="p-6" dir="rtl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="bg-primary text-primary-foreground rounded-lg p-3 min-w-[60px] text-center">
              <Bus className="h-6 w-6 mx-auto mb-1" />
              <div className="text-xl font-bold">{lineNumber}</div>
            </div>
            
            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-semibold text-foreground">{destination}</h3>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{stopName}</span>
              </div>
              
              <div className="flex items-center gap-3 flex-wrap">
                {getStatusBadge()}
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className={cn("text-base font-semibold", getArrivalTimeColor())}>
                    {status === "cancelled" ? "בוטל" : `${arrivalTime} דקות`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusLineCard;
