import Mermaid from '@/components/Mermaid';
import ProcedureDiagram from '@/components/ui/ProcedureDiagram';

export const meta = {
  title: 'VLAN Configuration',
  description: 'RouterOS v7+ VLAN setup and tagging.',
  category: 'Network',
};

export default function VlanSetupContent() {
  return (
    <>
      <h2 className="text-2xl font-semibold mt-10">VLAN Setup Flow</h2>
      <ProcedureDiagram>
        <Mermaid chart={`
        graph TD
          A[Identify Physical Interface] --> B[Create VLAN Interface]
          B --> C[Assign VLAN ID]
          C --> D[Configure IP / Bridge]
          D --> E[Apply to Ports or Bridge]
      `} />
      </ProcedureDiagram>
    </>
  );
}
