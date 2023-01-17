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

    const renderButtons = () => {
       const buttonsElement = document.querySelector(".js--buttons");

       if (!tasks.length) {
        buttonsElement.innerHTML = "";
        return;
       }

       buttonsElement.innerHTML = `
        <button class="sectionList__hideButton">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="sectionList__finishButton">
            Ukończ wszystkie
        </button>
        `;
     };

    const bindButtonsEvents = () => { };

    const renderTasks = () => {
        let htmlListString = "";

        for (const task of tasks) {
            htmlListString += `
                <li class=sectionList__item>
                <button class="js-done sectionList__doneButton">
                     ${task.done ? "✔" : ""}
                </button>
                <span ${task.done ? "class=sectionList__item--done" : "class=sectionList__value"}>
                     ${task.content} 
                </span>
                 <button class="js-remove sectionList__removeButton">
                     🗑
                 </button>
                </li>
            `;
        };

        document.querySelector(".js-task").innerHTML = htmlListString;
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
        const buttons = document.querySelector(".js-button");

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