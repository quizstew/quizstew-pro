import Mermaid from '@/components/Mermaid';
import ProcedureDiagram from '@/components/ui/ProcedureDiagram';

export default function NetinstallFlow() {
  return (
    <ProcedureDiagram>
      <div className="rounded-4xl overflow-hidden">
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
      </div>
    </ProcedureDiagram>
  );
}
