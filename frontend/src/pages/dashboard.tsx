import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/api";
import { useEffect, useState } from "react";
import { Analytics } from "@interfaces";
import { useToast } from "@/hooks/use-toast";

export function Dashboard() {
  const [analytics, setAnalytics] = useState<Analytics>({
    todaySales: 0,
    lastMonthSales: 0,
    lastSixMonthsSales: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    const getAnalytics = async () => {
      const { success, data, errorMessage } =
        await api.analytics.getAnalytics();
      if (!success) {
        toast({
          variant: "destructive",
          title: errorMessage as string,
        });
        return;
      }
      setAnalytics(data as Analytics);
    };
    getAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(analytics);

  return (
    <>
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Sales Summary Cards */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {analytics.todaySales.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Last Week Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {analytics.lastMonthSales.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Last Month Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {analytics.lastSixMonthsSales.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
