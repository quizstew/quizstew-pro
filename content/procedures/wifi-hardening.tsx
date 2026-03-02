import Link from 'next/link';
import Mermaid from '@/components/Mermaid';
import ProcedureDiagram from '@/components/ui/ProcedureDiagram';

export const meta = {
  title: 'Hardening Wireless Networks Guide',
  description: 'RouterOS wireless security: WPA3-SAE, management frame protection, access list filtering.',
  category: 'Network',
};

export default function WifiHardeningContent() {
  return (
    <>
      <p className="text-sm text-gray-400 mb-4 not-prose">
        Prerequisite: Ensure you have completed{' '}
        <Link href="/procedures/firewall-rules" className="text-accent underline">
          Firewall Best Practices
        </Link>{' '}
        before applying wireless-specific rules.
      </p>

      <h2>Prerequisites</h2>
      <ul>
        <li>RouterOS: v7 or later (WPA3-SAE requires v7+).</li>
        <li>Hardware: Supported RouterOS-based device with wireless interface (wlan, cap).</li>
        <li>Access: WinBox, SSH, or serial console.</li>
      </ul>

      <h2>Configuration Flow</h2>
      <ProcedureDiagram ariaLabel="Wireless hardening flow: Wireless Client to WPA3-SAE, Management Frame Protection, Access List Filter">
        <Mermaid chart={`
        flowchart LR
          A[Wireless Client] --> B[WPA3-SAE Authentication]
          B --> C[Management Frame Protection]
          C --> D[Access List Filter]
        `} />
      </ProcedureDiagram>

      <h3>WPA3-SAE Authentication</h3>
      <p>Use WPA3-SAE (Simultaneous Authentication of Equals) where supported. Fallback to WPA2-PSK for legacy clients. Disable WPA and WEP.</p>
      <pre><code className="language-routeros">{`/interface wireless security-profiles set [ find default=yes ] authentication-types=wpa3-psk,wpa2-psk mode=dynamic-keys
/interface wireless security-profiles set [ find default=yes ] passphrase="<strong-passphrase>"`}</code></pre>

      <h3>Management Frame Protection</h3>
      <p>Enable management frame protection (MFP) to mitigate deauth attacks. Requires client support. Use <code>required</code> when all clients support it.</p>
      <pre><code className="language-routeros">{`/interface wireless security-profiles set [ find default=yes ] management-protection=required`}</code></pre>

      <h3>Access List Filter</h3>
      <p>Restrict association by MAC address or use dynamic allow/deny. Whitelist mode requires explicit permit for each client.</p>
      <pre><code className="language-routeros">{`/interface wireless access-list add interface=wlan1 mac-address=AA:BB:CC:DD:EE:FF authentication=yes
/interface wireless set wlan1 access-list=default-allow`}</code></pre>

      <h3>Related</h3>
      <p>
        <Link href="/procedures/firewall-rules" className="text-accent underline">
          Firewall Best Practices
        </Link>{' '}
        — Input and Forward chain rules for wireless bridge or routed traffic.
      </p>

      <h2>Common Pitfalls</h2>
      <ul>
        <li><strong>Legacy client incompatibility:</strong> WPA3-only or MFP required excludes older devices. Use <code>wpa3-psk,wpa2-psk</code> or <code>management-protection=optional</code> for mixed environments.</li>
        <li><strong>MAC address spoofing:</strong> Access list by MAC is not a security boundary. Clients can spoof permitted MACs. Use WPA3-SAE and certificate-based auth where possible.</li>
        <li><strong>Hidden SSID issues:</strong> Hiding the SSID increases probe traffic and does not improve security. Clients broadcast the SSID when reconnecting. Prefer strong authentication over hidden SSID.</li>
        <li><strong>Firewall rule order:</strong> Wireless traffic enters via the wlan interface. Ensure Input/Forward rules allow established/related and wireless bridge traffic before drop. Verify with <code>/ip firewall filter print</code>.</li>
      </ul>
    </>
  );
}
