import Link from 'next/link';

export const meta = {
  title: 'Firewall Best Practices Guide',
  description: 'Hardening your router for production environments.',
  category: 'General',
};

export default function FirewallRulesContent() {
  return (
    <>
      <p className="text-sm text-gray-400 mb-4 not-prose">
        Prerequisite: If hardening tunnel or VLAN interfaces, ensure you have completed{' '}
        <Link href="/procedures/vpn-tunnels" className="text-accent underline">
          VPN Tunnels
        </Link>{' '}
        or{' '}
        <Link href="/procedures/vlan-setup" className="text-accent underline">
          VLAN Configuration
        </Link>{' '}
        before proceeding.
      </p>

      <h2>Prerequisites</h2>
      <ul>
        <li>RouterOS: v7 or later.</li>
        <li>Hardware: Any supported RouterOS-based model.</li>
        <li>Access: WinBox, SSH, or serial console. Serial/console required before applying Input rules.</li>
      </ul>

      <h2>Pre-Flight Requirements</h2>
      <ul>
        <li>Backup current configuration (Export RSC).</li>
        <li>Ensure console or serial access is available.</li>
        <li>Verify Input chain drop rules do not lock out management access.</li>
      </ul>

      <h2>Input Chain Hardening</h2>
      <p>Standard v7 Input chain model: drop invalid first, allow established/related, accept ICMP, allow management interfaces, drop remainder.</p>

      <pre><code className="language-routeros">{`/ip firewall filter add chain=input connection-state=invalid action=drop place-before=0 comment="drop invalid"
/ip firewall filter add chain=input connection-state=established,related action=accept place-before=1 comment="allow established/related"
/ip firewall filter add chain=input protocol=icmp action=accept place-before=2 comment="allow ICMP"
/ip firewall filter add chain=input in-interface-list=LAN action=accept place-before=3 comment="allow LAN management"
/ip firewall filter add chain=input action=drop place-before=4 comment="drop all others"`}</code></pre>

      <h3>Export Backup (RSC)</h3>
      <pre><code className="language-routeros">{`/export file=backup-before-firewall`}</code></pre>

      <h3>Related Procedures</h3>
      <p>
        <Link href="/procedures/vpn-tunnels" className="text-accent underline">
          VPN Tunnels
        </Link>{' '}
        — tunnel policies require Input/Forward chain rules.{' '}
        <Link href="/procedures/vlan-setup" className="text-accent underline">
          VLAN Configuration
        </Link>{' '}
        — apply firewall rules per VLAN interface as needed.
      </p>

      <h3>Recovery</h3>
      <p>
        If Input rules lock you out, use{' '}
        <Link href="/procedures/netinstall" className="text-accent underline">
          Netinstall Recovery
        </Link>{' '}
        to restore access.
      </p>

      <h2>Common Pitfalls</h2>
      <ul>
        <li><strong>Rule order:</strong> Drop invalid first, then <code>established,related</code>, then ICMP, then management, then drop. Wrong order causes lockout or traffic loss.</li>
        <li><strong>Management lockout:</strong> Allow LAN or management interface before the final drop. Test from console first.</li>
        <li><strong>Forward chain:</strong> For routing/NAT, Forward chain rules are separate. Input protects the router; Forward protects transit traffic.</li>
        <li><strong>place-before:</strong> Use <code>place-before=0</code> to insert at top. Verify order with <code>/ip firewall filter print</code>.</li>
      </ul>
    </>
  );
}
