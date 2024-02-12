import { createRequire } from "module";
import { v4 } from "uuid";
import { UserModel } from "../models/user.model";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { writeUsersToFile } from "../utils/handleUser.utils";

const requireJSON = createRequire(import.meta.url);
const users: UserModel[] = requireJSON("../utils/users.json");

export function findAll() {
  return new Promise((resolve, reject) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const pathToFile = path.join(__dirname, "..", "utils", "users.json");
    readFile(pathToFile).then((data) => {
      return resolve(JSON.parse(data.toString()));
    });
  });
}

export function findById(id: string): Promise<UserModel> {
  return new Promise((resolve, reject) => {
    const user = users.find((user: UserModel) => user.id === id);
    resolve(user!);
  });
}

export function create(user: UserModel) {
  return new Promise((resolve, reject) => {
    const newUser = { id: v4(), ...user };
    users.push(newUser);
    writeUsersToFile(users);
    resolve(newUser);
  });
}

export function update(id: string, userData: UserModel) {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((p) => p.id === id);
    users[index] = { id, ...userData };
    writeUsersToFile(users);
    resolve(users[index]);
  });
}

export function remove(id: string) {
  return new Promise(async (resolve, reject) => {
    const usersAfterDelete = users.filter((user) => {
      if (user.id !== id) {
        return user;
      }
    });
    writeUsersToFile(usersAfterDelete);
    resolve(usersAfterDelete);
  });
}
