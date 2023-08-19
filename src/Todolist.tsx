import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { filterStatus } from './App'


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string) => void
  setFilter: (value: filterStatus) => void
  addTask: (title: string) => void
  changeCheckboxStatus: (taskId: string, isDone: boolean) => void
  filter: filterStatus
}


export function Todolist(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.currentTarget.value);
  }

  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.key === "Enter") {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  }

  const addTask = () => {
    if (newTaskTitle.trim()) {
      props.addTask(newTaskTitle.trim());
      setNewTaskTitle("");
    } else {
      setError("Field is required");
    }
  }

  const OnAllClickHandler = () => props.setFilter(filterStatus.All);
  const OnActiveClickHandler = () => props.setFilter(filterStatus.Active);
  const OnCompletedClickHandler = () => props.setFilter(filterStatus.Completed);

  return (
    <div>
      <h3>{props.title}</h3>
      <div className="input-group mb-1 has-validation">
        <input value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyUp={onKeyPressHandler}
          className={"form-control " + (error ? "is-invalid" : "")}
        />
        <button onClick={addTask} className="btn btn-outline-secondary">+</button>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
      <ul className='list-group'>
        {
          props.tasks.map((task) => {
            const onRemoveHandler = () => props.removeTask(task.id)
            const OnCheckboxChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
              props.changeCheckboxStatus(task.id, event.currentTarget.checked)
            }
            let classStyle = "list-group-item text-center d-flex justify-content-between " + (task.isDone ? "list-group-item-primary" : "");
            return <li key={task.id} className={classStyle} >
              <input type="checkbox"
                onChange={OnCheckboxChangeHandler}
                checked={task.isDone}
              />
              <span>{task.title} </span>
              <button className='btn btn-secondary btn-sm' onClick={onRemoveHandler}>x</button>
            </li>
          })
        }
      </ul>
      <div className="d-flex justify-content-between">
        <button className={"btn me-1 btn-outline-" + (props.filter === filterStatus.All ? "primary" : "secondary")} onClick={OnAllClickHandler}>All</button>
        <button className={"btn me-1 btn-outline-" + (props.filter === filterStatus.Active ? "primary" : "secondary")} onClick={OnActiveClickHandler}>Active</button>
        <button className={"btn btn-outline-" + (props.filter === filterStatus.Completed ? "primary" : "secondary")} onClick={OnCompletedClickHandler}>Completed</button>
      </div>
    </div>
  );
}

