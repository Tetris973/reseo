'use client';

import { Textarea } from '@mantine/core';
import { useTokenAnalysisStore } from '@webRoot/src/app/token-analyzer/store/token-analysis.store';

interface DescriptionInputProps {
  placeholder?: string;
}

export function DescriptionInput({ placeholder = 'Enter job description' }: DescriptionInputProps) {
  const inputText = useTokenAnalysisStore((state) => state.inputText);
  const setText = useTokenAnalysisStore((state) => state.setText);

  return (
    <Textarea
      placeholder={placeholder}
      label="Job Description"
      description="Enter the job description to analyze key terms"
      autosize
      minRows={4}
      maxRows={8}
      value={inputText}
      onChange={(e) => setText(e.target.value)}
    />
  );
}
