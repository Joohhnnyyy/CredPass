"use client";

import React, { useState } from "react";
import { Plus, Trash2, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      <div className="p-8 bg-black text-white">
        <h2 className="text-3xl font-light tracking-tight">Tasks</h2>
        <p className="text-gray-400 mt-2 text-sm uppercase tracking-wider">
          {todos.filter((t) => !t.completed).length} pending
        </p>
      </div>

      <div className="p-6">
        <form onSubmit={addTodo} className="relative mb-8">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task..."
            className="w-full pl-6 pr-14 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-black/5 outline-none transition-all placeholder:text-gray-400 text-gray-800"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-95 transition-all"
          >
            <Plus size={20} />
          </button>
        </form>

        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence initial={false} mode="popLayout">
            {todos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                layout
                className={`group flex items-center justify-between p-4 rounded-2xl transition-all ${
                  todo.completed ? "bg-gray-50" : "bg-white border border-gray-100 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      todo.completed
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {todo.completed && <Check size={14} className="text-white" />}
                  </button>
                  <span
                    className={`truncate text-base transition-all ${
                      todo.completed
                        ? "text-gray-400 line-through"
                        : "text-gray-800 font-medium"
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {todos.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10 text-gray-400"
            >
              <p>No tasks yet</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
