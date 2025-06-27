import { create } from "zustand";
import { persist } from "zustand/middleware";

// CRIADO A STORE DAS TASKS COM LOCALSTORAGE
export const createTaskStore = (storageKey) =>
  create(
    persist(
      (set) => ({
        // ARRAY DE TASKS
        tasks: [],
        // DEFINIR A TASK
        defineTask: (text) =>
          set((state) => ({
            tasks: [
              ...state.tasks,
              { id: crypto.randomUUID(), task: text, completed: false },
            ],
          })),
        // REMOVER TASK
        removeTask: (id) =>
          set((state) => ({
            tasks: state.tasks.filter((t) => t.id !== id),
          })),
        // ALTERNAR ESTADO DA TASK
        toggleCompleted: (id) =>
          set((state) => ({
            tasks: state.tasks.map((t) =>
              t.id === id ? { ...t, completed: !t.completed } : t
            ),
          })),
      }),
      {
        name: storageKey, // GUARDADO NO LOCALSTORAGE COM A DATA DO DIA
      }
    )
  );

export default createTaskStore;
