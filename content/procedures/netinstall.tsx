import Link from 'next/link';
import Mermaid from '@/components/Mermaid';
import ProcedureDiagram from '@/components/ui/ProcedureDiagram';

export const meta = {
  title: 'Netinstall Recovery Guide',
  description: 'Recover RouterOS using Netinstall when the device is unresponsive or needs reflashing.',
  category: 'Hardware',
};

export default function NetinstallContent() {
  return (
    <>
      <p className="text-sm text-gray-400 mb-4 not-prose">
        Prerequisite: For static IP assignment (Step F), ensure you understand{' '}
        <Link href="/procedures/fundamentals/ip-addressing" className="text-accent underline">
          IP Addressing &amp; Subnets
        </Link>
        .
      </p>

      <h2>Prerequisites</h2>
      <ul>
        <li>RouterOS: any version (recovery overwrites). Image must match device architecture (e.g., arm, mipsbe, x86).</li>
        <li>Hardware: RouterOS-based device with Ethernet port (RB, CCR, CHR, etc.).</li>
        <li>Access: Netinstall client (Windows, macOS, or Linux). Direct Ethernet connection to device or same L2 segment.</li>
        <li>Host IP: Assign 192.168.88.2/24 to the interface connected to the device.</li>
      </ul>

      <h2>Recovery Flow</h2>
      <ProcedureDiagram ariaLabel="Netinstall recovery flowchart: power on, LED check, link light check, static IP assignment, flash RouterOS">
        <Mermaid chart={`
        flowchart TD
          A[Power On Device] --> B{LED Blinking?}
          B -- Yes --> C[Run Netinstall]
          B -- No --> D{Link Light Active?}
          D -- No --> E[Swap Ethernet Cable]
          D -- Yes --> F[Assign Static IP 192.168.88.2]
          C --> G[Flash RouterOS]
          F --> G

          style G stroke-width:4px
      `} />
      </ProcedureDiagram>

      <h3>Static IP Assignment (Host)</h3>
      <p>
        Step F requires assigning 192.168.88.2 to your host. See{' '}
        <Link href="/procedures/fundamentals/ip-addressing" className="text-accent underline">
          IP Addressing &amp; Subnets
        </Link>{' '}
        for subnet notation.
      </p>

      <p>Linux example:</p>
      <pre><code className="language-bash">{`ip addr add 192.168.88.2/24 dev eth0
# Or with nmcli:
nmcli con mod <connection> ipv4.addresses 192.168.88.2/24`}</code></pre>

      <h3>Post-Recovery</h3>
      <p>
        After flashing: apply{' '}
        <Link href="/procedures/firewall-rules" className="text-accent underline">
          Firewall Best Practices
        </Link>
        ; for network segmentation see{' '}
        <Link href="/procedures/vlan-setup" className="text-accent underline">
          VLAN Configuration
        </Link>
        .
      </p>

      <h2>Common Pitfalls</h2>
      <ul>
        <li><strong>Boot mode:</strong> Device must be in Netinstall mode (reset button hold or boot-mode selection). LED blinking indicates ready state.</li>
        <li><strong>Wrong IP:</strong> Host must be 192.168.88.2. Netinstall listens on 192.168.88.1 by default. Verify with <code>ip addr</code> or <code>ifconfig</code>.</li>
        <li><strong>Firewall:</strong> Host firewall may block Netinstall. Temporarily allow UDP 5678 or disable firewall on the host interface.</li>
        <li><strong>Driver:</strong> Some USB-Ethernet adapters fail. Use onboard NIC or known-good adapter.</li>
      </ul>
    </>
  );
}
