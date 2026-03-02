import Link from 'next/link';
import Mermaid from '@/components/Mermaid';
import ProcedureDiagram from '@/components/ui/ProcedureDiagram';

export const meta = {
  title: 'VPN Tunnels',
  description: 'IPsec and WireGuard tunnel setup on RouterOS v7+.',
  category: 'Network',
};

export default function VpnTunnelsContent() {
  return (
    <>
      <div className="border border-accent bg-surface-border/50 p-4 my-4 rounded not-prose">
        <h4 className="text-accent font-bold">New to VPNs?</h4>
        <p className="text-sm text-gray-300 mt-1">
          Ensure you understand the basics of{' '}
          <Link href="/procedures/fundamentals/ip-addressing" className="text-accent underline font-semibold">
            IP Addressing &amp; Subnets
          </Link>{' '}
          before configuring peer interfaces.
        </p>
      </div>

      <h2 className="text-2xl font-semibold mt-10">Tunnel Setup Flow</h2>
      <ProcedureDiagram>
        <Mermaid chart={`
        graph TD
          A[Choose Tunnel Type] --> B{IPsec or WireGuard?}
          B -->|IPsec| C[Configure Phase 1 & 2]
          B -->|WireGuard| D[Add Interface & Peers]
          C --> E[Apply Policies]
          D --> E
      `} />
      </ProcedureDiagram>
    </>
  );
}
