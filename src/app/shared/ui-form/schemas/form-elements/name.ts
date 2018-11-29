import { Field } from '../../helpers/fields';

let startTyping = true;

export const NAME = disabled => {
  const templateOptions = {
    label: 'Name',
    placeholder: 'Enter your name',
    required: false,
    disabled: disabled
  };

  return {
    ...Field.input('name', {
      ...templateOptions
    })
  };
};

export const FIRST_NAME = disabled => {
  const templateOptions = {
    label: 'First name',
    placeholder: 'Enter first name',
    required: true,
    disabled: disabled
  };

  return {
    ...Field.input('first_name', {
      ...templateOptions
    })
  };
};
