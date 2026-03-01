import Link from 'next/link';

export default function IPFundamentals() {
  return (
    <article className="prose prose-invert lg:prose-xl py-8">
      <h1>Understanding IP Addressing &amp; Subnets</h1>
      <p className="lead text-gray-400">
        Before configuring interfaces, you must understand the &quot;address space&quot; of your network.
        This is the foundation for all routing and VPN configurations.
      </p>

      <h2>1. The Anatomy of an IP</h2>
      <p>
        An IP address (IPv4) consists of four octets (e.g., <code>192.168.88.1</code>).
        The subnet mask determines which part of that address is the &quot;Network&quot; and which part is the &quot;Host.&quot;
      </p>

      <h2>2. What is a Subnet?</h2>
      <p>
        A subnet (e.g., <code>/24</code>) defines the size of your network. A <code>/24</code> subnet
        allows for 254 usable devices. If your VPN tunnel uses <code>10.0.0.0/24</code>,
        your gateway is usually <code>10.0.0.1</code>.
      </p>

      <div className="bg-blue-900/20 border-l-4 border-blue-500 p-6 my-8 not-prose">
        <h3 className="text-blue-300 font-semibold">The Golden Rule of Routing</h3>
        <p className="text-gray-300 mt-2">
          Your VPN interface <strong>cannot</strong> share the same subnet as your local LAN.
          If your LAN is <code>192.168.88.0/24</code>, your VPN tunnel <strong>must</strong>
          use a different range, like <code>172.16.0.0/24</code>.
        </p>
      </div>

      <h2>Next Steps</h2>
      <p>Now that you understand the address space, you can safely configure your:</p>
      <ul>
        <li>
          <Link href="/procedures/vpn-tunnels" className="text-emerald-400 hover:underline">
            VPN Tunnel Configuration
          </Link>
        </li>
        <li>
          <Link href="/procedures/firewall-rules" className="text-emerald-400 hover:underline">
            Firewall Input Chains
          </Link>
        </li>
      </ul>
    </article>
  );
}
