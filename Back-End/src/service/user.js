const { getChildLogger } = require("../core/logger");
const { tables, getKnex } = require("../data/index");
const { hashPassword, verifyPassword } = require("../core/password");
const { generateJWT, verifyJWT } = require("../core/jwt");
const Role = require("../core/roles");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("user-service");
  this.logger.debug(message, meta);
};

const checkAndParseSession = async (authHeader) => {
  if (!authHeader) {
    throw new Error("You need to be signed in");
  }

  if (!authHeader.startsWith("Bearer ")) {
    throw new Error("Invalid authentication token");
  }

  const authToken = authHeader.substr(7);
  try {
    const { roles, userId } = await verifyJWT(authToken);

    return {
      userId,
      roles,
      authToken,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const checkRole = (role, roles) => {
  const hasPermission = roles.includes(role);

  if (!hasPermission) {
    throw new Error("You are not allowed to view this part of the application");
  }
};

const makeExposedUser = ({ userId, voornaam, achternaam, email, roles }) => ({
  userId,
  voornaam,
  achternaam,
  email,
  roles,
});
const makeLoginData = async (user) => {
  const token = await generateJWT(user);
  return {
    user: makeExposedUser(user),
    token,
  };
};

const findAllUsers = async () => {
  const USERS = await getKnex()(tables.user).select();
  return USERS;
};

const findUserByEmail = (email) => {
  return getKnex()(tables.user).where("email", email).first();
};

const registerUser = async ({
  voornaam,
  achternaam,
  email,
  geboorteDatum,
  password,
}) => {
  let existingEmail = await findUserByEmail(email);

  debugLog("Creating a new user", { voornaam });

  const hashedPassword = await hashPassword(password);

  if (existingEmail) {
    throw new Error("Email already in use");
  } else {
    try {
      const user = await getKnex()(tables.user).insert({
        voornaam,
        achternaam,
        email,
        geboorteDatum,
        password: hashedPassword,
        roles: [Role.USER],
      });
      debugLog(`${voornaam} registered`);
      return await makeLoginData(user);
    } catch (error) {
      throw new Error("Could not register user");
    }
  }
};

const login = async ({ email, password }) => {
  const userChecker = await findUserByEmail(email);

  if (!userChecker) {
    throw new Error("Email and password do not match");
  }

  const passwordValid = await verifyPassword(password, userChecker.password);
  if (passwordValid) {
    debugLog(`${userChecker.voornaam} signed in`);
    return await makeLoginData(userChecker);
  } else {
    throw new Error("Email and password do not match");
  }
};

const getUserById = async (userId) => {
  return await getKnex()(tables.user).where("userId", userId).first();
};

const deleteById = async (userId) => {
  try {
    await getKnex()(tables.user)
      .delete()
      .where(`${tables.user}.userId`, userId);
    debugLog("user deleted");
  } catch (error) {
    throw new Error("could not delete user");
  }
};

module.exports = {
  registerUser,
  findAllUsers,
  findUserByEmail,
  login,
  checkAndParseSession,
  checkRole,
  getUserById,
  deleteById,
};
