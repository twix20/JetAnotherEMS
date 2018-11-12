import React from 'react';
import { createCanBoundTo } from '@casl/react';
import ability from './../../config/ability';

export default createCanBoundTo(ability);

// class Can extends React.Component {
//   render() {
//     const ability = abilityForUser({ roles: ["Company"] });

//     console.log(ability);

//     return createCanBoundTo(ability);
//   }
// }

// export default Can;
