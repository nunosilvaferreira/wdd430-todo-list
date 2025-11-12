import React, { createContext, useContext, useState } from 'react';

// Textos em Português
const portuguese = {
  // List Manager
  myLists: "As Minhas Listas",
  newList: "Nova lista...",
  rename: "Renomear",
  delete: "Eliminar",
  deleteList: "Eliminar lista",
  
  // Todo Form
  newTask: "Nova Tarefa",
  whatNeedsDone: "O que precisas fazer?",
  add: "Adicionar",
  
  // Todo List
  todoList: "Lista de Tarefas",
  pending: "pendentes",
  pendingCount: "{count} pendentes",
  noTasks: "Nenhuma tarefa nesta lista. Adiciona a primeira tarefa!",
  pendingSection: "Pendentes",
  completedSection: "Concluídas",
  
  // Todo Item
  deleteTask: "Eliminar",
  
  // Alerts
  deleteLastList: "Não podes eliminar a última lista!",
  
  // App
  appName: "Todo List"
};

// Textos em English
const english = {
  // List Manager
  myLists: "My Lists",
  newList: "New list...",
  rename: "Rename",
  delete: "Delete",
  deleteList: "Delete list",
  
  // Todo Form
  newTask: "New Task",
  whatNeedsDone: "What needs to be done?",
  add: "Add",
  
  // Todo List
  todoList: "Todo List",
  pending: "pending",
  pendingCount: "{count} pending",
  noTasks: "No tasks in this list. Add the first task!",
  pendingSection: "Pending",
  completedSection: "Completed",
  
  // Todo Item
  deleteTask: "Delete",
  
  // Alerts
  deleteLastList: "You cannot delete the last list!",
  
  // App
  appName: "Todo List"
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('appLanguage') || 'portuguese';
  });

  const translations = language === 'portuguese' ? portuguese : english;

  const toggleLanguage = () => {
    const newLanguage = language === 'portuguese' ? 'english' : 'portuguese';
    setLanguage(newLanguage);
    localStorage.setItem('appLanguage', newLanguage);
  };

  const t = (key, params = {}) => {
    let text = translations[key] || key;
    
    // Substitui parâmetros como {count}
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}