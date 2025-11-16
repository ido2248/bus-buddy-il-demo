import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Briefcase, ShoppingCart, Plus, Edit, Check, X } from "lucide-react";

type Route = {
  id: number;
  name: string;
  icon: typeof Home;
  from: string;
  to: string;
};

const FavoriteRoutes = () => {
  const [routes, setRoutes] = useState<Route[]>([
    {
      id: 1,
      name: "דרך לעבודה",
      icon: Briefcase,
      from: "רחוב הרצל 25, תל אביב",
      to: "פארק הייטק, הרצליה",
    },
    {
      id: 2,
      name: "דרך הביתה",
      icon: Home,
      from: "פארק הייטק, הרצליה",
      to: "רחוב הרצל 25, תל אביב",
    },
    {
      id: 3,
      name: "קניות",
      icon: ShoppingCart,
      from: "רחוב הרצל 25, תל אביב",
      to: "קניון דיזנגוף, תל אביב",
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  // Helper function to get display text (text before first comma)
  const getDisplayText = (text: string): string => {
    const commaIndex = text.indexOf(',');
    return commaIndex >= 0 ? text.substring(0, commaIndex).trim() : text.trim();
  };

  const handleClick = (route: Route) => {
    // Route click handler - functionality removed per main branch
    if (editingId !== route.id) {
      // Single click behavior can be implemented here if needed
    }
  };

  const handleEditClick = (route: Route, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(route.id);
    setEditValue(route.to);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, routeId: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave(routeId);
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleSave = (routeId: number) => {
    setRoutes((prevRoutes) =>
      prevRoutes.map((route) =>
        route.id === routeId ? { ...route, to: editValue.trim() } : route
      )
    );
    setEditingId(null);
    setEditValue("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue("");
  };

  return (
    <Card dir="rtl">
      <CardHeader>
        <CardTitle className="text-xl">מסלולים מועדפים</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {routes.map((route) => {
          const Icon = route.icon;
          const isEditing = editingId === route.id;
          
          return (
            <div key={route.id} className="relative">
              {!isEditing ? (
                <Button
                  variant="outline"
                  className="w-full h-auto py-4 px-4 justify-start hover:bg-secondary transition-colors overflow-hidden"
                  onClick={() => handleClick(route)}
                >
                  <div className="flex items-start gap-3 w-full min-w-0">
                    <div className="bg-primary/10 rounded-lg p-2 mt-0.5 flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 text-right space-y-1 min-w-0">
                      <div className="font-semibold text-base break-words">{route.name}</div>
                      <div className="text-sm text-muted-foreground break-words whitespace-normal">
                        {getDisplayText(route.to)}
                      </div>
                    </div>
                  </div>
                </Button>
              ) : (
                <div className="w-full h-auto py-4 px-4 border border-input bg-background rounded-md">
                  <div className="flex items-start gap-3 w-full min-w-0">
                    <div className="bg-primary/10 rounded-lg p-2 mt-0.5 flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 text-right space-y-1 min-w-0">
                      <div className="font-semibold text-base break-words">{route.name}</div>
                      <div className="relative w-full">
                        <div className="flex items-center gap-2 w-full">
                          <div className="relative flex-1">
                            <Input
                              value={editValue}
                              onChange={(e) => {
                                setEditValue(e.target.value);
                              }}
                              onKeyDown={(e) => handleKeyDown(e, route.id)}
                              onClick={(e) => e.stopPropagation()}
                              className="text-sm h-8 mt-1 flex-1 pr-2"
                              dir="rtl"
                              autoFocus
                            />
                          </div>
                          <div className="flex gap-1 mt-1">
                            <Button
                              variant="ghost"
                              size="icon" 
                              className="h-8 w-8 hover:bg-green-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSave(route.id);
                              }}
                              title="שמור"
                              type="button"
                            >
                              <Check className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-red-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCancel();
                              }}
                              title="בטל"
                              type="button"
                            >
                              <X className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {!isEditing && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-secondary"
                  onClick={(e) => handleEditClick(route, e)}
                  title="ערוך"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
          );
        })}
        
        <Button variant="outline" className="w-full h-12 text-base border-dashed">
          <Plus className="h-5 w-5 ml-2" />
          הוסף מסלול חדש
        </Button>
      </CardContent>
    </Card>
  );
};

export default FavoriteRoutes;
