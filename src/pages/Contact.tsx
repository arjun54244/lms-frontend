import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiPost } from "@/lib/api";

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    service: "",
    campaign: "",
    notes: "",
  });

  // uses auto-discovery from lib/api

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.contact) {
      toast({ title: "Please fill required fields", description: "Name, Email, and Phone are required.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const json = await apiPost("/leads", {
        name: form.name,
        email: form.email,
        contact: form.contact,
        source: "Website",
        service: form.service || undefined,
        campaign: form.campaign || undefined,
        notes: form.notes || undefined,
        status: "New",
      });

      toast({ title: "Lead submitted", description: "Your inquiry has been recorded." });
      setForm({ name: "", email: "", contact: "", service: "", campaign: "", notes: "" });
    } catch (err: any) {
      const msg = err?.message || "Unknown error";
      toast({ title: "Submission failed", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Contact Us</h2>
        <p className="mt-1 text-muted-foreground">Submit a lead to the LMS (dummy website form)</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 max-w-2xl">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Name *</label>
          <Input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Email *</label>
          <Input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Phone *</label>
          <Input name="contact" value={form.contact} onChange={handleChange} placeholder="+11234567890" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Service</label>
          <Input name="service" value={form.service} onChange={handleChange} placeholder="e.g., Web Development" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Campaign</label>
          <Input name="campaign" value={form.campaign} onChange={handleChange} placeholder="e.g., Summer Promo" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Notes</label>
          <Textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Tell us more..." />
        </div>
        <div>
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Lead"}
          </Button>
        </div>
      </form>
    </div>
  );
}


