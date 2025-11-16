import { useCallback, useMemo, useState } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import FavoriteRoutes from "@/components/FavoriteRoutes";
import RouteCard, { TravelRoute } from "@/components/RouteCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bell, Loader2, AlertCircle } from "lucide-react";

const Index = () => {
  const [routes, setRoutes] = useState<TravelRoute[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [estimatedArrivalGap, setEstimatedArrivalGap] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(
    async ({ searchText }: { searchText: string }) => {
      const trimmedQuery = searchText.trim();
      if (!trimmedQuery) {
        setError("אנא הזן יעד לחיפוש.");
        return;
      }

      setIsLoading(true);
      setError(null);

      // Backend removed - no longer fetching routes
      setRoutes([]);
      setSelectedDestination(trimmedQuery);
      setEstimatedArrivalGap(null);
      setIsLoading(false);
    },
    [],
  );

  const headerDestination = useMemo(() => {
    return selectedDestination || "מערכת מעקב תחבורה ציבורית";
  }, [selectedDestination]);

  return (
    <div className="min-h-screen bg-background">
      <Header destinationName={selectedDestination ?? undefined} estimatedArrivalGap={estimatedArrivalGap ?? undefined} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero Search Section */}
          <div className="bg-gradient-to-br from-primary via-primary-hover to-primary rounded-2xl p-8 shadow-xl text-primary-foreground">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold" dir="rtl">מתי האוטובוס שלי מגיע?</h2>
                <p className="text-primary-foreground/90" dir="rtl">חפש קו אוטובוס או תחנה לקבלת מידע בזמן אמת</p>
              </div>
              <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Left Column - Favorite Routes */}
            <div className="md:col-span-1">
              <FavoriteRoutes />
            </div>

            {/* Right Column - Results */}
            <div className="md:col-span-2 space-y-4">
              <Card dir="rtl">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    {routes.length > 0
                      ? `מסלולי נסיעה עבור ${headerDestination}`
                      : "אוטובוסים בקרבתך"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {isLoading && (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  )}

                  {!isLoading && routes.length === 0 && !error && (
                    <p className="text-center text-muted-foreground py-8">
                      בחר יעד כדי להציג מסלולי נסיעה זמינים.
                    </p>
                  )}

                  {!isLoading &&
                    routes.map((route, index) => (
                      <RouteCard
                        key={`${route.name ?? route.name_bus_route ?? "route"}-${index}`}
                        route={route}
                      />
                    ))}
                </CardContent>
              </Card>

              {error && (
                <Alert variant="destructive" dir="rtl">
                  <AlertCircle className="h-5 w-5" />
                  <AlertTitle>שגיאה בטעינת הנתונים</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="bg-info/10 border border-info/20 rounded-lg p-4" dir="rtl">
                <div className="flex gap-3">
                  <Bell className="h-5 w-5 text-info flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-info mb-1">שים לב</p>
                    <p className="text-sm text-muted-foreground">
                      המידע מתעדכן כל 30 שניות. לחץ על מסלול כדי להציג את פרטי הנסיעה המלאים.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
