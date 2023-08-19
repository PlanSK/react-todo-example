import React, { useState } from 'react';
import './App.css';
import {Todolist, TaskType} from './Todolist';
import {v1} from 'uuid';

export enum filterStatus {
  All,
  Active,
  Completed,
}


function App() {
  let [tasks, setTasks] = useState< Array<TaskType> >([
    {id: v1(), title: "CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "React", isDone: false},
    {id: v1(), title: "Redux", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false},
  ]);
  
  function removeTask(id: string) {
    let filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    let newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false
    };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function changeCheckboxStatus(taskId: string, isDone: boolean) {
    let fTask = tasks.find(task => task.id === taskId);
    if (fTask) {
      fTask.isDone = isDone;
    }
    setTasks([ ...tasks ]);
  }

  let [currentState, setFilter] = useState<filterStatus>(filterStatus.All);
  let tasksToDisplay = () => {
    switch(currentState) {
      case filterStatus.Active:
        return tasks.filter(task => task.isDone);
      case filterStatus.Completed:
        return tasks.filter(task => !task.isDone);
      default:
        return tasks;
    }
  }

    return (
      <div className="App">
        <Todolist title="What to learn"
                  tasks={tasksToDisplay()}
                  removeTask={removeTask}
                  setFilter={setFilter}
                  addTask={addTask}
                  changeCheckboxStatus={changeCheckboxStatus}
                  filter={currentState}
        />
      </div>
    );
  }

export default App;
