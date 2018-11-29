import { DEFAULT_FORM } from './default.form';
import { MONEY_FORM } from './money.form';

export const FORMS_VALUES = (disabled = false) => ({
  [DEFAULT_FORM().id]: DEFAULT_FORM(disabled).template,
  [MONEY_FORM().id]: MONEY_FORM(disabled).template
});
