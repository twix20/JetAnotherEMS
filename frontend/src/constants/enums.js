export const enumPropFromValue = (enumType, value) => {
  for (var key in enumType) {
    if (enumType[key] === value) return key;
  }

  throw `Enum does'h contain value ${value}!`;
};

export const TicketStatus = {
  Unknown: 0,
  AwaitingApproval: 1,
  Approved: 2,
  Rejected: 3
};
