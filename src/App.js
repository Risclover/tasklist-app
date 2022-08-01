import React, { useState } from "react";
import "./App.css";
import { nanoid } from "nanoid";

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
import Modal from "./components/project/Modal";
import Completed from "./components/project/Completed";
import ProjectNavItem from "./components/navigation/ProjectNavItem";

// Navigation items
const navItems = ["All", "Important", "Today", "This Week", "Completed"];

const todaysDate = (separator = "") => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date}`;
};

// Principle function
function App(props) {
  const [tasks, setTasks] = useState([props.tasks]); // Array of task objects
  const [projects, setProjects] = useState([props.projects]); // Array of projects
  const [activeProject, setActiveProject] = useState("Tasklist"); // Current active project
  const [isStar, setIsStar] = useState(false);
  const [taskCount, setTaskCount] = useState(0);
  const [importantCount, setImportantCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [weekCount, setWeekCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);

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
      if (projectTitleInput.value === "" || projectTitleInput.value === " ") {
        alert("ERROR: Project title cannot be blank.");
        projectTitle.textContent = activeProject;
        projectTitleInput.value = activeProject;
      } else {
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
        setProjects([...projects, projectTitleInput.value]);
      }
    }
  };

  const handleProjectBlur = (e) => {
    const projectTitleInput = document.querySelector(".edit-project-title");
    const projectTitle = document.querySelector(".project-title");
    const projectNavItems = document.querySelectorAll(".set-project");
    if (projectTitleInput.value === "" || projectTitleInput.value === " ") {
      alert("ERROR: Project title cannot be blank.");
      projectTitle.textContent = activeProject;
      projectTitleInput.value = activeProject;
      projectTitleInput.focus();
    } else {
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

  const handleProjectTitleBlur = (e) => {
    const projectTitleInput = document.querySelector(".edit-project-title");
    const projectTitle = document.querySelector(".project-title");
    if (e.target.value === "" || e.target.value === " ") {
      alert(
        "ERROR: Project title cannot be blank. Please name your new project - you can always rename it later!"
      );
      projectTitle.textContent = activeProject;
      projectTitleInput.value = activeProject;
    } else {
      e.target.style.display = "none";
      e.target.parentElement.children[1].style.display = "block";
      e.target.parentElement.children[1].textContent = e.target.value;
      setActiveProject(e.target.value);
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
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      e.target.parentElement.parentElement.parentElement.remove();
    } else {
      setActiveProject(
        e.target.parentElement.parentElement.parentElement.children[0]
          .children[1].chidlren[0].children[0].textContent
      );
      console.log(activeProject);
    }
  };

  const addTask = () => {
    const inputTask = document.querySelector(".type-task");
    if (inputTask.value === "" || inputTask.value === " ") {
      alert("ERROR: Task title cannot be blank.");
    } else {
      setTaskCount(taskCount + 1);
      const newTask = {
        id: nanoid(),
        title: inputTask.value,
        description: "",
        dueDate: "",
        project: activeProject,
        important: false,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    inputTask.focus();
    inputTask.value = "";
  };

  const handleImportance = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        if (!task.important) {
          setImportantCount(importantCount + 1);
        } else {
          setImportantCount(importantCount - 1);
        }
        return { ...task, important: !task.important };
      }
      setIsStar(!isStar);
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  function handleCompleted(id, project) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        if (!task.completed) {
          setCompletedTaskCount(completedTaskCount + 1);
          setTaskCount(taskCount - 1);

          if (task.important) {
            setImportantCount(importantCount - 1);
          }
        } else {
          setCompletedTaskCount(completedTaskCount - 1);
          setTaskCount(taskCount + 1);

          if (task.important) {
            setImportantCount(importantCount + 1);
          }
        }
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  const editTask = (e) => {
    e.target.style.display = "none";
    e.target.parentElement.children[1].style.display = "block";
    e.target.parentElement.children[1].value = e.target.textContent;
    e.target.parentElement.children[1].focus();
  };

  const handleTaskInput = (e, id) => {
    if (e.key === "Enter") {
      if (e.target.value === "" || e.target.value === " ") {
        alert("ERROR: Task cannot be blank.");
        e.target.value = "Please edit me.";
        tasks.forEach((task) => {
          if (task.id === id) {
            task.title = e.target.value;
          }
        });
        e.target.style.display = "none";
        e.target.parentElement.children[0].style.display = "block";
        e.target.parentElement.children[0].textContent = e.target.value;
      } else {
        tasks.forEach((task) => {
          if (task.id === id) {
            task.title = e.target.value;
          }
        });
        e.target.style.display = "none";
        e.target.parentElement.children[0].style.display = "block";
        e.target.parentElement.children[0].textContent = e.target.value;
      }
    }
  };

  const handleInputBlur = (e, id) => {
    if (e.target.value === "" || e.target.value === " ") {
      alert("ERROR: Task cannot be blank.");
      e.target.value = "Please edit me.";
      tasks.forEach((task) => {
        if (task.id === id) {
          task.title = e.target.value;
        }
      });

      e.target.style.display = "none";
      e.target.parentElement.children[0].style.display = "block";
      e.target.parentElement.children[0].textContent = e.target.value;
    } else {
      tasks.forEach((task) => {
        if (task.id === id) {
          task.title = e.target.value;
        }
      });
      e.target.style.display = "none";
      e.target.parentElement.children[0].style.display = "block";
      e.target.parentElement.children[0].textContent = e.target.value;
    }
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTaskCount(taskCount - 1);
      const updatedTasks = tasks.filter((task) => {
        return task.id !== id;
      });
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const openModal = (e) => {
    const modalFull = document.querySelector(".modal-full");
    const modalTitle = document.querySelector(".modal-title-input");
    const modalDescription = document.querySelector(".modal-description-input");
    const modalDate = document.querySelector(".modal-duedate-input");

    modalFull.setAttribute(
      "class",
      `${e.target.parentElement.parentElement.id} modal-full`
    );

    let modalTask = modalFull.getAttribute("class");

    tasks.forEach((task) => {
      if (task.id + " modal-full" === modalTask) {
        modalTitle.value = task.title;
        modalDescription.value = task.description;
        modalDate.value = task.dueDate;
      }
    });

    modalFull.style.display = "block";
  };

  const closeModal = (e) => {
    const modalFull = document.querySelector(".modal-full");
    modalFull.style.display = "none";
  };

  const submitModal = (e) => {
    const modalFull = document.querySelector(".modal-full");
    const modalTitle = document.querySelector(".modal-title-input");
    const modalDescription = document.querySelector(".modal-description-input");
    const modalDate = document.querySelector(".modal-duedate-input");

    let modalTask = modalFull.getAttribute("class");

    if (modalTitle.value === "" || modalTitle.value === " ") {
      alert("ERROR: Task title cannot be blank.");
    } else {
      const updatedTasks = tasks.map((task) => {
        if (modalTask === task.id + " modal-full") {
          return {
            ...task,
            title: modalTitle.value,
            description: modalDescription.value,
            dueDate: modalDate.value,
          };
        }
        return task;
      });
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      console.log(updatedTasks);
      modalFull.style.display = "none";
    }
  };

  const taskList = tasks.map((task) => {
    if (
      (!task.completed &&
        ((task.important === true && activeProject === "Important") ||
          (task.dueDate === todaysDate("-") && activeProject === "Today") ||
          activeProject === "All")) ||
      (task.completed && activeProject === "Completed") ||
      (activeProject === task.project && !task.completed)
    ) {
      return (
        <Task
          id={task.id}
          title={task.title}
          completed={task.completed}
          important={task.important}
          dueDate={task.dueDate}
          description={task.description}
          handleImportance={handleImportance}
          handleCompleted={handleCompleted}
          editTask={editTask}
          handleTaskInput={handleTaskInput}
          handleInputBlur={handleInputBlur}
          deleteTask={deleteTask}
          openModal={openModal}
        />
      );
    }
  });

  const completedList = tasks.map((task) => {
    if (task.project === activeProject && task.completed === true) {
      return (
        <Task
          id={task.id}
          title={task.title}
          completed={task.completed}
          important={task.important}
          dueDate={task.dueDate}
          description={task.description}
          handleImportance={handleImportance}
          handleCompleted={handleCompleted}
          editTask={editTask}
          handleTaskInput={handleTaskInput}
          handleInputBlur={handleInputBlur}
          deleteTask={deleteTask}
          openModal={openModal}
        />
      );
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  return (
    <div className="app">
      <Navigation>
        <TopNav>
          {navItems.map((item) => (
            <li onClick={handleTopNavClick}>{item}</li>
          ))}
        </TopNav>
        <ProjectNav>
          {projects.map((project, index) => {
            return (
              <ProjectNavItem
                title={project}
                index={index}
                handleProjectTitle={handleProjectTitle}
                handleProjectTitleBlur={handleProjectTitleBlur}
                handleProjectClick={handleProjectClick}
                deleteProject={deleteProject}
              />
            );
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
            completedCount={completedTaskCount}
            importantCount={importantCount}
            taskCount={taskCount}
          />
          {activeProject === "All" ||
          activeProject === "Important" ||
          activeProject === "Completed" ||
          activeProject === "Today" ||
          activeProject === "This Week" ? (
            <InputTask
              activeProject={true}
              onClick={addTask}
              disabled={true}
              onKeyPress={(e) => (e.key === "Enter" ? addTask() : "")}
            />
          ) : (
            <InputTask
              activeProject={false}
              onClick={addTask}
              disabled={false}
              onKeyPress={(e) => (e.key === "Enter" ? addTask() : "")}
            />
          )}
        </ProjectHead>
        <div className="tasklist">
          <Tasklist>{taskList}</Tasklist>
          {activeProject !== "All" &&
          activeProject !== "Today" &&
          activeProject !== "This Week" &&
          activeProject !== "Important" &&
          activeProject !== "Completed" &&
          tasks.map(
            (task) => task.completed && task.project === activeProject
          ) ? (
            <Completed>{completedList}</Completed>
          ) : (
            ""
          )}
        </div>
      </Project>
      <Modal closeModal={closeModal} submitModal={submitModal} />
    </div>
  );
}

export default App;
