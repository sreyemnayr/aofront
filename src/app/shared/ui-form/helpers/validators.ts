export function maximumMoneyValidation(control, type) {
  const value = control.value;

  if (value) {
    const unMasked = parseInt(value.replace(/\D/g, ''));

    if (unMasked > 10000) {
      return { maximumMoneyValidation: 'Should be bellow 10.000' };
    }
  }

  return null;
}
