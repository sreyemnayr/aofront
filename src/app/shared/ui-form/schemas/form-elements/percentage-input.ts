import { Field } from '../../helpers/fields';

export const PERCENTAGE_INPUT = disabled => ({
  ...Field.field('percentage', 'percentage', {
    label: 'Enter you percentage from 1 to 100 %',
    description: 'Try to enter 200%',
    disabled: disabled
  })
});
