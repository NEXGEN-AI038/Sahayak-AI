import type { WebhookResponse, CaseRecord } from '@/types';

export const MAKE_WEBHOOK_URL = import.meta.env.VITE_MAKE_WEBHOOK_URL as
  | string
  | undefined;

export const isWebhookConfigured = (): boolean =>
  Boolean(MAKE_WEBHOOK_URL && MAKE_WEBHOOK_URL.trim() !== '');

export interface WebhookPayload {
  case_id: string;
  request_text: string;
  language: string;
  source: string;
  submitted_at: string;
}

export class WebhookError extends Error {
  constructor(message: string, public kind: 'timeout' | 'network' | 'invalid' | 'server') {
    super(message);
    this.name = 'WebhookError';
  }
}

const TIMEOUT_MS = 30_000;

function validateResponse(data: unknown): data is WebhookResponse {
  if (!data || typeof data !== 'object') return false;
  const r = data as Record<string, unknown>;
  return (
    typeof r.case_id === 'string' &&
    typeof r.category === 'string' &&
    typeof r.summary === 'string'
  );
}

export async function sendToMake(
  payload: WebhookPayload,
  signal?: AbortSignal,
): Promise<WebhookResponse> {
  if (!isWebhookConfigured()) {
    throw new WebhookError('Webhook URL not configured', 'network');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const combinedSignal = signal ?? controller.signal;

  try {
    const res = await fetch(MAKE_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: combinedSignal,
    });

    if (!res.ok) {
      throw new WebhookError(
        `Server returned ${res.status}`,
        'server',
      );
    }

    const text = await res.text();
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      throw new WebhookError('Invalid JSON response from webhook', 'invalid');
    }

    if (!validateResponse(data)) {
      throw new WebhookError('Response missing required fields', 'invalid');
    }

    return data as WebhookResponse;
  } catch (err) {
    if (err instanceof WebhookError) throw err;
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new WebhookError('Request timed out', 'timeout');
    }
    throw new WebhookError(
      err instanceof Error ? err.message : 'Network error',
      'network',
    );
  } finally {
    clearTimeout(timeout);
  }
}

export function createCaseId(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `CASE-${num}`;
}

export function buildCaseRecord(
  caseId: string,
  requestText: string,
  language: string,
  source: string,
): CaseRecord {
  return {
    case_id: caseId,
    request_text: requestText,
    language: language as CaseRecord['language'],
    source: source as CaseRecord['source'],
    submitted_at: new Date().toISOString(),
    status: 'Needs Review',
  };
}
