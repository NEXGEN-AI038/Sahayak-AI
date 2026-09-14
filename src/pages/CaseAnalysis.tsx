import { useState } from 'react';
import {
  Brain,
  FileText,
  MapPin,
  Languages,
  Info,
  FolderSearch,
  ListChecks,
  ShieldCheck,
  Check,
  X,
  Pencil,
  AlertTriangle,
  ArrowLeft,
  Sparkles,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { PriorityBadge, Badge } from '@/components/ui/Badge';
import { ResponsibleAI } from '@/components/ResponsibleAI';
import { useApp } from '@/context/AppContext';
import type { PageId } from '@/components/Sidebar';

export function CaseAnalysis({
  onNavigate,
}: {
  onNavigate: (p: PageId) => void;
}) {
  const { cases, updateCaseStatus } = useApp();
  const [reviewAction, setReviewAction] = useState<
    'idle' | 'approved' | 'rejected'
  >('idle');

  const latestCase = cases.find((c) => c.analysis) ?? cases[0];
  const analysis = latestCase?.analysis;

  if (!analysis) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 animate-fade-in">
        <Brain className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900">No Analysis Available</h2>
        <p className="text-sm text-gray-500 mt-2 mb-6">
          Submit a request to see AI-powered case analysis here.
        </p>
        <button onClick={() => onNavigate('submit')} className="btn-primary">
          <Sparkles className="w-4 h-4" />
          Submit a Request
        </button>
      </div>
    );
  }

  const confidencePct = Math.round(analysis.confidence * 100);

  const handleReview = (action: 'approved' | 'rejected') => {
    setReviewAction(action);
    if (action === 'approved') {
      updateCaseStatus(latestCase.case_id, 'In Progress');
    } else if (action === 'rejected') {
      updateCaseStatus(latestCase.case_id, 'Resolved');
    }
  };

  const extractedItems = [
    {
      icon: Info,
      label: 'Need',
      value: analysis.extracted_information.need,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: analysis.extracted_information.location,
    },
    {
      icon: Languages,
      label: 'Preferred Language',
      value: analysis.extracted_information.preferred_language,
    },
    {
      icon: FileText,
      label: 'Additional Context',
      value: analysis.extracted_information.additional_context,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNavigate('dashboard')}
          className="btn-ghost"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="blue">{latestCase.case_id}</Badge>
            <Badge variant="gray">{latestCase.source}</Badge>
            <Badge variant="gray">{latestCase.language}</Badge>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">AI Case Analysis</h2>
        </div>
        {analysis.human_review_required && reviewAction === 'idle' && (
          <div className="flex items-center gap-2 bg-warning-50 border border-warning-200 rounded-lg px-3 py-2">
            <AlertTriangle className="w-4 h-4 text-warning-600" />
            <span className="text-sm font-medium text-warning-800">
              Human Review Required
            </span>
          </div>
        )}
      </div>

      {/* AI Understanding */}
      <Card>
        <CardHeader
          title="AI Understanding"
          subtitle="How Sahayak AI classified this request"
          icon={<Brain className="w-5 h-5" />}
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">Category</p>
            <p className="font-semibold text-gray-900">{analysis.category}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">Urgency</p>
            <PriorityBadge priority={analysis.urgency} />
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">AI Confidence</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-500 rounded-full"
                  style={{ width: `${confidencePct}%` }}
                />
              </div>
              <span className="font-semibold text-sm text-gray-900">
                {confidencePct}%
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Case Summary */}
      <Card>
        <CardHeader
          title="Case Summary"
          subtitle="AI-generated summary of the request"
          icon={<FileText className="w-5 h-5" />}
        />
        <p className="text-sm text-gray-700 leading-relaxed">
          {analysis.summary}
        </p>
      </Card>

      {/* Extracted Information */}
      <Card>
        <CardHeader
          title="Extracted Information"
          subtitle="Structured data identified by AI"
          icon={<Info className="w-5 h-5" />}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {extractedItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-start gap-3 bg-gray-50 rounded-lg p-3"
              >
                <div className="w-8 h-8 rounded-lg bg-white text-gray-500 flex items-center justify-center flex-shrink-0 border border-gray-100">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="text-sm text-gray-800 mt-0.5">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Recommended Resources */}
      <Card>
        <CardHeader
          title="Recommended Resources"
          subtitle="Matched by AI based on the request"
          icon={<FolderSearch className="w-5 h-5" />}
        />
        <div className="space-y-3">
          {analysis.recommended_resources.map((r, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg p-4 hover:border-brand-200 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="font-semibold text-sm text-gray-900">
                  {r.name}
                </h4>
                {r.category && <Badge variant="blue">{r.category}</Badge>}
              </div>
              <p className="text-sm text-gray-600 mb-2">{r.description}</p>
              <div className="flex items-start gap-2 bg-brand-50/50 rounded-md p-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-brand-700">
                  <span className="font-medium">Why: </span>
                  {r.reason}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recommended Actions */}
      <Card>
        <CardHeader
          title="Recommended Actions"
          subtitle="Suggested next steps for the caseworker"
          icon={<ListChecks className="w-5 h-5" />}
        />
        <div className="space-y-3">
          {analysis.recommended_actions.map((a, i) => (
            <div
              key={i}
              className="flex items-start gap-3 border border-gray-200 rounded-lg p-4"
            >
              <div className="w-7 h-7 rounded-full bg-brand-600 text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="font-medium text-sm text-gray-900">
                    {a.action}
                  </p>
                  <PriorityBadge priority={a.priority} />
                </div>
                <p className="text-xs text-gray-500">{a.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Human Review */}
      {reviewAction === 'idle' ? (
        <Card className="border-warning-200 bg-warning-50/30">
          <CardHeader
            title="Human Review Required"
            subtitle="A human worker must review and approve these recommendations before any action is taken"
            icon={<ShieldCheck className="w-5 h-5" />}
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleReview('approved')}
              className="btn-primary"
            >
              <Check className="w-4 h-4" />
              Approve Recommendations
            </button>
            <button
              onClick={() => onNavigate('submit')}
              className="btn-secondary"
            >
              <Pencil className="w-4 h-4" />
              Edit Request
            </button>
            <button
              onClick={() => handleReview('rejected')}
              className="btn-secondary"
            >
              <X className="w-4 h-4" />
              Reject
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Approval marks the case as In Progress. This does not send a real
            message or provide a real service unless a live automation is
            connected.
          </p>
        </Card>
      ) : (
        <Card
          className={
            reviewAction === 'approved'
              ? 'border-accent-200 bg-accent-50/30'
              : 'border-danger-200 bg-danger-50/30'
          }
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${reviewAction === 'approved' ? 'bg-accent-100 text-accent-600' : 'bg-danger-100 text-danger-600'}`}
            >
              {reviewAction === 'approved' ? (
                <Check className="w-5 h-5" />
              ) : (
                <X className="w-5 h-5" />
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {reviewAction === 'approved'
                  ? 'Recommendations Approved'
                  : 'Recommendations Rejected'}
              </p>
              <p className="text-sm text-gray-500">
                {reviewAction === 'approved'
                  ? 'Case status updated to In Progress. You can view it in the Cases section.'
                  : 'Case has been marked as Resolved.'}
              </p>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => onNavigate('cases')}
              className="btn-secondary"
            >
              View Cases
            </button>
            <button
              onClick={() => onNavigate('automation')}
              className="btn-secondary"
            >
              View Automation
            </button>
            <button
              onClick={() => onNavigate('impact')}
              className="btn-secondary"
            >
              View Impact
            </button>
          </div>
        </Card>
      )}

      <ResponsibleAI />
    </div>
  );
}
