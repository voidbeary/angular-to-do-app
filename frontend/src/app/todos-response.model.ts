import { ToDo } from './todo.model';

export type TodosResponse = {
  data?: {
    todos?: ToDo[];
  };
};
