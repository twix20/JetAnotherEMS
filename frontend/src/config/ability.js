import { AbilityBuilder, Ability } from '@casl/ability';

function populateCommonAbilities(can) {}

const defaultAbility = AbilityBuilder.define(can => {
  populateCommonAbilities(can);
});

export const abilityForUser = user => {
  const { rules, can, cannot } = AbilityBuilder.extract();

  populateCommonAbilities(can);

  if (!user) {
    return new Ability(rules);
  }

  if (user.roles.includes('Company')) {
    can('readParticipiants', 'SchoolingEvent', { hasCreated: true });
    can('create', 'SchoolingEvent');
    can('update', 'SchoolingEvent', { hasCreated: true });
    can('follow', 'SchoolingEvent');
  }

  if (user.roles.includes('User')) {
    can('buyTicket', 'SchoolingEvent');
    can('follow', 'SchoolingEvent');
  }

  console.log(new Ability(rules));

  return new Ability(rules);
};

export default defaultAbility;
