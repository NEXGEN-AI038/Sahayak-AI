import { ShieldCheck } from 'lucide-react';

export function ResponsibleAI({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex items-start gap-2 text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg p-3">
        <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-400" />
        <p>
          Sahayak AI assists human workers by organizing information and
          suggesting next steps. It does not make final health, legal,
          financial, eligibility or welfare decisions.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 bg-brand-50 border border-brand-100 rounded-xl p-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center">
        <ShieldCheck className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-semibold text-sm text-brand-900 mb-1">
          Responsible AI Notice
        </h4>
        <p className="text-sm text-brand-700">
          Sahayak AI assists human workers by organizing information and
          suggesting next steps. It does not make final health, legal,
          financial, eligibility or welfare decisions.
        </p>
      </div>
    </div>
  );
}
