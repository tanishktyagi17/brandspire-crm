const USERS_KEY = "crm_users";
const CURRENT_USER_KEY = "crm_current_user";

/**
 * Get all registered users
 */
export function getUsers() {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error("Error loading users:", error);
    return [];
  }
}

/**
 * Save all users
 */
export function saveUsers(users) {
  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );
}

/**
 * Register User
 */
export function registerUser(user) {
  const users = getUsers();

  const emailExists = users.some(
    (item) =>
      item.email.toLowerCase() ===
      user.email.toLowerCase()
  );

  if (emailExists) {
    return {
      success: false,
      message: "Email already exists.",
    };
  }

  const newUser = {
    id: Date.now(),
    name: user.name,
    email: user.email,
    password: user.password,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  saveUsers(users);

  return {
    success: true,
    user: newUser,
  };
}

/**
 * Login User
 */
export function loginUser(email, password) {
  const users = getUsers();

  const user = users.find(
    (item) =>
      item.email.toLowerCase() ===
        email.toLowerCase() &&
      item.password === password
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(user)
  );

  return {
    success: true,
    user,
  };
}

/**
 * Get Current User
 */
export function getCurrentUser() {
  try {
    const user = localStorage.getItem(
      CURRENT_USER_KEY
    );

    return user ? JSON.parse(user) : null;
  } catch (error) {
    return null;
  }
}

/**
 * Check Authentication
 */
export function isAuthenticated() {
  return getCurrentUser() !== null;
}

/**
 * Logout
 */
export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}