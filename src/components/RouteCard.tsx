import { useState, useMemo } from "react";
import { Bus, Clock, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface TravelRouteSegment {
  label: string;
  code?: string | number;
}

export interface TravelRoute {
  name?: string;
  name_bus_route?: string | number;
  sourceNode?: "return 1 bus path" | "return 2 bus path" | "direct"; // Add this to track source
  lineNumber?: string | number; // Add this for the correct line number to display
  min_befor_firstBus_arrive?: string | number;
  time_gap_hhmmss?: string;
  date_to_stop4?: string | null;
  walking_time1?: string | number;
  bus_stop_ride1?: string;
  bus_stop_code1?: string | number;
  bus_name1?: string;
  bus_stop_exit1?: string;
  bus_stop_code2?: string | number;
  walking_time2?: string | number;
  bus_stop_ride2?: string;
  bus_stop_code3?: string | number;
  bus_name2?: string;
  bus_stop_exit2?: string;
  bus_stop_code4?: string | number;
  walking_time3?: string | number;
  [key: string]: unknown;
}

const formatMinutes = (value?: string | number) => {
  if (value === null || value === undefined) return "";
  if (typeof value === "number") {
    return value <= 0 ? "עכשיו" : `${value} דקות`;
  }

  const numericValue = Number(value);
  if (!Number.isNaN(numericValue)) {
    return numericValue <= 0 ? "עכשיו" : `${numericValue} דקות`;
  }

  return value;
};

const normalizeStepValue = (value?: string | number) => {
  if (value === null || value === undefined) return "";
  return typeof value === "string" ? value : String(value);
};

const shouldDisplayWalking = (value?: string | number) => {
  if (value === null || value === undefined) return false;
  if (typeof value === "number") {
    return value > 0;
  }

  const numericValue = Number(value);
  if (!Number.isNaN(numericValue)) {
    return numericValue > 0;
  }

  return Boolean(value);
};

interface RouteCardProps {
  route: TravelRoute;
}
const asStringFromStringOrNumber = (value: unknown): string | undefined => {
  if (value === null || value === undefined) return undefined;
  if (typeof value === "string" && value.trim()) return value;
  if (typeof value === "number") return String(value);
  return undefined;
};

const RouteCard = ({ route }: RouteCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const steps = useMemo(() => {
    const ordered: TravelRouteSegment[] = [];
     
    // console.log("Route object in steps:", route);

    // walking_time1 (if value is not 0)
    if (shouldDisplayWalking(route.walking_time1)) {
      ordered.push({ label: `זמן הליכה: ${normalizeStepValue(route.walking_time1)}` });
    }

    // bus_stop_ride1 with bus_stop_code1
    if (route.bus_stop_ride1 || route.bus_stop_ride1 === "") {
      const stopName = normalizeStepValue(route.bus_stop_ride1);
      const stopCode = normalizeStepValue(route.bus_stop_code1);
      console.log(stopCode)
      if (stopName) {
        const codeDisplay = stopCode && stopCode.trim() !== "" ? ` (מספר תחנה: ${stopCode})` : "";
        ordered.push({ label: `שם תחנה: ${stopName}${codeDisplay}` });
      }
    }

    // bus_name1
    if (route.bus_name1 || route.bus_name1 === "") {
      const value = normalizeStepValue(route.bus_name1);
      if (value) {
        ordered.push({ label: `שם אוטובוס: ${value}` });
      }
    }

    // Check if bus_stop_exit1 and bus_stop_ride2 are the same
    const ride2EqualsExit1 =
      route.bus_stop_ride2 && route.bus_stop_exit1 && route.bus_stop_ride2 === route.bus_stop_exit1;

    // console.log("ride2EqualsExit1:", ride2EqualsExit1, "bus_stop_ride2:", route.bus_stop_ride2, "bus_stop_exit1:", route.bus_stop_exit1);

    if (ride2EqualsExit1) {
      // If they are the same: display bus_stop_ride2 with bus_stop_code2
      if (route.bus_stop_ride2 || route.bus_stop_ride2 === "") {
        const stopName = normalizeStepValue(route.bus_stop_ride2);
        const stopCode = normalizeStepValue(route.bus_stop_code2);
        if (stopName) {
          const codeDisplay = stopCode && stopCode.trim() !== "" ? ` (מספר תחנה: ${stopCode})` : "";
          ordered.push({ label: `שם תחנה: ${stopName}${codeDisplay}` });
        }
      }
      if (route.bus_name2 || route.bus_name2 === "") {
        const value = normalizeStepValue(route.bus_name2);
        if (value) {
          ordered.push({ label: `שם אוטובוס: ${value}` });
        }
      }
      if (route.bus_stop_exit2 || route.bus_stop_exit2 === "") {
        const stopName = normalizeStepValue(route.bus_stop_exit2);
        const stopCode = normalizeStepValue(route.bus_stop_code4);
        if (stopName) {
          const codeDisplay = stopCode && stopCode.trim() !== "" ? ` (מספר תחנה: ${stopCode})` : "";
          ordered.push({ label: `שם תחנה: ${stopName}${codeDisplay}` });
        }
      }
      if (shouldDisplayWalking(route.walking_time3)) {
        ordered.push({ label: `זמן הליכה: ${normalizeStepValue(route.walking_time3)}` });
      }
    } else {
      // If they are NOT the same: display bus_stop_exit1 with bus_stop_code2, walking_time2 (if not 0), bus_stop_ride2 with bus_stop_code3, bus_name2, bus_stop_exit2 with bus_stop_code4, walking_time3 (if not 0)
      if (route.bus_stop_exit1 || route.bus_stop_exit1 === "") {
        const stopName = normalizeStepValue(route.bus_stop_exit1);
        const stopCode = normalizeStepValue(route.bus_stop_code2);
        if (stopName) {
          const codeDisplay = stopCode && stopCode.trim() !== "" ? ` (מספר תחנה: ${stopCode})` : "";
          ordered.push({ label: `שם תחנה: ${stopName}${codeDisplay}` });
        }
      }
      if (shouldDisplayWalking(route.walking_time2)) {
        ordered.push({ label: `זמן הליכה: ${normalizeStepValue(route.walking_time2)}` });
      }
      if (route.bus_stop_ride2 || route.bus_stop_ride2 === "") {
        const stopName = normalizeStepValue(route.bus_stop_ride2);
        const stopCode = normalizeStepValue(route.bus_stop_code3);
        if (stopName) {
          const codeDisplay = stopCode && stopCode.trim() !== "" ? ` (מספר תחנה: ${stopCode})` : "";
          ordered.push({ label: `שם תחנה: ${stopName}${codeDisplay}` });
        }
      }
      if (route.bus_name2 || route.bus_name2 === "") {
        const value = normalizeStepValue(route.bus_name2);
        if (value) {
          ordered.push({ label: `שם אוטובוס: ${value}` });
        }
      }
      if (route.bus_stop_exit2 || route.bus_stop_exit2 === "") {
        const stopName = normalizeStepValue(route.bus_stop_exit2);
        const stopCode = normalizeStepValue(route.bus_stop_code4);
        if (stopName) {
          const codeDisplay = stopCode && stopCode.trim() !== "" ? ` (מספר תחנה: ${stopCode})` : "";
          ordered.push({ label: `שם תחנה: ${stopName}${codeDisplay}` });
        }
      }
      if (shouldDisplayWalking(route.walking_time3)) {
        ordered.push({ label: `זמן הליכה: ${normalizeStepValue(route.walking_time3)}` });
      }
    }

    // console.log("Final steps array:", ordered);
    return ordered;
  }, [route]);
  // console.log(steps)

  const displayLineNumber = useMemo(() => {
    return normalizeStepValue(route.name_bus_route);
  }, [route.name_bus_route]);

  return (
    <Card
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => setIsOpen((prev) => !prev)}
      role="button"
      aria-expanded={isOpen}
    >
      <CardContent className="p-6" dir="rtl">
        <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="bg-primary text-primary-foreground rounded-lg p-3 min-w-[60px] text-center">
                <Bus className="h-6 w-6 mx-auto mb-1" />
                <div className="text-xl font-bold">
                  {displayLineNumber || "-"}
                </div>
                {route.sourceNode && route.sourceNode !== "direct" && (
                  <div className="text-[10px] mt-1 uppercase tracking-wide text-primary-foreground/70">
                    {route.sourceNode === "return 2 bus path" ? "NODE 2" : "NODE 1"}
                  </div>
                )}
              </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {normalizeStepValue(route.name) || "שם היעד לא זמין"}
                </h3>
                <ChevronDown
                  className={cn("h-5 w-5 transition-transform", isOpen ? "rotate-180" : "")}
                  aria-hidden="true"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-base font-semibold text-accent">
                  {formatMinutes(route.min_befor_firstBus_arrive)}
                </span>
              </div>
            </div>
          </div>
        </div>
        {isOpen && steps.length > 0 && (
          <div className="mt-4 border-t pt-4 space-y-2 text-sm">
            {steps.map((step, index) => (
              <div key={`${step.label}-${index}`} className="bg-muted/50 rounded-md p-3">
                <span className="font-medium text-foreground">{step.label}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RouteCard;
