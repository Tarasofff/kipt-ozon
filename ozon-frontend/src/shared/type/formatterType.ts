import React from 'react';

export type Formatter<T> = (value: T) => React.ReactNode;
