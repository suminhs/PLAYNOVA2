export default class Database {
  constructor() {
    this.localKey = "PLAYNOVA_USERS";
    this.sessionKey = "PLAYNOVA_SESSION";

    // inicializar lista de usuarios si no existe
    if (!localStorage.getItem(this.localKey)) {
      localStorage.setItem(this.localKey, JSON.stringify([]));
    }
  }

  // obtener todos los usuarios
  getUsers() {
    return JSON.parse(localStorage.getItem(this.localKey)) || [];
  }

  // guardar usuarios
  saveUsers(users) {
    localStorage.setItem(this.localKey, JSON.stringify(users));
  }

  // registrar usuario nuevo
  registerUser(user) {
    const users = this.getUsers();

    // verificar si correo ya existe
    if (users.some(u => u.email === user.email)) {
      return { success: false, message: "El correo ya está registrado" };
    }

    // verificar si usuario ya existe
    if (users.some(u => u.username === user.username)) {
      return { success: false, message: "El nombre de usuario ya está en uso" };
    }

    users.push(user);
    this.saveUsers(users);

    return { success: true, message: "Usuario registrado con éxito" };
  }

  // login
  login(email, password) {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem(this.sessionKey, JSON.stringify(user));
      return { success: true, message: "Inicio de sesión exitoso", user };
    } else {
      return { success: false, message: "Correo o contraseña incorrectos" };
    }
  }

  // cerrar sesión
  logout() {
    localStorage.removeItem(this.sessionKey);
  }

  // obtener usuario en sesión
  getCurrentUser() {
    return JSON.parse(localStorage.getItem(this.sessionKey));
  }

  // actualizar datos de perfil
  updateProfile(updatedUser) {
    const users = this.getUsers();
    const index = users.findIndex(u => u.email === updatedUser.email);

    if (index !== -1) {
      users[index] = { ...users[index], ...updatedUser };
      this.saveUsers(users);
      localStorage.setItem(this.sessionKey, JSON.stringify(users[index]));
      return { success: true, message: "Perfil actualizado con éxito" };
    }
    return { success: false, message: "Usuario no encontrado" };
  }

  // recuperar contraseña (simulado)
  recoverPassword(email) {
    const users = this.getUsers();
    const user = users.find(u => u.email === email);

    if (user) {
      // en un sistema real se enviaría correo, aquí simulamos
      return { success: true, message: "Se ha enviado un enlace de recuperación al correo" };
    }
    return { success: false, message: "El correo no está registrado" };
  }
}