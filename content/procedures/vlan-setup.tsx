import Link from 'next/link';
import Mermaid from '@/components/Mermaid';
import ProcedureDiagram from '@/components/ui/ProcedureDiagram';

export const meta = {
  title: 'VLAN Configuration Guide',
  description: 'RouterOS v7+ VLAN setup and tagging.',
  category: 'Network',
};

export default function VlanSetupContent() {
  return (
    <>
      <p className="text-sm text-gray-400 mb-4 not-prose">
        Prerequisite: Ensure you have completed{' '}
        <Link href="/procedures/fundamentals/ip-addressing" className="text-accent underline">
          IP Addressing &amp; Subnets
        </Link>{' '}
        before configuring VLAN IPs (Step D).
      </p>

      <h2>Prerequisites</h2>
      <ul>
        <li>RouterOS: v7 or later.</li>
        <li>Hardware: Switch or router with VLAN-capable physical interface (most ether, sfp).</li>
        <li>Access: WinBox, SSH, or serial console.</li>
      </ul>

      <h2>Configuration Flow</h2>
      <ProcedureDiagram ariaLabel="VLAN configuration flowchart: identify interface, create VLAN, assign ID, configure IP or bridge, apply to ports">
        <Mermaid chart={`
        graph TD
          A[Identify Physical Interface] --> B[Create VLAN Interface]
          B --> C[Assign VLAN ID]
          C --> D[Configure IP / Bridge]
          D --> E[Apply to Ports or Bridge]
      `} />
      </ProcedureDiagram>

      <h3>Step B–C: Create VLAN Interface</h3>
      <pre><code className="language-routeros">{`/interface vlan add name=vlan100 vlan-id=100 interface=ether1`}</code></pre>

      <h3>Step D: Configure IP</h3>
      <pre><code className="language-routeros">{`/ip address add address=192.168.100.1/24 interface=vlan100`}</code></pre>

      <h3>Step D: Bridge (L2)</h3>
      <pre><code className="language-routeros">{`/interface bridge add name=br-vlan100
/interface bridge port add bridge=br-vlan100 interface=vlan100`}</code></pre>

      <h3>Step D: IP and Bridge</h3>
      <p>
        For subnet notation, see{' '}
        <Link href="/procedures/fundamentals/ip-addressing" className="text-accent underline">
          IP Addressing &amp; Subnets
        </Link>
        .
      </p>

      <h3>VLANs and Tunnels</h3>
      <p>
        When segmenting traffic for VPN peers, combine with{' '}
        <Link href="/procedures/vpn-tunnels" className="text-accent underline">
          VPN Tunnels
        </Link>{' '}
        for interface assignment.
      </p>

      <h3>Security</h3>
      <p>
        After VLAN interfaces are active, apply{' '}
        <Link href="/procedures/firewall-rules" className="text-accent underline">
          Firewall Best Practices
        </Link>{' '}
        to Input and Forward chains.
      </p>

      <h2>Common Pitfalls</h2>
      <ul>
        <li><strong>Driver:</strong> Some interfaces do not support VLAN. Check <code>/interface print</code> for VLAN support.</li>
        <li><strong>Trunk vs access:</strong> Upstream switch port must be trunk (tagged) if carrying multiple VLANs.</li>
        <li><strong>Bridge vs routed:</strong> Bridge for L2 switching; routed VLAN for L3 gateway per VLAN.</li>
        <li><strong>VLAN ID mismatch:</strong> vlan-id must match the tagged traffic from the upstream device.</li>
      </ul>
    </>
  );
}
