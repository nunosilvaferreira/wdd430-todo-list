import TodoItem from './TodoItem'
import { useLanguage } from './contexts/LanguageContext'

export default function TodoList({ todos, toggleTodo, deleteTodo }) {
  const { t } = useLanguage();
  const completedTodos = todos.filter(todo => todo.completed)
  const pendingTodos = todos.filter(todo => !todo.completed)

  return (
    <div className="todo-list-container">
      {todos.length === 0 ? (
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
                  <TodoItem 
                    key={todo.id} 
                    {...todo} 
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                  />
                ))}
              </ul>
            </div>
          )}

          {completedTodos.length > 0 && (
            <div className="todos-section">
              <h4>{t('completedSection')} ({completedTodos.length})</h4>
              <ul className="list">
                {completedTodos.map(todo => (
                  <TodoItem 
                    key={todo.id} 
                    {...todo} 
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                  />
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  )
}