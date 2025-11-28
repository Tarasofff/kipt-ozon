import { InputType } from '@/shared/type/inputType';
import { FormEvent } from 'react';

const handlePhoneInput = (e: React.FormEvent<HTMLInputElement>) => {
  const inputEvent = e.nativeEvent as InputEvent;
  if (!inputEvent.data?.match(/[\d+]/)) {
    e.preventDefault();
  }
};

const handleTextInput = (e: React.FormEvent<HTMLInputElement>) => {
  const inputEvent = e.nativeEvent as InputEvent;
  if (!inputEvent.data?.match(/^[a-zA-Zа-яА-ЯёЁ]+$/)) {
    e.preventDefault();
  }
};

export const inputTypeHandlers: Record<InputType, ((e: FormEvent<HTMLInputElement>) => void) | undefined> = {
  text: handleTextInput,
  tel: handlePhoneInput,
  date: undefined,
  number: undefined,
  email: undefined,
};
