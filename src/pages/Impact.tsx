import {
  Clock,
  Zap,
  TrendingUp,
  Users,
  Timer,
  BarChart3,
  Info,
} from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const metrics = [
  {
    icon: Clock,
    label: 'Manual Processing Time',
    value: '7 min',
    description: 'Average time a human worker spends triaging a single request manually.',
    color: 'gray',
  },
  {
    icon: Zap,
    label: 'AI-Assisted Processing Time',
    value: '1 min',
    description: 'Average time with Sahayak AI handling intake, classification, and resource matching.',
    color: 'brand',
  },
  {
    icon: Timer,
    label: 'Potential Time Saved',
    value: '6 min',
    description: 'Time saved per case when using AI-assisted processing vs. manual triage.',
    color: 'accent',
  },
  {
    icon: Users,
    label: 'Cases Processed (Demo)',
    value: '247',
    description: 'Total cases processed in the demo period using AI-assisted triage.',
    color: 'warning',
  },
];

const colorMap: Record<string, string> = {
  gray: 'bg-gray-100 text-gray-600',
  brand: 'bg-brand-50 text-brand-600',
  accent: 'bg-accent-50 text-accent-600',
  warning: 'bg-warning-50 text-warning-600',
};

const barData = [
  { label: 'Mon', manual: 35, ai: 5 },
  { label: 'Tue', manual: 42, ai: 6 },
  { label: 'Wed', manual: 28, ai: 4 },
  { label: 'Thu', manual: 49, ai: 7 },
  { label: 'Fri', manual: 38, ai: 5 },
  { label: 'Sat', manual: 21, ai: 3 },
  { label: 'Sun', manual: 14, ai: 2 },
];

const maxVal = Math.max(...barData.flatMap((d) => [d.manual, d.ai]));

export function Impact() {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Impact</h2>
        <p className="text-sm text-gray-500 mt-1">
          Measuring the efficiency of AI-assisted case processing
        </p>
      </div>

      <div className="flex items-center gap-2 bg-warning-50 border border-warning-200 rounded-lg px-4 py-3">
        <Info className="w-4 h-4 text-warning-600 flex-shrink-0" />
        <p className="text-sm text-warning-700">
          <span className="font-medium">Demo/Test Measurement.</span> All
          metrics below are illustrative demo data for hackathon purposes.
          They do not represent verified real-world data.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <Card key={m.label}>
              <div
                className={`w-11 h-11 rounded-lg flex items-center justify-center mb-3 ${colorMap[m.color]}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-sm text-gray-500">{m.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {m.value}
              </p>
              <p className="text-xs text-gray-500 mt-2">{m.description}</p>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader
          title="Processing Time Comparison"
          subtitle="Minutes spent per case — manual vs. AI-assisted (Demo Data)"
          icon={<BarChart3 className="w-5 h-5" />}
        />
        <div className="flex items-end justify-around gap-2 h-48 mt-4">
          {barData.map((d) => (
            <div
              key={d.label}
              className="flex flex-col items-center gap-1 flex-1"
            >
              <div className="flex items-end gap-1 w-full justify-center h-full">
                <div
                  className="w-3 sm:w-4 bg-gray-300 rounded-t transition-all"
                  style={{ height: `${(d.manual / maxVal) * 100}%` }}
                  title={`Manual: ${d.manual} min`}
                />
                <div
                  className="w-3 sm:w-4 bg-brand-500 rounded-t transition-all"
                  style={{ height: `${(d.ai / maxVal) * 100}%` }}
                  title={`AI: ${d.ai} min`}
                />
              </div>
              <span className="text-xs text-gray-500">{d.label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gray-300" />
            <span className="text-xs text-gray-600">Manual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-brand-500" />
            <span className="text-xs text-gray-600">AI-Assisted</span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader
            title="Cumulative Time Saved"
            subtitle="Based on demo data — 247 cases at 6 min saved each"
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <div className="text-center py-4">
            <p className="text-4xl font-bold text-accent-600">24.7 hrs</p>
            <p className="text-sm text-gray-500 mt-2">
              Total potential time saved across all demo cases
            </p>
          </div>
        </Card>

        <Card className="bg-brand-50/30 border-brand-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-brand-900 mb-2">
                Human remains responsible for final decisions
              </h4>
              <p className="text-sm text-brand-700">
                Sahayak AI reduces the time spent on intake and triage, but
                the quality of support depends on human judgment. The AI
                organizes information and suggests next steps — a human
                worker decides what actually happens.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-400 justify-center">
        <Badge variant="gray">Demo/Test Measurement</Badge>
        <span>All figures are illustrative and not from verified real-world data.</span>
      </div>
    </div>
  );
}
