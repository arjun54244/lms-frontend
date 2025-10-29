import { Card } from "@/components/ui/card";
import { mockLeads } from "@/data/mockLeads";
import { BarChart3, TrendingUp, Users, Target } from "lucide-react";

export default function Analytics() {
  const totalLeads = mockLeads.length;
  const newLeads = mockLeads.filter((l) => l.status === "new").length;
  const convertedLeads = mockLeads.filter((l) => l.status === "converted").length;
  const conversionRate = ((convertedLeads / totalLeads) * 100).toFixed(1);

  const sourceBreakdown = {
    website: mockLeads.filter((l) => l.source === "website").length,
    facebook: mockLeads.filter((l) => l.source === "facebook").length,
    instagram: mockLeads.filter((l) => l.source === "instagram").length,
    google: mockLeads.filter((l) => l.source === "google").length,
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Analytics</h2>
        <p className="mt-1 text-muted-foreground">
          Comprehensive insights into your lead generation performance
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-card p-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-gradient-primary p-3">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Leads</p>
              <p className="text-2xl font-bold text-foreground">{totalLeads}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card p-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-gradient-primary p-3">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">New Leads</p>
              <p className="text-2xl font-bold text-foreground">{newLeads}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card p-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-gradient-primary p-3">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Converted</p>
              <p className="text-2xl font-bold text-foreground">{convertedLeads}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card p-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-gradient-primary p-3">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              <p className="text-2xl font-bold text-foreground">{conversionRate}%</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-gradient-card p-6 shadow-card">
        <h3 className="mb-6 text-xl font-semibold text-foreground">Lead Source Distribution</h3>
        <div className="space-y-4">
          {Object.entries(sourceBreakdown).map(([source, count]) => {
            const percentage = ((count / totalLeads) * 100).toFixed(1);
            return (
              <div key={source}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium capitalize text-foreground">{source}</span>
                  <span className="text-sm text-muted-foreground">
                    {count} leads ({percentage}%)
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-gradient-primary transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
