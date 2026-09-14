import { useState } from 'react';
import {
  Settings as SettingsIcon,
  Webhook,
  ToggleLeft,
  ToggleRight,
  Info,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ResponsibleAI } from '@/components/ResponsibleAI';
import { useApp } from '@/context/AppContext';
import { isWebhookConfigured } from '@/services/makeWebhook';

export function Settings() {
  const { demoMode, setDemoMode } = useApp();
  const [copied, setCopied] = useState(false);
  const webhookReady = isWebhookConfigured();

  const payloadExample = `{
  "case_id": "CASE-1234",
  "request_text": "I need help finding a job...",
  "language": "English",
  "source": "web",
  "submitted_at": "2026-01-15T10:30:00Z"
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(payloadExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-sm text-gray-500 mt-1">
          Configure webhook integration and application preferences
        </p>
      </div>

      <Card>
        <CardHeader
          title="Make.com Webhook Integration"
          subtitle="Connect your Make automation to enable live AI processing"
          icon={<Webhook className="w-5 h-5" />}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Webhook Status
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {webhookReady
                  ? 'Make webhook URL is configured via environment variable.'
                  : 'No webhook URL configured. Demo Mode is active.'}
              </p>
            </div>
            <Badge variant={webhookReady ? 'green' : 'gray'}>
              {webhookReady ? 'Connected' : 'Not Set'}
            </Badge>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">
              How to configure
            </p>
            <p className="text-xs text-gray-500 mb-2">
              Set the environment variable in your deployment:
            </p>
            <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs text-gray-300">
              VITE_MAKE_WEBHOOK_URL=https://hook.us1.make.com/your-webhook-id
            </div>
            <p className="text-xs text-gray-500 mt-2">
              The webhook URL is read from the environment. No API keys or
              secrets are stored in frontend code.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-700">
                Expected Request Payload
              </p>
              <button
                onClick={handleCopy}
                className="btn-ghost text-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </>
                )}
              </button>
            </div>
            <pre className="bg-gray-900 rounded-lg p-3 font-mono text-xs text-gray-300 overflow-x-auto">
              {payloadExample}
            </pre>
          </div>

          <div className="flex items-start gap-2 bg-brand-50 border border-brand-100 rounded-lg p-3">
            <Info className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-brand-700">
              The Make automation should return a JSON response with: category,
              urgency, confidence, summary, extracted_information,
              recommended_resources, recommended_actions, and
              human_review_required. See the full response schema in the
              Make webhook service file.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Demo Mode"
          subtitle="Use built-in demo responses instead of calling the Make webhook"
          icon={<SettingsIcon className="w-5 h-5" />}
        />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">
              {demoMode ? 'Demo Mode is ON' : 'Demo Mode is OFF'}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {demoMode
                ? 'All requests will use built-in demo AI responses. No webhook calls are made.'
                : webhookReady
                  ? 'Requests will be sent to the Make webhook. Falls back to demo if the webhook fails.'
                  : 'No webhook configured — demo responses are used automatically.'}
            </p>
          </div>
          <button
            onClick={() => setDemoMode(!demoMode)}
            className="text-brand-600 hover:text-brand-700 transition-colors"
          >
            {demoMode ? (
              <ToggleRight className="w-10 h-10" />
            ) : (
              <ToggleLeft className="w-10 h-10 text-gray-400" />
            )}
          </button>
        </div>
      </Card>

      <Card>
        <CardHeader
          title="About Sahayak AI"
          subtitle="Hackathon project information"
          icon={<Info className="w-5 h-5" />}
        />
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-medium text-gray-900">Version:</span> 1.0.0
            (Hackathon Demo)
          </p>
          <p>
            <span className="font-medium text-gray-900">Purpose:</span>{' '}
            AI-powered case intake, case intelligence, resource matching, and
            workflow automation for NGOs and community-support organizations.
          </p>
          <p>
            <span className="font-medium text-gray-900">Backend:</span> Make.com
            automation (configurable webhook)
          </p>
        </div>
      </Card>

      <ResponsibleAI />
    </div>
  );
}
