import Link from 'next/link';
import Mermaid from '@/components/Mermaid';
import ProcedureDiagram from '@/components/ui/ProcedureDiagram';

export const meta = {
  title: 'Secure Remote Management Guide',
  description: 'RouterOS v7+ secure remote access via VPN, allowed interfaces, and firewall filtering.',
  category: 'General',
};

export default function SecureRemoteContent() {
  return (
    <>
      <p className="text-sm text-gray-400 mb-4 not-prose">
        Prerequisite: Ensure you have completed{' '}
        <Link href="/procedures/vpn-tunnels" className="text-accent underline">
          VPN Tunnels
        </Link>{' '}
        and{' '}
        <Link href="/procedures/firewall-rules" className="text-accent underline">
          Firewall Best Practices
        </Link>{' '}
        before proceeding.
      </p>

      <h2>Prerequisites</h2>
      <ul>
        <li>RouterOS: v7 or later.</li>
        <li>Hardware: Supported RouterOS-based device.</li>
        <li>Access: WinBox, SSH, or serial console. VPN tunnel or management interface already configured.</li>
      </ul>

      <h2>Lockout Prevention (Required)</h2>
      <p>Before restricting services or firewall rules, establish a lockout-proof management path. If you lose access, recovery requires Netinstall.</p>
      <ul>
        <li><strong>Local bridge:</strong> Ensure at least one physical port (e.g., ether1) is in a bridge or interface list that will remain allowed. Do not restrict the interface you are currently using.</li>
        <li><strong>Allowed address list:</strong> When setting <code>/ip service set ... address=</code>, include your current management IP or subnet. Verify with <code>/ip address print</code> before applying.</li>
        <li><strong>Firewall order:</strong> Input chain must allow your management interface <em>before</em> the final drop. Add the allow rule, test from another session, then apply service restrictions.</li>
      </ul>

      <h2>Configuration Flow</h2>
      <ProcedureDiagram ariaLabel="Secure remote management flow: User or VPN to allowed interface, firewall filter, RouterOS services">
        <Mermaid chart={`
        flowchart LR
          A[User / VPN] --> B[Allowed Interface]
          B --> C[Firewall Filter]
          C --> D[RouterOS Services]
        `} />
      </ProcedureDiagram>

      <h3>Allowed Interface</h3>
      <p>Restrict WinBox, SSH, and API to specific interfaces. Default allows all. Use interface lists (e.g., LAN, VPN) to limit management access.</p>
      <pre><code className="language-routeros">{`/ip service set winbox address=192.168.88.0/24,10.0.0.0/24
/ip service set ssh address=192.168.88.0/24,10.0.0.0/24
/ip service set www-ssl address=""`}</code></pre>

      <h3>Firewall Filter</h3>
      <p>Input chain must allow management traffic from allowed interfaces before the final drop. Place VPN interface or LAN in an interface list and allow that list.</p>
      <pre><code className="language-routeros">{`/ip firewall filter add chain=input in-interface-list=LAN action=accept place-before=0
/ip firewall filter add chain=input in-interface-list=VPN action=accept place-before=1`}</code></pre>

      <h3>RouterOS Services</h3>
      <p>Disable unused services. Enable only WinBox, SSH, or API as required. Use <code>/ip service print</code> to verify.</p>
      <pre><code className="language-routeros">{`/ip service disable telnet,ftp,www,api,api-ssl`}</code></pre>

      <h3>Related</h3>
      <p>
        <Link href="/procedures/vpn-tunnels" className="text-accent underline">
          VPN Tunnels
        </Link>{' '}
        — required for remote VPN-based management.{' '}
        <Link href="/procedures/firewall-rules" className="text-accent underline">
          Firewall Best Practices
        </Link>{' '}
        — Input chain order and established/related rules.
      </p>

      <h2>Common Pitfalls</h2>
      <ul>
        <li><strong>Locked out:</strong> Restricting services or firewall without a lockout-proof path drops management. Always include your current connection in the allowed address list or ensure a local bridge/interface is allowed in the Input chain before applying restrictions.</li>
        <li><strong>Wrong interface:</strong> VPN tunnel interface must be in the allowed-address list for services. Verify with <code>/ip service print</code> and <code>/interface print</code>.</li>
        <li><strong>VPN tunnel down:</strong> If management is VPN-only and the tunnel is down, access is lost. Maintain console or serial access, or allow a fallback interface.</li>
        <li><strong>Firewall rule order:</strong> Allow VPN/LAN interfaces before <code>established,related</code> or ensure they are not overridden by a later drop. Verify with <code>/ip firewall filter print</code>.</li>
      </ul>
    </>
  );
}
