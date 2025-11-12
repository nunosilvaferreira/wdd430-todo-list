import { useLanguage } from './contexts/LanguageContext'

export default function TodoItem({ id, title, completed, toggleTodo, deleteTodo }) {
  const { t } = useLanguage();

  return (
    <li>
      <label>
        <input 
          type="checkbox" 
          checked={completed}
          onChange={e => toggleTodo(id, e.target.checked)}
        />
        {title}
      </label>
      <button 
        className="btn btn-danger"
        onClick={() => deleteTodo(id)}
      >
        {t('deleteTask')}
      </button>
    </li>
  )