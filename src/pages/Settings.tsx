import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Settings</h2>
        <p className="mt-1 text-muted-foreground">Manage your integrations and preferences</p>
      </div>

      <Card className="bg-gradient-card p-8 shadow-card">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="rounded-full bg-gradient-primary p-6">
            <SettingsIcon className="h-12 w-12 text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-foreground">Backend Integration Required</h3>
          <p className="max-w-md text-muted-foreground">
            To connect your website, Meta Ads, and Google Ads accounts, you'll need to set up backend
            services with API integrations.
          </p>
          <Button className="mt-4 bg-gradient-primary hover:opacity-90">
            Connect Lovable Cloud
          </Button>
        </div>
      </Card>
    </div>
  );
}
