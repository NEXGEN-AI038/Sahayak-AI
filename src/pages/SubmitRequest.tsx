import { useState, useRef } from 'react';
import {
  FileText,
  Mic,
  Upload,
  Globe,
  Mail,
  ClipboardList,
  Sparkles,
  Loader2,
  AlertCircle,
  ChevronDown,
  CheckCircle2,
  Brain,
  FolderSearch,
  ListChecks,
  ShieldCheck,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { ResponsibleAI } from '@/components/ResponsibleAI';
import { useApp } from '@/context/AppContext';
import {
  sendToMake,
  createCaseId,
  buildCaseRecord,
  isWebhookConfigured,
  WebhookError,
} from '@/services/makeWebhook';
import { demoScenarios } from '@/data/demoData';
import type { Language, InputSource, WebhookResponse } from '@/types';
import type { PageId } from '@/components/Sidebar';

const languages: Language[] = ['English', 'Hindi', 'Bengali'];
const sources: InputSource[] = ['Web', 'Voice', 'Form', 'Email'];

const sourceIcons: Record<InputSource, typeof Globe> = {
  Web: Globe,
  Voice: Mic,
  Form: ClipboardList,
  Email: Mail,
};

const processingSteps = [
  { label: 'Sending request to Make automation', icon: Upload },
  { label: 'AI understanding the request', icon: Brain },
  { label: 'Classifying category & urgency', icon: Sparkles },
  { label: 'Extracting structured information', icon: FileText },
  { label: 'Matching relevant resources', icon: FolderSearch },
  { label: 'Generating recommended actions', icon: ListChecks },
  { label: 'Preparing case for human review', icon: ShieldCheck },
];

export function SubmitRequest({
  onNavigate,
}: {
  onNavigate: (p: PageId) => void;
}) {
  const { addCase, updateCaseAnalysis, demoMode, setDemoMode } = useApp();
  const [requestText, setRequestText] = useState('');
  const [language, setLanguage] = useState<Language>('English');
  const [source, setSource] = useState<InputSource>('Web');
  const [audioName, setAudioName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [activeCaseId, setActiveCaseId] = useState<string>('');
  const fileRef = useRef<HTMLInputElement>(null);

  const webhookReady = isWebhookConfigured();
  const willUseDemo = !webhookReady || demoMode;

  const handleAnalyze = async (forceDemo = false) => {
    if (!requestText.trim()) {
      setError('Please describe the person\'s request before analyzing.');
      return;
    }

    setError(null);
    setLoading(true);
    setCurrentStep(0);

    const caseId = createCaseId();
    setActiveCaseId(caseId);
    const record = buildCaseRecord(
      caseId,
      requestText,
      language,
      source,
    );
    addCase(record);

    const useDemo = forceDemo || willUseDemo;

    if (!useDemo) {
      try {
        for (let i = 0; i < processingSteps.length; i++) {
          setCurrentStep(i);
          await new Promise((r) => setTimeout(r, 500));
        }

        const response = await sendToMake({
          case_id: caseId,
          request_text: requestText,
          language,
          source,
          submitted_at: record.submitted_at,
        });

        updateCaseAnalysis(caseId, response);
        setLoading(false);
        onNavigate('analysis');
        return;
      } catch (err) {
        const isTimeout =
          err instanceof WebhookError && err.kind === 'timeout';
        const msg = isTimeout
          ? 'The webhook took too long to respond.'
          : err instanceof WebhookError
            ? err.message
            : 'AI processing is temporarily unavailable.';
        setError(msg);
        setLoading(false);
        return;
      }
    }

    // Demo mode
    for (let i = 0; i < processingSteps.length; i++) {
      setCurrentStep(i);
      await new Promise((r) => setTimeout(r, 450));
    }

    const scenario =
      demoScenarios.find((s) => s.request_text === requestText) ??
      demoScenarios[0];

    const demoResponse: WebhookResponse = {
      ...scenario.response,
      case_id: caseId,
    };

    updateCaseAnalysis(caseId, demoResponse);
    setLoading(false);
    onNavigate('analysis');
  };

  const loadScenario = (idx: number) => {
    const s = demoScenarios[idx];
    setRequestText(s.request_text);
    setLanguage(s.language);
    setSource(s.source);
    setError(null);
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 items-center justify-center mb-4">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            Analyzing with Sahayak AI
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Case ID: {activeCaseId}
          </p>
        </div>

        <Card>
          <div className="space-y-4">
            {processingSteps.map((step, i) => {
              const Icon = step.icon;
              const done = i < currentStep;
              const active = i === currentStep;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 transition-opacity ${i <= currentStep ? 'opacity-100' : 'opacity-40'}`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      done
                        ? 'bg-accent-50 text-accent-600'
                        : active
                          ? 'bg-brand-50 text-brand-600'
                          : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {done ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : active ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <span
                    className={`text-sm ${active ? 'font-medium text-gray-900' : done ? 'text-gray-600' : 'text-gray-400'}`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Submit a Request</h2>
        <p className="text-sm text-gray-500 mt-1">
          Enter the person's support request below. Sahayak AI will analyze it
          and return structured recommendations for human review.
        </p>
      </div>

      {willUseDemo && (
        <div className="flex items-start gap-3 bg-warning-50 border border-warning-200 rounded-xl p-4">
          <AlertCircle className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-warning-800">
              Demo Mode is active
            </p>
            <p className="text-sm text-warning-700 mt-0.5">
              {webhookReady
                ? 'Demo Mode is enabled in Settings. The app will use built-in demo responses instead of calling the Make webhook.'
                : 'No Make webhook URL is configured. The app will use built-in demo responses. You can add a webhook URL in Settings or via the VITE_MAKE_WEBHOOK_URL environment variable.'}
            </p>
          </div>
        </div>
      )}

      <Card>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Request Description
            </label>
            <textarea
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
              rows={6}
              placeholder="Describe the person's request in their own words. Include details like their name, age, location, what they need, and any relevant background..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
            />
            <p className="text-xs text-gray-400 mt-1.5">
              {requestText.length} characters
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) =>
                    setLanguage(e.target.value as Language)
                  }
                  className="w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white"
                >
                  {languages.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input Source
              </label>
              <div className="flex gap-2">
                {sources.map((s) => {
                  const Icon = sourceIcons[s];
                  return (
                    <button
                      key={s}
                      onClick={() => setSource(s)}
                      className={`flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded-lg border text-xs font-medium transition-colors ${
                        source === s
                          ? 'border-brand-300 bg-brand-50 text-brand-700'
                          : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {source === 'Voice' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Voice Recording (Optional)
              </label>
              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-brand-300 hover:bg-brand-50/30 transition-colors"
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setAudioName(f.name);
                  }}
                />
                <Mic className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                {audioName ? (
                  <p className="text-sm text-gray-700 font-medium">
                    {audioName}
                  </p>
                ) : (
                  <>
                    <p className="text-sm text-gray-600 font-medium">
                      Click to upload an audio file
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Audio-to-text is handled by the Make automation backend
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2 bg-danger-50 border border-danger-200 rounded-lg p-3">
              <AlertCircle className="w-4 h-4 text-danger-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-danger-700">{error}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleAnalyze(false)}
              disabled={!requestText.trim()}
              className="btn-primary flex-1"
            >
              <Sparkles className="w-4 h-4" />
              Analyze with Sahayak AI
            </button>
            {error && !willUseDemo && (
              <button
                onClick={() => {
                  setDemoMode(true);
                  handleAnalyze(true);
                }}
                className="btn-secondary"
              >
                Use Demo Mode
              </button>
            )}
          </div>
        </div>
      </Card>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Quick Demo Scenarios
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {demoScenarios.map((s, i) => (
            <button
              key={s.id}
              onClick={() => loadScenario(i)}
              className="text-left p-4 rounded-xl border border-gray-200 bg-white hover:border-brand-300 hover:shadow-sm transition-all"
            >
              <p className="text-sm font-semibold text-gray-900">{s.label}</p>
              <p className="text-xs text-gray-500 mt-1">{s.description}</p>
            </button>
          ))}
        </div>
      </div>

      <ResponsibleAI />
    </div>
  );
}
