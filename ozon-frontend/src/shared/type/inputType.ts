export type InputType = 'text' | 'date' | 'number' | 'email' | 'tel';

export type InputFieldConfig =
  | {
      element: 'input';
      type: InputType;
      placeholder?: string;
    }
  | {
      element: 'select';
      options: { value: string; label: string }[];
    };
