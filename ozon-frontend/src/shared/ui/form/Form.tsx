import { useKeyboardNavigation } from '@/shared/hooks/useKeyboardNavigation';
import { InputFieldConfig } from '@/shared/type/inputType';
import { inputTypeHandlers } from '@/shared/lib/input/inputUtils';
import React, { ReactNode } from 'react';

// type FormFields = Record<keyof Patient, InputFieldConfig>;

interface ClassNames {
  form?: string;
  input?: string;
  select?: string;
  title?: string;
  children?: string;
}

interface FormProps<T> {
  inputFields: Record<keyof T, InputFieldConfig>;
  formFields: any; //T
  className?: ClassNames;
  onChange?: (field: any) => void;
  children?: ReactNode;
  title?: string;
  keyboardNavigation?: () => void;
}

const defaultStyle: ClassNames = {
  form: 'bg-gray-900 p-4 rounded-xl mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-6',
  input: 'px-3 py-2 rounded-lg bg-gray-800 text-white',
  select: 'px-3 py-2 rounded-lg bg-gray-800 text-white',
  title: 'text-2xl font-bold mb-4',
  children: 'col-span-full flex items-center gap-4 mt-2',
};

const Form = <T,>({
  inputFields,
  formFields,
  className,
  children,
  onChange,
  title,
  keyboardNavigation,
}: FormProps<T>) => {
  const { inputsRef, handleKeyDown } = useKeyboardNavigation(() => keyboardNavigation);

  return (
    <div onClick={(e) => e.stopPropagation()} className={className?.form || defaultStyle.form}>
      {title && <span className={className?.title || defaultStyle.title}>{title}</span>}

      {/* закрыть форму */}
      {/* <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold">
        ✕
      </button> */}

      {Object.keys(formFields).map((field, index) => {
        const config = inputFields[field as keyof T];

        if (config.element === 'select') {
          return (
            <select
              key={field}
              value={formFields[field as keyof T]}
              ref={(el) => keyboardNavigation && el && (inputsRef.current[index] = el)}
              onChange={(e) => onChange && onChange({ [field]: e.target.value })}
              onKeyDown={(e) => keyboardNavigation && handleKeyDown(e, index)}
              className={className?.input || defaultStyle.input}
            >
              {config.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          );
        }

        return (
          <input
            key={field}
            ref={(el) => keyboardNavigation && el && (inputsRef.current[index] = el)}
            type={config.type}
            placeholder={config?.placeholder}
            onBeforeInput={inputTypeHandlers[config.type]}
            onKeyDown={(e) => keyboardNavigation && handleKeyDown(e, index)}
            value={formFields[field as keyof T]}
            onChange={(e) => onChange && onChange({ [field]: e.target.value })}
            className={className?.input || defaultStyle.input}
          />
        );
      })}

      {children && <div className={className?.children || defaultStyle.children}>{children}</div>}
    </div>
  );
};
export default React.memo(Form);
