// Simple in-memory storage for testing
// In production, replace this with actual database operations

interface User {
  _id: string;
  fullName: string;
  phone: string;
  fileUpload: string;
  createdAt: string;
  updatedAt: string;
}

let users: User[] = [];
let nextId = 1;

export function getAllUsers(): User[] {
  return [...users]; // Return a copy to prevent mutations
}

export function addUser(userData: Omit<User, '_id' | 'createdAt' | 'updatedAt'>): User {
  const newUser: User = {
    _id: `user_${nextId++}`,
    ...userData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  users.push(newUser);
  return newUser;
}

export function getUserById(id: string): User | undefined {
  return users.find(user => user._id === id);
}

export function deleteUser(id: string): boolean {
  const index = users.findIndex(user => user._id === id);
  if (index !== -1) {
    users.splice(index, 1);
    return true;
  }
  return false;
}

export function clearUsers(): void {
  users = [];
  nextId = 1;
}
