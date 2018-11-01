export const composeValidators = (...validators) => (value, allValues) =>
  validators.reduce(
    (error, validator) => error || validator(value, allValues),
    undefined
  );

export const required = value => (value ? undefined : 'Required');
