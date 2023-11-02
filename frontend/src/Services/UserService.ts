import api from '../config/Api';
import { User } from '../types/models/User.model';

/**
 * User Service
 */


type newUser = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const UserService = {
  getUser: (id: string) => {
    return api.get(`/user/${id}`);
  },
  updateUser: async (id: string, user: newUser) => {
    const data = await api.put(`/user/${id}`, {firstName: user.firstname, lastName: user.lastname, email: user.email, password: user.password}).catch((error) => {
      throw error;
    });
    return data.data;
  },
  addUser: async (user : newUser) => {
    const data = await api.post('/user/register', {firstName: user.firstname, lastName: user.lastname, email: user.email, password: user.password}).catch((error) => {;
      throw error;
    });
    return data.data;
  },
  addAllUsers: (users: User[]) => {
    return api.post('/user/list', users);
  },
  getAllUsers: async () => {
    //return api.get(`/users`);
    const data = await api.get(`/user`).catch((error) => {;
      throw error;
    });
    return data.data;
  },

  deleteUser: (id: string) => {
    return api.delete(`/user/${id}`);
  },

  getUserByID: async (userID: string): Promise<User> => {
    const { data } = await api.get<User>(`/user/${userID}`);
    return data;
  },
};

export default UserService;
