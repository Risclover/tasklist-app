import React, { useState } from "react";
import "./App.css";

// Components
import Navigation from "./components/navigation/Navigation";
import Project from "./components/project/Project";
import TopNav from "./components/navigation/TopNav";
import ProjectNav from "./components/navigation/ProjectNav";
import ProjectHead from "./components/project/ProjectHead";
import ProjectTitle from "./components/project/ProjectTitle";
import InputTask from "./components/project/InputTask";
import Tasklist from "./components/project/Tasklist";
import Task from "./components/project/Task";
import TopNavItem from "./components/navigation/TopNavItem";

// Navigation items
const navItems = ["All", "Important", "Today", "This Week", "Completed"];

// Principle function
function App() {
  const [tasks, setTasks] = useState([]); // Array of task objects
  const [projects, setProjects] = useState(["Default Project"]); // Array of projects
  const [activeProject, setActiveProject] = useState("Tasklist"); // Current active project
  const [isStar, setIsStar] = useState(false);

  // Set active project when main nav items clicked
  const handleTopNavClick = (e) => {
    setActiveProject(e.target.textContent);
  };

  // 'Add Project' function
  const addProject = (e) => {
    const newProject = document.querySelector(".project-nav-item");
    setProjects([...projects, newProject]);
  };

  // When user clicks on project title, they are (or aren't) able to edit the project title via "invisible" input box
  const editProject = () => {
    const projectTitleInput = document.querySelector(".edit-project-title");
    const projectTitle = document.querySelector(".project-title");
    if (
      activeProject === "All" ||
      activeProject === "Important" ||
      activeProject === "Completed" ||
      activeProject === "Today" ||
      activeProject === "This Week"
    ) {
      alert("Cannot change titles of categories that are not user-created.");
    } else {
      projectTitleInput.value = projectTitle.textContent;
      projectTitle.style.display = "none";
      projectTitleInput.style.display = "block";
      projectTitleInput.focus();
    }
  };

  const handleProjectInput = (e) => {
    const projectTitleInput = document.querySelector(".edit-project-title");
    const projectTitle = document.querySelector(".project-title");
    const projectNavItems = document.querySelectorAll(".set-project");

    if (e.key === "Enter") {
      projectTitle.textContent = projectTitleInput.value;
      projectTitleInput.style.display = "none";
      projectTitle.style.display = "block";
      projectNavItems.forEach((item) => {
        if (item.textContent === activeProject) {
          item.textContent = projectTitleInput.value;
        }
      });
      tasks.forEach((task) => {
        if (task.project === activeProject) {
          task.project = projectTitleInput.value;
        }
      });
      setActiveProject(projectTitleInput.value);
    }
  };

  const handleProjectBlur = (e) => {
    const projectTitleInput = document.querySelector(".edit-project-title");
    const projectTitle = document.querySelector(".project-title");
    const projectNavItems = document.querySelectorAll(".set-project");
    projectTitle.textContent = projectTitleInput.value;
    projectTitleInput.style.display = "none";
    projectTitle.style.display = "block";
    projectNavItems.forEach((item) => {
      if (item.textContent === activeProject) {
        item.textContent = projectTitleInput.value;
      }
    });
    tasks.forEach((task) => {
      if (task.project === activeProject) {
        task.project = projectTitleInput.value;
      }
    });
    setActiveProject(projectTitleInput.value);
  };

  const handleProjectTitle = (e) => {
    if (e.key === "Enter") {
      if (e.target.value === "" || e.target.value === " ") {
        alert(
          "ERROR: Project title cannot be blank. Please name your new project - you can always rename it later!"
        );
      } else {
        e.target.style.display = "none";
        e.target.parentElement.children[1].style.display = "block";
        e.target.parentElement.children[1].textContent = e.target.value;
        setActiveProject(e.target.value);
      }
    }
  };

  const handleProjectClick = (e) => {
    setActiveProject(e.target.textContent);
  };

  const deleteProject = (e) => {
    if (
      window.confirm(
        "Are you sure you want to delete this project and all of its tasks?"
      )
    ) {
      const updatedTasks = tasks.filter((task) => {
        return (
          task.project !==
          e.target.parentElement.parentElement.parentElement.children[0]
            .children[1].textContent
        );
      });
      setTasks(updatedTasks);
      e.target.parentElement.parentElement.parentElement.remove();
    }
  };

  const addTask = () => {
    const inputTask = document.querySelector(".type-task");
    const newTask = {
      id: tasks.length,
      title: inputTask.value,
      description: "",
      duedates: "",
      project: activeProject,
      important: false,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    inputTask.focus();
    inputTask.value = "";
  };

  const handleImportance = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, important: !task.important };
      }
      setIsStar(!isStar);
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleCompleted = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const editTask = (e) => {
    e.target.style.display = "none";
    e.target.parentElement.children[2].style.display = "block";
    e.target.parentElement.children[2].value = e.target.textContent;
    e.target.parentElement.children[2].focus();
  };

  const handleTaskInput = (e, id) => {
    if (e.key === "Enter") {
      tasks.forEach((task) => {
        if (task.id === id) {
          task.title = e.target.value;
        }
      });
      e.target.style.display = "none";
      e.target.parentElement.children[1].style.display = "block";
      e.target.parentElement.children[1].textContent = e.target.value;
    }
  };

  const handleInputBlur = (e, id) => {
    tasks.forEach((task) => {
      if (task.id === id) {
        task.title = e.target.value;
      }
    });
    e.target.style.display = "none";
    e.target.parentElement.children[1].style.display = "block";
    e.target.parentElement.children[1].textContent = e.target.value;
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedTasks = tasks.filter((task) => {
        return task.id !== id;
      });
      setTasks(updatedTasks);
    }
  };

  const taskList = tasks.map((task) => {
    if (activeProject === "Important") {
      if (task.important === true) {
        return (
          <Task
            id={task.id}
            title={task.title}
            description={task.description}
            dueDate={task.duedate}
            completed={task.completed}
            important={task.important}
            handleImportance={handleImportance}
            editTask={editTask}
            handleTaskInput={handleTaskInput}
            handleInputBlur={handleInputBlur}
            deleteTask={deleteTask}
          />
        );
      }
    } else if (activeProject === "All") {
      return (
        <Task
          id={task.id}
          title={task.title}
          description={task.description}
          dueDate={task.duedate}
          completed={task.completed}
          important={task.important}
          handleImportance={handleImportance}
          editTask={editTask}
          handleTaskInput={handleTaskInput}
          handleInputBlur={handleInputBlur}
          deleteTask={deleteTask}
        />
      );
    } else {
      if (task.project === activeProject) {
        return (
          <Task
            id={task.id}
            title={task.title}
            description={task.description}
            dueDate={task.duedate}
            completed={task.completed}
            important={task.important}
            handleImportance={handleImportance}
            editTask={editTask}
            handleTaskInput={handleTaskInput}
            handleInputBlur={handleInputBlur}
            deleteTask={deleteTask}
          />
        );
      }
    }
  });

  return (
    <div className="app">
      <Navigation>
        <TopNav>
          {navItems.map((item) => {
            return <TopNavItem item={item} onClick={handleTopNavClick} />;
          })}
        </TopNav>
        <ProjectNav>
          {projects.map((project, index) => {
            if (index === 0) {
              return (
                <li className="project-nav-item" onClick={handleProjectClick}>
                  <div>
                    <input
                      type="text"
                      className="type-project"
                      placeholder="i.e. Summer Chores"
                      ref={(input) => input && input.focus()}
                      onKeyPress={handleProjectTitle}
                    />
                    <span className="set-project"></span>
                  </div>
                </li>
              );
            } else {
              return (
                <li className="project-nav-item" onClick={handleProjectClick}>
                  <div>
                    <input
                      type="text"
                      className="type-project"
                      placeholder="i.e. Summer Chores"
                      ref={(input) => input && input.focus()}
                      onKeyPress={handleProjectTitle}
                    />
                    <span className="set-project"></span>
                  </div>
                  <button className="project-delete" onClick={deleteProject}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              );
            }
          })}
        </ProjectNav>
        <button className="add-project" onClick={addProject}>
          Add Project
        </button>
      </Navigation>
      <Project>
        <ProjectHead>
          <ProjectTitle
            onClick={editProject}
            activeProject={activeProject}
            handleProjectInput={handleProjectInput}
            handleProjectBlur={handleProjectBlur}
          />
          {activeProject === "All" ||
          activeProject === "Important" ||
          activeProject === "Completed" ||
          activeProject === "Today" ||
          activeProject === "This Week" ? (
            <InputTask activeProject={true} onClick={addTask} disabled={true} />
          ) : (
            <InputTask
              activeProject={false}
              onClick={addTask}
              disabled={false}
            />
          )}
        </ProjectHead>
        <Tasklist>{taskList}</Tasklist>
      </Project>
    </div>
  );
}

export default App;
