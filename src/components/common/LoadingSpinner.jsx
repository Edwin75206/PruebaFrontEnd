import React from 'react';
import { Icon } from '../../icons';

export const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8 text-indigo-600">
    <Icon name="spinner" className="h-7 w-7 animate-spin" />
  </div>
);
