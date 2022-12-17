{
    const welcome = () => {
        console.log("Hello world")
    }

    welcome();

    const tasks = [
        {
            content: "Zrobić pierogi",
            done: true,
        },
        {
            content: "Zjeść pierogi",
            done: false,
        },
    ];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <li>
            ${task.content}
        </li>
        `;
        }

        document.querySelector(".js-task").innerHTML = htmlString;
    };

    const init = () => {
        render();
    };
    init ();

}

