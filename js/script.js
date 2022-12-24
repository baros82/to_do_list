{
    const welcome = () => {
        console.log("Hello world")
    };

    welcome();

    const tasks = [
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };


    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const bindEvent = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

        const tobbleDoneButtons = document.querySelectorAll(".js-done");

        tobbleDoneButtons.forEach((tobbleDoneButtons, taskIndex) => {
            tobbleDoneButtons.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <li
            class="sectionList__item"${task.done ? "list__item--done" : ""}>
        <button class="js-done sectionList__doneButton">✔</button>
        <span class="sectionList__value"> ${task.content} </span>
        <button class="js-remove sectionList__removeButton sectionList__removeButton--flex">🗑</button>
           
        </li>
        `;
        }

        document.querySelector(".js-task").innerHTML = htmlString;

        bindEvent();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        };

        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();

}