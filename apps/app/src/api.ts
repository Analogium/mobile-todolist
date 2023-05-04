import axios from 'axios';

const API_URL = 'http://localhost:5001/api/v1';

const apiClient = axios.create({
  baseURL: API_URL,
});

// Fonction pour récupérer toutes les todolists
export function getTodoLists() {
  return apiClient.get('/lists');
}

// Fonction pour récupérer une todolist spécifique
export function getTodoList(id: string) {
  return apiClient.get(`/lists/${id}`);
}

// Fonction pour créer une nouvelle todolist
export function createTodoList(todoListData: { title: string }) {
  return apiClient.post('/lists', todoListData);
}

// Fonction pour mettre à jour une todolist existante
export function updateTodoList(id: string, todoListData: any) {
  return apiClient.put(`/lists/${id}`, todoListData);
}

// Fonction pour supprimer une todolist
export function deleteTodoList(id: string) {
  return apiClient.delete(`/lists/${id}`);
}
