import app from "firebase/app";
import { config } from "../config";

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firebase();
    this.storage = app.storage();
  }

  // *** Auth API ***

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  // *** User API ***

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  }

  getCurrentUser() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  addTodo(todo) {
    if (!this.auth.currentUser) {
      return alert("Authorization required");
    }
    return this.db
      .collection("todo" + this.auth.currentUser.uid)
      .doc()
      .set(Object.assign({}, todo));
  }

  displayAllTodos() {
    return this.db
      .collection("todo" + this.auth.currentUser.uid)
      .get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          const todo = { id: doc.id, ...doc.data() };
          list.push(todo);
        });
        return list;
      });
  }

  deleteTodo(id) {
    return this.db
      .collection("todo" + this.auth.currentUser.uid)
      .doc(id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  }
}

export default new Firebase();
