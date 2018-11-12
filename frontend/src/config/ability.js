import { AbilityBuilder, Ability } from '@casl/ability';

function populateCommonAbilities(can) {
  can('follow', 'SchoolingEvent');
}

const defaultAbility = AbilityBuilder.define(can => {
  populateCommonAbilities(can);
});

export const abilityForUser = user => {
  const { rules, can, cannot } = AbilityBuilder.extract();

  populateCommonAbilities(can);

  if (!user) {
    return rules;
  }

  if (user.roles.includes('Company')) {
    can('readParticipiants', 'SchoolingEvent', { hasCreated: true });
    can('create', 'SchoolingEvent');
    can('update', 'SchoolingEvent', { hasCreated: true });
  }

  if (user.roles.includes('User')) {
    can('buyTicket', 'SchoolingEvent');
  }

  return new Ability(rules);
};

export default defaultAbility;
