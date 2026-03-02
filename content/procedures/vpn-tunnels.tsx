import Link from 'next/link';
import Mermaid from '@/components/Mermaid';
import ProcedureDiagram from '@/components/ui/ProcedureDiagram';

export const meta = {
  title: 'VPN Tunnels Guide',
  description: 'IPsec and WireGuard tunnel setup on RouterOS v7+.',
  category: 'Network',
};

export default function VpnTunnelsContent() {
  return (
    <>
      <p className="text-sm text-gray-400 mb-4 not-prose">
        Prerequisite: Ensure you have completed{' '}
        <Link href="/procedures/fundamentals/ip-addressing" className="text-accent underline">
          IP Addressing &amp; Subnets
        </Link>{' '}
        before proceeding.
      </p>

      <h2>Prerequisites</h2>
      <ul>
        <li>RouterOS: v7 or later (WireGuard requires v7+).</li>
        <li>Hardware: Supported RouterOS-based device with sufficient CPU for crypto (RB, CCR, CHR).</li>
        <li>Access: WinBox, SSH, or serial console.</li>
        <li>Knowledge: <Link href="/procedures/fundamentals/ip-addressing" className="text-accent underline">IP Addressing &amp; Subnets</Link> — required for peer endpoints and tunnel subnets.</li>
      </ul>

      <h2>Tunnel Setup Flow</h2>
      <ProcedureDiagram ariaLabel="VPN tunnel setup flowchart: IPsec or WireGuard, Phase 1 and 2 or peers, apply policies">
        <Mermaid chart={`
        graph TD
          A[Choose Tunnel Type] --> B{IPsec or WireGuard?}
          B -->|IPsec| C[Configure Phase 1 & 2]
          B -->|WireGuard| D[Add Interface & Peers]
          C --> E[Apply Policies]
          D --> E
      `} />
      </ProcedureDiagram>

      <h3>WireGuard: Interface and Peer</h3>
      <pre><code className="language-routeros">{`/interface wireguard add name=wg1 listen-port=13231 private-key="<key>"
/interface wireguard peers add endpoint-address=1.2.3.4 endpoint-port=13231 \\
  interface=wg1 public-key="<peer-pubkey>" allowed-address=10.0.0.0/24`}</code></pre>

      <h3>IPsec: Phase 1 and 2</h3>
      <pre><code className="language-routeros">{`/ip ipsec peer add address=1.2.3.4 auth-method=pre-shared-key secret="<psk>"
/ip ipsec proposal add auth-algorithms=sha256 enc-algorithms=aes-256-gcm
/ip ipsec policy add src-address=192.168.88.0/24 dst-address=10.0.0.0/24 \\
  sa-src-address=0.0.0.0 sa-dst-address=1.2.3.4 proposal=default template=yes`}</code></pre>

      <h3>Related</h3>
      <p>
        <Link href="/procedures/vlan-setup" className="text-accent underline">
          VLAN Configuration
        </Link>{' '}
        — for interface assignment.{' '}
        <Link href="/procedures/firewall-rules" className="text-accent underline">
          Firewall Best Practices
        </Link>{' '}
        — apply after tunnel establishment.
      </p>

      <h2>Common Pitfalls</h2>
      <ul>
        <li><strong>NAT traversal:</strong> IPsec behind NAT requires NAT-T. Enable <code>nat-traversal=yes</code> on the peer.</li>
        <li><strong>Phase 2 mismatch:</strong> Proposal (auth/enc) must match peer. Mismatch causes tunnel to stay down.</li>
        <li><strong>Subnet overlap:</strong> Tunnel subnet must not overlap LAN. See <Link href="/procedures/fundamentals/ip-addressing" className="text-accent underline">IP Addressing</Link>.</li>
        <li><strong>WireGuard key:</strong> Private key is device-specific. Regenerating invalidates all peers.</li>
      </ul>
    </>
  );
}
