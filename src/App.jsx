import { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
// import WebProvider, { useWebContext } from "./contexts/webContexts";
import WebProvider, {useWebContext} from "./contexts/Context";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { cn } from "./components/util";
import { styles } from "./components/util";
import "./App.css"; // Assuming Tailwind is set up in this file

function AppContent() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const inputRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const { darkMode } = useWebContext();

  // Load todos from localStorage
  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
    setLoaded(true);
  }, []);

  // Save todos to localStorage on change
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, loaded]);

  const handleAdd = () => {
    if (todo.trim() === "") return;

    if (isEditing) {
      const updatedTodos = todos.map((item) =>
        item.id === editId ? { ...item, todo } : item
      );
      setTodos(updatedTodos);
      setIsEditing(false);
      setEditId(null);
    } else {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    }

    setTodo("");
  };

  const handleDelete = (e, id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleEdit = (e, id) => {
    const t = todos.find((item) => item.id === id);
    setTodo(t.todo);
    setIsEditing(true);
    setEditId(id);
    setTimeout(() => {
      inputRef.current.focus();
      inputRef.current.selectionStart = inputRef.current.selectionEnd =
        inputRef.current.value.length;
    }, 0);
  };

  const darkModeStr = `${!darkMode ? "bg-gray-500" : "bg-blue-500"}`;

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const newTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(newTodos);
  };
  return (
    <div className={cn(darkMode ? styles.darkinnerbg : styles.lightinnerbg)}>
      <Navbar />
      {/* <div className="mx-3 md:container md:mx-auto dark:bg-gray-900 p-5 my-5 rounded-2xl md:min-h-[96vh] text-black dark:text-white"> */}
      <div
        className={cn(
          darkMode ? styles.darkBg : styles.lightBg,
          darkMode ? styles.darkText : styles.lightText,
          darkMode ? styles.darkTransition : styles.lightTransition,
          darkMode ? styles.darkBorder : styles.lightBorder,
          // darkMode ? styles.darkGradientCompleted : styles.darkGradientUncompleted,
          "mx-3 md:container md:mx-auto p-5 my-5 rounded-2xl md:min-h-[96vh] transition-colors duration-300"
        )}
      >
        {/* ...existing code for addTodo, todos list, etc... */}
        <div className="addTodo my-3">
          <h2 className="flex justify-center items-center text-2xl font-bold">
            {isEditing ? "Edit Todo" : "Add a Todo"}
          </h2>
          <div className="flex justify-center my-5">
            <input
              ref={inputRef}
              onChange={handleChange}
              value={todo}
              // className="border italic border-gray-500 border-r-gray-900 w-full md:w-2/3 bg-white rounded-l-lg px-3 py-2 dark:bg-gray-500 text-black dark:text-white focus:outline-none focus:border-violet-500"
              className={cn(
                darkMode ? styles.inputDark : styles.inputLight,
                darkMode
                  ? styles.inputPlaceholderDark
                  : styles.inputPlaceholderLight,
                darkMode ? styles.inputFocusDark : styles.inputFocusLight,
                darkMode ? styles.inputBorderDark : styles.inputBorderLight,
                darkMode ? "" : "",
                "w-full md:w-2/3 px-3 py-2 rounded-l-lg focus:outline-none focus:border-violet-500"
              )}
              type="text"
              placeholder="Write todo..."
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <button
              onClick={handleAdd}
              className="cursor-pointer bg-violet-500 hover:bg-violet-800 border rounded-r-lg font-bold border-violet-500 text-white py-1.5 px-2.5"
            >
              {isEditing ? "Update" : "Save"}
            </button>
          </div>
        </div>
        <h2 className="flex justify-center items-center my-3 text-2xl font-bold">
          Your Todos
        </h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="mx-10 font-bold">Nothing here yet. Add a task!</div>
          )}
          {todos.map((item) => (
            <div
              key={item.id}
              className={`todo flex justify-between items-center p-3 rounded-lg shadow my-1.5 transition-colors duration-300 ${
                item.isCompleted
                  ? darkMode
                    ? "bg-gray-600"
                    : "bg-violet-100"
                  : darkMode
                  ? "bg-violet-900"
                  : "bg-white"
              }`}
            >
              <div className="flex items-center">
                <input
                  name={item.id}
                  onChange={handleCheckbox}
                  type="checkbox"
                  checked={item.isCompleted}
                  className="mr-3 cursor-pointer shadow-md transform transition-transform duration-200 hover:scale-105"
                />
                <div
                  className={`font-medium break-words w-full ${
                    item.isCompleted
                      ? "line-through text-gray-500 dark:text-gray-400"
                      : ""
                  }`}
                >
                  {item.todo}
                </div>
              </div>
              <div className="buttons flex flex-wrap">
                <button
                 aria-label="Edit"
                  title="Edit"
                  onClick={(e) => handleEdit(e, item.id)}
                  className="cursor-pointer bg-violet-500 hover:bg-violet-800 border rounded-lg font-bold border-violet-500 text-white py-2 mx-1 px-4 shadow-md transform transition-transform duration-300 hover:scale-105"
                >
                  <FaEdit aria-hidden="true"/>
                </button>
                <button
                  aria-label="Delete"
                  title="Delete"
                  onClick={(e) => handleDelete(e, item.id)}
                  className="cursor-pointer bg-violet-500 hover:bg-violet-800 border rounded-lg font-bold border-violet-500 text-white py-2 px-4 mx-1 shadow-md transform transition-transform duration-300 hover:scale-105"
                >
                  <MdDelete aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {todos.length > 0 && (
          <div className="flex justify-center mt-6">
            <button
              aria-label="Clear All"
              title="Clear All"
              onClick={() => setTodos([])}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
            >
              Clear All Todos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <WebProvider>
      <AppContent />
    </WebProvider>
  );
}
