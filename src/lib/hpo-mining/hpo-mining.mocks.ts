import { FenominalSentence } from '../models/fenominal-models';

export const mockFenominalSuccessResponse: FenominalSentence[] = [
  {
    start: 0,
    original_text: "The patient exhibits arachnodactyly.",
    segments: [
      { 
        kind: 'text', 
        text: "The patient exhibits ", 
        span: { start: 0, end: 21 } 
      },
      { 
        kind: 'hit', 
        text: "arachnodactyly", 
        hit: { 
          term_id: "HP:0001166", 
          label: "Arachnodactyly", 
          span: { start: 21, end: 35 }, 
          is_observed: true 
        } 
      },
      {
        kind: 'text',
        text: ".",
        span: { start: 35, end: 36 }
      }
    ]
  }
];