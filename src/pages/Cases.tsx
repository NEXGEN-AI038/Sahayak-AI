import { useState, useMemo } from 'react';
import { Search, Filter, ChevronRight, Inbox } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { StatusBadge, PriorityBadge, Badge } from '@/components/ui/Badge';
import { useApp } from '@/context/AppContext';
import type { PageId } from '@/components/Sidebar';
import type { CaseStatus, Category } from '@/types';

const statusFilters: ('All' | CaseStatus)[] = [
  'All',
  'Needs Review',
  'In Progress',
  'Resolved',
];

const categoryFilters: ('All' | Category)[] = [
  'All',
  'Employment & Training',
  'Education',
  'Documentation',
  'Community Support',
  'Other',
];

const priorityFilters = ['All', 'Critical', 'High', 'Normal', 'Low'];

export function Cases({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const { cases } = useApp();
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return cases.filter((c) => {
      if (statusFilter !== 'All' && c.status !== statusFilter) return false;
      const cat = c.analysis?.category;
      if (categoryFilter !== 'All' && cat !== categoryFilter) return false;
      const urg = c.analysis?.urgency;
      if (priorityFilter !== 'All' && urg !== priorityFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const text = `${c.case_id} ${c.request_text} ${c.analysis?.summary ?? ''}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [cases, statusFilter, categoryFilter, priorityFilter, search]);

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Cases</h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage and review all support cases
        </p>
      </div>

      <Card>
        <div className="space-y-4">
          <div className="relative">
            <Search
              className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by case ID, summary, or request text..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 flex items-center gap-1 mb-1.5">
                <Filter className="w-3 h-3" /> Status
              </label>
              <div className="flex gap-1.5">
                {statusFilters.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      statusFilter === s
                        ? 'bg-brand-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
              >
                {categoryFilters.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                Priority
              </label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
              >
                {priorityFilters.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Inbox className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">
              No cases match your filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left bg-gray-50">
                  <th className="px-5 py-3 font-medium text-gray-500">
                    Case ID
                  </th>
                  <th className="px-3 py-3 font-medium text-gray-500">
                    Category
                  </th>
                  <th className="px-3 py-3 font-medium text-gray-500 hidden md:table-cell">
                    Summary
                  </th>
                  <th className="px-3 py-3 font-medium text-gray-500">
                    Priority
                  </th>
                  <th className="px-3 py-3 font-medium text-gray-500">Status</th>
                  <th className="px-3 py-3 font-medium text-gray-500 hidden lg:table-cell">
                    Created
                  </th>
                  <th className="px-5 py-3 font-medium text-gray-500"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr
                    key={c.case_id}
                    onClick={() => onNavigate('analysis')}
                    className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-5 py-3 font-medium text-gray-900">
                      {c.case_id}
                    </td>
                    <td className="px-3 py-3">
                      {c.analysis?.category ? (
                        <Badge variant="blue">{c.analysis.category}</Badge>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-gray-500 max-w-[220px] truncate hidden md:table-cell">
                      {c.analysis?.summary ?? c.request_text}
                    </td>
                    <td className="px-3 py-3">
                      {c.analysis && (
                        <PriorityBadge priority={c.analysis.urgency} />
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-3 py-3 text-gray-500 hidden lg:table-cell">
                      {new Date(c.submitted_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-5 py-3">
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <p className="text-xs text-gray-400 text-center">
        Showing {filtered.length} of {cases.length} cases
      </p>
    </div>
  );
}
