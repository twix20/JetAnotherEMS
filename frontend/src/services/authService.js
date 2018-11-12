import jwtDecode from 'jwt-decode';

export const extractUserFromToken = jwtToken => {
  const decoded = jwtDecode(jwtToken);
  const user = {
    token: jwtToken,
    userId: decoded['sub'],
    email:
      decoded[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
      ],
    roles: [
      decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    ]
  };

  return user;
};
