import { PERCENTAGE_INPUT, MONEY_INPUT } from './form-elements';

export const MONEY_FORM = (disabled = false) => ({
  id: 'MONEY',
  template: [
    {
      key: 'money',
      wrappers: ['panel'],
      templateOptions: {
        label: 'Formly'
      },
      fieldGroup: [MONEY_INPUT(disabled), PERCENTAGE_INPUT(disabled)]
    }
  ]
});
