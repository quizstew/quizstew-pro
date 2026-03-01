// content/procedures/firewall-rules.tsx
export const meta = {
  title: "Firewall Best Practices",
  description: "Hardening your router for production environments.",
};

export default function FirewallRulesContent() {
  return (
    <>
      <div className="bg-red-900/20 border-l-4 border-red-500 p-6 my-8 not-prose">
        <h3 className="text-red-300 font-semibold">Pre-Flight Requirements</h3>
        <ul className="text-red-100 mt-2 space-y-1 list-disc list-inside">
          <li>Backup your current configuration (Export RSC).</li>
          <li>Ensure console/serial access is available.</li>
          <li>Verify &quot;Input&quot; chain drop rules don&apos;t lock you out.</li>
        </ul>
      </div>

      <p>Hardening starts with the Input chain…</p>
      {/* Add your command blocks here */}
    </>
  );
}
