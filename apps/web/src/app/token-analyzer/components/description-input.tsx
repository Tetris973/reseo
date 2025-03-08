'use client';

import { Textarea } from '@mantine/core';
import { useInputText, useTokenAnalysisActions } from '@web/app/token-analyzer/store/token-analysis-store.hooks';

interface DescriptionInputProps {
  placeholder?: string;
}

export function DescriptionInput({ placeholder = 'Enter job description' }: DescriptionInputProps) {
  const inputText = useInputText();
  const setText = useTokenAnalysisActions().setText;

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
