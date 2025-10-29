import { Lead } from "@/types/lead";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Globe, Facebook, Instagram } from "lucide-react";
import { format } from "date-fns";

interface LeadsTableProps {
  leads: Lead[];
}

const sourceIcons = {
  website: Globe,
  facebook: Facebook,
  instagram: Instagram,
  google: () => (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  ),
};

const statusColors = {
  new: "bg-primary text-primary-foreground",
  contacted: "bg-warning text-warning-foreground",
  qualified: "bg-accent text-accent-foreground",
  converted: "bg-success text-success-foreground",
  lost: "bg-muted text-muted-foreground",
};

export function LeadsTable({ leads }: LeadsTableProps) {
  return (
    <div className="rounded-lg border bg-card shadow-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Service/Campaign</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => {
            const SourceIcon = sourceIcons[lead.source];
            return (
              <TableRow key={lead.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{lead.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <SourceIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="capitalize">{lead.source}</span>
                  </div>
                </TableCell>
                <TableCell>{lead.name}</TableCell>
                <TableCell className="text-muted-foreground">{lead.email}</TableCell>
                <TableCell className="text-muted-foreground">{lead.phone}</TableCell>
                <TableCell>
                  <div className="max-w-xs truncate text-sm">
                    {lead.service || lead.campaign || lead.keyword || "-"}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {format(lead.createdAt, "MMM dd, yyyy")}
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[lead.status]} variant="secondary">
                    {lead.status}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
