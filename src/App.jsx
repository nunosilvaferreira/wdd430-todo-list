import { useState, useEffect } from 'react'
import './App.css'

// Textos em duas línguas
const translations = {
  portuguese: {
    myLists: "As Minhas Listas",
    newList: "Nova lista...",
    newTask: "Nova Tarefa",
    whatNeedsDone: "O que precisas fazer?",
    add: "Adicionar",
    todoList: "Lista de Tarefas",
    pendingCount: "{count} pendentes",
    noTasks: "Nenhuma tarefa nesta lista. Adiciona a primeira tarefa!",
    pendingSection: "Pendentes",
    completedSection: "Concluídas",
    deleteTask: "Eliminar",
    deleteLastList: "Não podes eliminar a última lista!",
    mainList: "Principal",
    rename: "Renomear",
    deleteList: "Eliminar lista"
  },
  english: {
    myLists: "My Lists",
    newList: "New list...",
    newTask: "New Task",
    whatNeedsDone: "What needs to be done?",
    add: "Add",
    todoList: "Todo List",
    pendingCount: "{count} pending",
    noTasks: "No tasks in this list. Add the first task!",
    pendingSection: "Pending",
    completedSection: "Completed",
    deleteTask: "Delete",
    deleteLastList: "You cannot delete the last list!",
    mainList: "Main",
    rename: "Rename", 
    deleteList: "Delete list"
  }
}

