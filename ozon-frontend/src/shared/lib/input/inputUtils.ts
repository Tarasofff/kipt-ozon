export const handlePhoneInput = (e: React.FormEvent<HTMLInputElement>) => {
  const inputEvent = e.nativeEvent as InputEvent;
  if (!inputEvent.data?.match(/[\d+]/)) {
    e.preventDefault();
  }
};

export const handleTextInput = (e: React.FormEvent<HTMLInputElement>) => {
  const inputEvent = e.nativeEvent as InputEvent;
  if (!inputEvent.data?.match(/^[a-zA-Zа-яА-ЯёЁ]+$/)) {
    e.preventDefault();
  }
};
