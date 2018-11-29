import { Field } from '../../helpers/fields';

export const MONEY_INPUT = disabled => ({
  ...Field.field(
    'money',
    'money-value',
    { disabled: disabled },
    {
      validators: {
        validation: ['maximumMoneyValidation']
      }
    }
  )
});
