/**
 * Flaky Test Analyzer
 */

export interface FlakyResult {
  counts: {
    flaky: number;
    failing: number;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface BuildSummary {
  runId?: string;
  [key: string]: any;
}

export async function analyzeFlaky(
  prevBuild: BuildSummary,
  currBuild: BuildSummary,
  hasApiKey: boolean
): Promise<FlakyResult> {
  return {
    counts: {
      flaky: 0,
      failing: 0,
    },
  };
}
