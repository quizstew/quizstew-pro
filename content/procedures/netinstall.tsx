import Mermaid from '@/components/Mermaid';

export const meta = {
  title: 'Netinstall Recovery',
  description: 'Recover RouterOS using Netinstall when the device is unresponsive or needs reflashing.',
  category: 'Hardware',
};

export default function NetinstallContent() {
  return (
    <>
      <h2 className="text-2xl font-semibold mt-10">Netinstall Recovery Flow</h2>
      <Mermaid chart={`
        graph TD
          A[Power On Device] --> B{LED Blinking?}
          B -- Yes --> C[Run Netinstall]
          B -- No --> D{Link Light Active?}
          D -- No --> E[Swap Ethernet Cable]
          D -- Yes --> F[Assign Static IP 192.168.88.2]
          C --> G[Flash RouterOS]
          F --> G
      `} />
    </>
  );
}
