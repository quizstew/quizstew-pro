// app/procedures/page.tsx
import Search from '@/components/Search';

const procedureList = [
  { title: "Netinstall Recovery", slug: "netinstall", desc: "Hardware recovery for unresponsive devices." },
  { title: "VPN Tunnel Setup", slug: "vpn-tunnels", desc: "WireGuard and IPsec configuration." },
  { title: "Firewall Best Practices", slug: "firewall-rules", desc: "Hardening your router for production." },
];

export default function ProceduresIndex() {
  return (
    <div className="prose prose-invert lg:prose-xl py-8">
      <h1>Technical Procedures</h1>
      <p className="text-gray-400">Select a guide to begin the diagnostic workflow.</p>

      <div className="not-prose mt-8">
        <Search items={procedureList} />
      </div>
    </div>
  );
}
