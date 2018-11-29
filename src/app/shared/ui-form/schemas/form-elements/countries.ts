import { Field } from '../../helpers/fields';

export const COUNTRIES = disabled => ({
  ...Field.field(
    'select',
    'country',
    {
      label: 'Country',
      placeholder: 'Select your country',
      options: [
        { label: 'United States of America', value: 'USA' },
        { label: 'Colombia', value: 'COL' },
        { label: 'India', value: 'IND' }
      ],
      required: true,
      disabled: disabled
    },
    { defaultValue: '' }
  )
});
