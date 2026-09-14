import { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Briefcase,
  GraduationCap,
  FileText,
  Users,
  MoreHorizontal,
  Phone,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { demoResources } from '@/data/demoData';
import type { Category } from '@/types';

const categories: ('All' | Category)[] = [
  'All',
  'Education',
  'Employment & Training',
  'Documentation',
  'Community Support',
];

const categoryIcons: Record<Category, typeof Briefcase> = {
  'Employment & Training': Briefcase,
  Education: GraduationCap,
  Documentation: FileText,
  'Community Support': Users,
  Other: MoreHorizontal,
};

export function Resources() {
  const [category, setCategory] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return demoResources.filter((r) => {
      if (category !== 'All' && r.category !== category) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        if (
          !r.name.toLowerCase().includes(q) &&
          !r.description.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [category, search]);

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Resources</h2>
        <p className="text-sm text-gray-500 mt-1">
          Knowledge base of support resources available for matching
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs text-warning-700 bg-warning-50 border border-warning-200 rounded-lg px-3 py-2">
        <CheckCircle2 className="w-4 h-4 text-warning-600" />
        All resources listed below are demo resources for hackathon
        demonstration. They do not represent real organizations.
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search resources..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  category === c
                    ? 'bg-brand-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((r) => {
          const Icon = categoryIcons[r.category] ?? BookOpen;
          return (
            <Card key={r.id} hover>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-sm text-gray-900">
                      {r.name}
                    </h4>
                    <Badge variant="yellow">Demo Resource</Badge>
                  </div>
                  <Badge variant="blue" className="mt-1">
                    {r.category}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{r.description}</p>
              <div className="space-y-1.5 text-xs text-gray-500">
                <p>
                  <span className="font-medium text-gray-700">
                    Eligibility:
                  </span>{' '}
                  {r.eligibility}
                </p>
                <p className="flex items-center gap-1">
                  <Phone className="w-3 h-3" /> {r.contact}
                </p>
                <p className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {r.source}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">
            No resources found matching your search.
          </p>
        </div>
      )}
    </div>
  );
}
