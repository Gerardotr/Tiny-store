import Role, { ROLES } from '../models/Role';

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;

     await Role.insertMany(ROLES);
  } catch (error) {
    console.log(error);
  }
};
