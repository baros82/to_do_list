{
    const welcome = () => {
        console.log("Hello world")
    };

    welcome();

    let tasks = [];

    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [...tasks, { content: newTaskContent, }];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks =[
        ...tasks.slice(0, taskIndex),
        ...tasks.slice(taskIndex +1),
        ];
        render();
    };


    const toggleTaskDone = (taskIndex) => {
      tasks = [
        ...tasks.slice(0, taskIndex),
        {
            ...tasks[taskIndex],
            done: !tasks[taskIndex].done,
        },
        ...tasks.slice(taskIndex +1),
      ];

        render();
    };

    const finishDoneTasks = () => { 
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const toggleHideDoneTasks = () => { 
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const bindEvent = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButtons, taskIndex,) => {
            toggleDoneButtons.addEventListener("click", () => {

                toggleTaskDone(taskIndex);
            });
        });
    };

    const renderTasks = () => {
       const taskToHTML = task => `
                <li class="sectionList__item${task.done && hideDoneTasks ? " sectionList__item--hidden" : ""}">
                <button class="js-done button__done">
                     ${task.done ? "✔" : ""}
                </button>
                <span ${task.done ? "class=sectionList__item--done" : "class=sectionList__value"}>
                     ${task.content} 
                </span>
                 <button class="js-remove button__remove">
                     🗑
                 </button>
                </li>
            `;

            const tasksElement = document.querySelector(".js-task");
            tasksElement.innerHTML = tasks.map(taskToHTML).join("");
    
    };

 const renderButtons = () => {
       const buttonsElement = document.querySelector(".js--buttons");
 
       if (!tasks.length) {
        buttonsElement.innerHTML = "";
        return;
       }

       buttonsElement.innerHTML = `
        <button class="button__hide js-toggleHideDoneTasks">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="button__finish js-finishAllDoneTasks" ${ tasks.every(({ done }) => done) ? " disabled " : ""}
        >
            Ukończ wszystkie
        </button>
        `;
     };

    const bindButtonsEvents = () => { 
        const finishAllDoneTasks = document.querySelector(".js-finishAllDoneTasks");

        if (finishAllDoneTasks) {
            finishAllDoneTasks.addEventListener("click", finishDoneTasks);
        }

        const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");

        if (toggleHideDoneTasksButton) {
            toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
        }
    };

    const render = () => {
        renderButtons();
        renderTasks();
        bindButtonsEvents();
        bindEvent();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        const newTaskElement = document.querySelector(".js-newTask");
        

        if (newTaskContent !== "") {
            addNewTask(newTaskContent); 
            newTaskElement.value = "";
        };

        newTaskElement.focus();
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}