export default function App() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('appLanguage') || 'portuguese'
  })
  
  const [lists, setLists] = useState(() => {
    const localValue = localStorage.getItem("TODOLISTS")
    if (localValue == null) return [
      { 
        id: crypto.randomUUID(), 
        name: translations[language].mainList, 
        todos: [],
        createdAt: new Date().toISOString()
      }
    ]
    return JSON.parse(localValue)
  })

  const [currentListId, setCurrentListId] = useState(() => {
    const saved = localStorage.getItem("CURRENT_LIST")
    if (saved) return saved
    return lists[0]?.id || ""
  })

  useEffect(() => {
    localStorage.setItem("TODOLISTS", JSON.stringify(lists))
    localStorage.setItem("CURRENT_LIST", currentListId)
  }, [lists, currentListId])

  // Função de tradução
  const t = (key, params = {}) => {
    let text = translations[language][key] || key
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param])
    })
    return text
  }

  const toggleLanguage = () => {
    const newLanguage = language === 'portuguese' ? 'english' : 'portuguese'
    setLanguage(newLanguage)
    localStorage.setItem('appLanguage', newLanguage)
  }

  const currentList = lists.find(list => list.id === currentListId) || lists[0]

  function addTodo(title) {
    setLists(currentLists => {
      return currentLists.map(list => {
        if (list.id === currentListId) {
          return {
            ...list,
            todos: [
              ...list.todos,
              { id: crypto.randomUUID(), title, completed: false, createdAt: new Date().toISOString() }
            ]
          }
        }
        return list
      })
    })
  }

  function toggleTodo(id, completed) {
    setLists(currentLists => {
      return currentLists.map(list => {
        if (list.id === currentListId) {
          return {
            ...list,
            todos: list.todos.map(todo => {
              if (todo.id === id) {
                return { ...todo, completed }
              }
              return todo
            })
          }
        }
        return list
      })
    })
  }

  function deleteTodo(id) {
    setLists(currentLists => {
      return currentLists.map(list => {
        if (list.id === currentListId) {
          return {
            ...list,
            todos: list.todos.filter(todo => todo.id !== id)
          }
        }
        return list
      })
    })
  }

  function addList(name) {
    const newList = {
      id: crypto.randomUUID(),
      name: name.trim(),
      todos: [],
      createdAt: new Date().toISOString()
    }
    
    setLists(currentLists => [...currentLists, newList])
    setCurrentListId(newList.id)
  }

  function deleteList(id) {
    if (lists.length <= 1) {
      alert(t('deleteLastList'))
      return
    }

    setLists(currentLists => {
      const filteredLists = currentLists.filter(list => list.id !== id)
      
      if (id === currentListId && filteredLists.length > 0) {
        setCurrentListId(filteredLists[0].id)
      }
      
      return filteredLists
    })
  }

  function renameList(id, newName) {
    setLists(currentLists => {
      return currentLists.map(list => {
        if (list.id === id) {
          return { ...list, name: newName.trim() }
        }
        return list
      })
    })
  }

  // Componente ListManager inline para simplificar
  function ListManager() {
    const [newListName, setNewListName] = useState("")
    const [editingListId, setEditingListId] = useState(null)
    const [editListName, setEditListName] = useState("")

    function handleAddList(e) {
      e.preventDefault()
      if (newListName.trim()) {
        addList(newListName)
        setNewListName("")
      }
    }

    function startEditing(list) {
      setEditingListId(list.id)
      setEditListName(list.name)
    }

    function handleRename(listId) {
      if (editListName.trim()) {
        renameList(listId, editListName)
      }
      setEditingListId(null)
      setEditListName("")
    }

    function cancelEditing() {
      setEditingListId(null)
      setEditListName("")
    }

    return (
      <div className="list-manager">
        <div className="lists-section">
          <h3>{t('myLists')}</h3>
          
          <form onSubmit={handleAddList} className="add-list-form">
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder={t('newList')}
              className="list-input"
            />
            <button type="submit" className="btn btn-small">+</button>
          </form>

          <div className="lists-container">
            {lists.map(list => (
              <div 
                key={list.id} 
                className={`list-item ${list.id === currentListId ? 'active' : ''}`}
              >
                <div className="list-content">
                  {editingListId === list.id ? (
                    <input
                      type="text"
                      value={editListName}
                      onChange={(e) => setEditListName(e.target.value)}
                      onBlur={() => handleRename(list.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRename(list.id)
                        if (e.key === 'Escape') cancelEditing()
                      }}
                      className="list-edit-input"
                      autoFocus
                    />
                  ) : (
                    <button
                      onClick={() => setCurrentListId(list.id)}
                      className="list-select-btn"
                    >
                      <span className="list-name">{list.name}</span>
                      <span className="list-count">
                        ({list.todos.filter(t => !t.completed).length})
                      </span>
                    </button>
                  )}
                </div>

                <div className="list-actions">
                  {editingListId !== list.id && (
                    <>
                      <button 
                        onClick={() => startEditing(list)}
                        className="btn-icon"
                        title={t('rename')}
                      >
                        ✏️
                      </button>
                      {lists.length > 1 && (
                        <button 
                          onClick={() => deleteList(list.id)}
                          className="btn-icon btn-danger"
                          title={t('deleteList')}
                        >
                          🗑️
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Componente TodoForm inline
  function TodoForm() {
    const [item, setItem] = useState("")

    function handleSubmit(e) {
      e.preventDefault()
      
      if (item.trim() === "") return
      
      addTodo(item)
      setItem("")
    }

    return (
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">{t('newTask')}</label>
          <input
            value={item}
            onChange={e => setItem(e.target.value)}
            type="text"
            id="item"
            placeholder={t('whatNeedsDone')}
          />
        </div>
        <button className="btn">{t('add')}</button>
      </form>
    )
  }

  // Componente TodoList inline
  function TodoList() {
    const completedTodos = currentList?.todos.filter(todo => todo.completed) || []
    const pendingTodos = currentList?.todos.filter(todo => !todo.completed) || []

    return (
      <div className="todo-list-container">
        {currentList?.todos.length === 0 ? (
          <div className="empty-state">
            <p>{t('noTasks')}</p>
          </div>
        ) : (
          <>
            {pendingTodos.length > 0 && (
              <div className="todos-section">
                <h4>{t('pendingSection')} ({pendingTodos.length})</h4>
                <ul className="list">
                  {pendingTodos.map(todo => (
                    <li key={todo.id}>
                      <label>
                        <input 
                          type="checkbox" 
                          checked={todo.completed}
                          onChange={e => toggleTodo(todo.id, e.target.checked)}
                        />
                        {todo.title}
                      </label>
                      <button 
                        className="btn btn-danger"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        {t('deleteTask')}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {completedTodos.length > 0 && (
              <div className="todos-section">
                <h4>{t('completedSection')} ({completedTodos.length})</h4>
                <ul className="list">
                  {completedTodos.map(todo => (
                    <li key={todo.id}>
                      <label>
                        <input 
                          type="checkbox" 
                          checked={todo.completed}
                          onChange={e => toggleTodo(todo.id, e.target.checked)}
                        />
                        {todo.title}
                      </label>
                      <button 
                        className="btn btn-danger"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        {t('deleteTask')}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    )
  }

  return (
    <>
      <button 
        onClick={toggleLanguage}
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px', 
          background: '#646cff',
          color: 'white',
          border: 'none',
          padding: '10px 15px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 'bold',
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
        }}
      >
        {language === 'portuguese' ? '🇵🇹 PT' : '🇬🇧 EN'}
      </button>

      <ListManager />
      
      <div className="current-list-header">
        <h1 className="header">{currentList?.name || t('todoList')}</h1>
        <span className="list-stats">
          {t('pendingCount', { count: currentList?.todos.filter(t => !t.completed).length })}
        </span>
      </div>
      
      <TodoForm />
      
      <TodoList />
    </>
  )
}