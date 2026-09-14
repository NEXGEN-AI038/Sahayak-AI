import {
  Inbox,
  Brain,
  Tag,
  FileSearch,
  FolderSearch,
  ListChecks,
  ShieldCheck,
  Send,
  CheckCircle2,
  ArrowDown,
  Zap,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const steps = [
  {
    icon: Inbox,
    title: 'Request Received',
    description:
      'Support request arrives via web form, voice, email, or manual entry.',
    status: 'complete',
  },
  {
    icon: Brain,
    title: 'AI Understanding',
    description:
      'Make automation sends the request to an AI model for natural language understanding.',
    status: 'complete',
  },
  {
    icon: Tag,
    title: 'AI Classification',
    description:
      'The AI identifies the category and urgency level of the request.',
    status: 'complete',
  },
  {
    icon: FileSearch,
    title: 'Information Extraction',
    description:
      'Structured information is extracted: need, location, language, and context.',
    status: 'complete',
  },
  {
    icon: FolderSearch,
    title: 'Resource Matching',
    description:
      'Relevant support resources are matched based on the extracted information.',
    status: 'complete',
  },
  {
    icon: ListChecks,
    title: 'Action Plan',
    description:
      'Recommended next actions are generated with priority and reasoning.',
    status: 'complete',
  },
  {
    icon: ShieldCheck,
    title: 'Human Review',
    description:
      'A human worker reviews AI recommendations and approves, edits, or rejects them.',
    status: 'pending',
  },
  {
    icon: Send,
    title: 'Follow-Up',
    description:
      'Approved actions are dispatched and follow-up is scheduled for the case.',
    status: 'pending',
  },
];

const statusConfig: Record<string, { variant: 'green' | 'yellow' | 'gray'; label: string }> = {
  complete: { variant: 'green', label: 'Automated' },
  pending: { variant: 'yellow', label: 'Human Step' },
};

export function Automation() {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Automation Workflow</h2>
        <p className="text-sm text-gray-500 mt-1">
          How Sahayak AI processes a request from intake to follow-up
        </p>
      </div>

      <div className="flex items-center gap-2 bg-brand-50 border border-brand-100 rounded-lg px-4 py-3">
        <Zap className="w-4 h-4 text-brand-600" />
        <p className="text-sm text-brand-700">
          <span className="font-medium">Powered by Make automation.</span>{' '}
          The Make webhook handles AI processing, data extraction, and
          resource matching. Human review remains a required step.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const status = statusConfig[step.status];
          return (
            <div key={i}>
              <Card hover>
                <div className="flex items-start gap-4">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      step.status === 'complete'
                        ? 'bg-accent-50 text-accent-600'
                        : 'bg-warning-50 text-warning-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-400">
                          Step {i + 1}
                        </span>
                        <h4 className="font-semibold text-sm text-gray-900">
                          {step.title}
                        </h4>
                      </div>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Card>
              {i < steps.length - 1 && (
                <div className="flex justify-center py-1 lg:hidden">
                  <ArrowDown className="w-4 h-4 text-gray-300" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Card className="bg-gray-50">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-1">
              Key Principle: Human-in-the-Loop
            </h4>
            <p className="text-sm text-gray-600">
              Sahayak AI automates the heavy lifting — understanding,
              classifying, extracting, and matching — but a human worker
              always makes the final decision. The AI never sends messages,
              approves services, or takes real-world action without human
              review.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
