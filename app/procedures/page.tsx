// app/procedures/page.tsx
import Search from '@/components/Search';
import { procedureIndexList } from '@/content/procedures/registry';

export default function ProceduresIndex() {
  return (
    <div className="prose prose-invert lg:prose-xl py-8">
      <h1>Technical Procedures</h1>
      <p className="text-gray-400">Select a guide to begin the diagnostic workflow.</p>

      <div className="not-prose mt-8">
        <Search items={procedureIndexList} />
      </div>
    </div>
  );
}
