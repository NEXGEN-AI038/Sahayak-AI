import {
  Inbox,
  Clock,
  Loader,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  FileText,
  Users,
  MoreHorizontal,
  ArrowRight,
  FilePlus2,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { StatusBadge, PriorityBadge } from '@/components/ui/Badge';
import { ResponsibleAI } from '@/components/ResponsibleAI';
import { useApp } from '@/context/AppContext';
import type { PageId } from '@/components/Sidebar';
import type { Category } from '@/types';

const stats = [
  { label: "Today's Cases", value: 27, icon: Inbox, color: 'brand' },
  { label: 'Needs Review', value: 6, icon: Clock, color: 'warning' },
  { label: 'In Progress', value: 14, icon: Loader, color: 'blue' },
  { label: 'Resolved', value: 7, icon: CheckCircle2, color: 'accent' },
];

const colorMap: Record<string, string> = {
  brand: 'bg-brand-50 text-brand-600',
  warning: 'bg-warning-50 text-warning-600',
  blue: 'bg-blue-50 text-blue-600',
  accent: 'bg-accent-50 text-accent-600',
};

const categoryIcons: Record<Category, typeof Briefcase> = {
  'Employment & Training': Briefcase,
  Education: GraduationCap,
  Documentation: FileText,
  'Community Support': Users,
  Other: MoreHorizontal,
};

const triageBreakdown: { label: Category; count: number; pct: number }[] = [
  { label: 'Employment & Training', count: 11, pct: 41 },
  { label: 'Education', count: 8, pct: 30 },
  { label: 'Documentation', count: 5, pct: 19 },
  { label: 'Community Support', count: 2, pct: 7 },
  { label: 'Other', count: 1, pct: 3 },
];

export function Dashboard({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const { cases } = useApp();
  const recentCases = cases.slice(0, 6);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">
          Overview of today's case intake and AI triage activity
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{s.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {s.value}
                  </p>
                </div>
                <div
                  className={`w-11 h-11 rounded-lg flex items-center justify-center ${colorMap[s.color]}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h3 className="font-semibold text-gray-900 mb-4">
            AI Triage Breakdown
          </h3>
          <div className="space-y-3">
            {triageBreakdown.map((t) => {
              const Icon = categoryIcons[t.label];
              return (
                <div key={t.label}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{t.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {t.count}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-500 rounded-full transition-all"
                      style={{ width: `${t.pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Recent Cases</h3>
            <button
              onClick={() => onNavigate('cases')}
              className="text-sm text-brand-600 font-medium flex items-center gap-1 hover:text-brand-700"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="overflow-x-auto -mx-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="px-5 py-2 font-medium text-gray-500">
                    Case ID
                  </th>
                  <th className="px-3 py-2 font-medium text-gray-500">
                    Category
                  </th>
                  <th className="px-3 py-2 font-medium text-gray-500 hidden md:table-cell">
                    Summary
                  </th>
                  <th className="px-3 py-2 font-medium text-gray-500">
                    Priority
                  </th>
                  <th className="px-3 py-2 font-medium text-gray-500">Status</th>
                  <th className="px-5 py-2 font-medium text-gray-500 hidden lg:table-cell">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentCases.map((c) => (
                  <tr
                    key={c.case_id}
                    onClick={() => onNavigate('cases')}
                    className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-5 py-3 font-medium text-gray-900">
                      {c.case_id}
                    </td>
                    <td className="px-3 py-3 text-gray-600">
                      {c.analysis?.category ?? '—'}
                    </td>
                    <td className="px-3 py-3 text-gray-500 max-w-[200px] truncate hidden md:table-cell">
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
                    <td className="px-5 py-3 text-gray-500 hidden lg:table-cell">
                      {new Date(c.submitted_at).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card hover className="cursor-pointer" >
          <div
            onClick={() => onNavigate('submit')}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <FilePlus2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">
                Submit a New Request
              </h4>
              <p className="text-sm text-gray-500">
                Enter a support request and let Sahayak AI analyze it instantly
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
          </div>
        </Card>

        <ResponsibleAI />
      </div>
    </div>
  );
}
