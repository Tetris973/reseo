'use client';

import { Textarea } from '@mantine/core';
import { useTokenAnalysis } from '@web/app/token-analyzer/context/tokenAnalysisContext';

interface DescriptionInputProps {
  placeholder?: string;
}

export function DescriptionInput({ placeholder = 'Enter job description' }: DescriptionInputProps) {
  const { state, setText } = useTokenAnalysis();

  return (
    <Textarea
      placeholder={placeholder}
      label="Job Description"
      description="Enter the job description to analyze key terms"
      autosize
      minRows={4}
      maxRows={8}
      value={state.inputText}
      onChange={(e) => setText(e.target.value)}
    />
  );
}
