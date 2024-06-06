// role.js
const ADMIN: string = 'ADMIN';
const USER: string = 'USER';
const SUBMITTER: string = 'SUBMITTER';

const VALID_ROLES: string[] = [
  ADMIN,
  USER,
  SUBMITTER
];

module.exports = {
  ADMIN,
  USER,
  SUBMITTER,

  VALID_ROLES
};