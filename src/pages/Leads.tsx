import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { LeadsTable } from "@/components/leads/LeadsTable";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Lead, LeadSource } from "@/types/lead";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSocket } from "@/lib/socket";
import { discoverApiBase } from "@/lib/api";

type BackendLead = {
  id: number;
  name: string;
  email: string;
  contact: string;
  source: "Website" | "Meta" | "Google";
  campaign?: string | null;
  service?: string | null;
  status: "New" | "Contacted" | "Qualified" | "Converted" | "Lost";
  created_at: string;
};

function adaptLead(b: BackendLead): Lead {
  const sourceMap: Record<string, LeadSource> = {
    Website: "website",
    Meta: "facebook", // Map Meta to facebook for UI consistency
    Google: "google",
  };
  const statusMap: Record<string, Lead["status"]> = {
    New: "new",
    Contacted: "contacted",
    Qualified: "qualified",
    Converted: "converted",
    Lost: "lost",
  };
  return {
    id: String(b.id),
    name: b.name,
    email: b.email,
    phone: b.contact,
    source: sourceMap[b.source] ?? "website",
    service: b.service ?? undefined,
    campaign: b.campaign ?? undefined,
    createdAt: new Date(b.created_at),
    status: statusMap[b.status] ?? "new",
  };
}

async function fetchLeads(): Promise<Lead[]> {
  const apiBase = await discoverApiBase();
  const res = await fetch(`${apiBase}/leads?limit=100`);
  if (!res.ok) throw new Error("Failed to fetch leads");
  const json = await res.json();
  const items: BackendLead[] = json.data?.leads ?? [];
  return items.map(adaptLead);
}

export default function Leads() {
  const { source } = useParams<{ source?: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();
  const socketRef = useRef<ReturnType<typeof getSocket> | null>(null);

  const { data: leads = [] } = useQuery({
    queryKey: ["leads"],
    queryFn: fetchLeads,
    staleTime: 10_000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const socket = getSocket();
    socketRef.current = socket;
    socket.emit("join-dashboard");

    const onNew = (payload: any) => {
      queryClient.setQueryData<Lead[]>(["leads"], (prev = []) => {
        const incoming = adaptLead(payload.data);
        // avoid duplicates
        if (prev.some((l) => l.id === incoming.id)) return prev;
        return [incoming, ...prev];
      });
    };
    const onUpdated = (payload: any) => {
      queryClient.setQueryData<Lead[]>(["leads"], (prev = []) =>
        prev.map((l) => (l.id === String(payload.data.id) ? adaptLead(payload.data) : l))
      );
    };
    const onDeleted = (payload: any) => {
      queryClient.setQueryData<Lead[]>(["leads"], (prev = []) =>
        prev.filter((l) => l.id !== String(payload.data.id))
      );
    };

    socket.on("new-lead", onNew);
    socket.on("lead-updated", onUpdated);
    socket.on("lead-deleted", onDeleted);

    return () => {
      socket.off("new-lead", onNew);
      socket.off("lead-updated", onUpdated);
      socket.off("lead-deleted", onDeleted);
    };
  }, [queryClient]);

  const filteredLeads = useMemo(() => leads.filter((lead) => {
    const matchesSource = !source || lead.source === source;
    const matchesSearch =
      !searchQuery ||
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSource && matchesSearch;
  }), [leads, searchQuery, source]);

  const getTitle = () => {
    if (!source) return "All Leads";
    return `${source.charAt(0).toUpperCase() + source.slice(1)} Leads`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">{getTitle()}</h2>
        <p className="mt-1 text-muted-foreground">
          {source
            ? `View and manage all leads from ${source}`
            : "View and manage leads from all sources"}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, phone, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="text-sm text-muted-foreground">Showing {filteredLeads.length} of {leads.length} leads</div>
      </div>

      <LeadsTable leads={filteredLeads} />
    </div>
  );
}
