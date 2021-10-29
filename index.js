const inquirer = require("inquirer");
const fs = require('fs');
const path = require('path');

const distFolder = path.resolve(__dirname, "dist");
const distPath = path.join(distFolder, "team.html");
const Manager = require("./lib/managerExt");
const Intern = require("./lib/internExt");
const Engineer = require("./lib/engineerExt");

const teamMembers = [];

const manQuestions = [
  {
    type: "input",
    message: "Please enter the Manager's name.",
    name: "mngrName",
  },
  {
    type: "input",
    message: "Please enter the Manager's ID Number.",
    name: "mngrId",
  },
  {
    type: "input",
    message: "Please enter the Manager's ID email address.",
    name: "mngrEmail",
  },
  {
    type: "input",
    message: "Please enter the Manager's office number.",
    name: "mngrNum",
  }
];

const engQuestions = [
  {
    type: "input",
    message: "What is the engineer's name?",
    name: "engName",
  },
  {
    type: "input",
    message: "Please enter the engineer's ID.",
    name: "engID",
  },
  {
    type: "input",
    message: "Please enter the engineer's email.",
    name: "engEmail",
  },
  {
    type: "input",
    message: "Please enter the engineer's GH username.",
    name: "engGhub",
  }
];

const intQuestions = [
  {
    type: "input",
    message: "What is the intern's name?",
    name: "intName",
  },
  {
    type: "input",
    message: "Please enter the intern's ID.",
    name: "intID",
  },
  {
    type: "input",
    message: "Please enter the intern's email.",
    name: "intEmail",
  },
  {
    type: "input",
    message: "Please enter the intern's school.",
    name: "intSchool",
  }
];

function createManager () {
    inquirer.prompt(manQuestions).then((response) => {
        console.log(response);

        const manager = new Manager (
            response.mngrName,
            response.mngrId,
            response.mngrEmail,
            response.mngrNum
        )
        teamMembers.push(manager);
        init();
    });
};

function createEngineer () {
  inquirer.prompt(engQuestions).then((response) => {
      console.log(response);

      const engineer = new Engineer (
          response.engName,
          response.engId,
          response.engEmail,
          response.engGhub
      )
      teamMembers.push(engineer);
      init();
  });
};

function createIntern () {
  inquirer.prompt(intQuestions).then((response) => {
      console.log(response);

      const intern = new Intern (
          response.intName,
          response.intId,
          response.intEmail,
          response.intSchool
      )
      teamMembers.push(intern);
      init();
  });
};

// function init() {

//     if (manResponse.empInput === "Intern") {
//       console.log("cool let's enter an Intern");
//       inquirer.prompt(intQuestions).then((response) => {
//         const intResponse = response;
//         console.log(intResponse);
//       });
//     } else if (response.empInput === "Engineer") {
//       inquirer.prompt(engQuestions).then((response) => {
//         const engResponse = response;
//         console.log(engResponse);
//       });
//     } else {
//       console.log("Cool. We're done!");
//       return;
//     }
//   });
// };

function init() {
    inquirer.prompt([
        {
            type: "list",
            message: "What employee would you like to create?",
            name: "empRole",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "Finished Adding Employees"
            ]
          }
    ])
    .then((answers) => {
        switch (answers.empRole) {
            case "Manager":
                createManager();
                break;
            case "Engineer":
                createEngineer();
                break;
            case "Intern":
                createIntern();
                break;
            default:
                build();
                break;
        }
    })

};

function teamData(emp) {
    const toHtml = [];
    let man = emp.filter(emp => emp.getRole() === "Manager").map(emp => outputManager(emp))
    toHtml.push(man);

    let eng = emp.filter(emp => emp.getRole() === "Engineer").map(emp => outputEngineer(emp))
    toHtml.push(eng);

    let int = emp.filter(emp => emp.getRole() === "Intern").map(emp => outputIntern(emp))
    toHtml.push(int);

    return toHtml.join("");


    function outputManager(manager) {
        return `<div class="container">
        <div class="card" style="width: 18rem;">
            <div class="card-header bg-warning">
            ${manager.getName()}
            </div>
            <ul class="list-group list-group-flush">
            <li class="list-group-item"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-command" viewBox="0 0 16 16">
            <path d="M3.5 2A1.5 1.5 0 0 1 5 3.5V5H3.5a1.5 1.5 0 1 1 0-3zM6 5V3.5A2.5 2.5 0 1 0 3.5 6H5v4H3.5A2.5 2.5 0 1 0 6 12.5V11h4v1.5a2.5 2.5 0 1 0 2.5-2.5H11V6h1.5A2.5 2.5 0 1 0 10 3.5V5H6zm4 1v4H6V6h4zm1-1V3.5A1.5 1.5 0 1 1 12.5 5H11zm0 6h1.5a1.5 1.5 0 1 1-1.5 1.5V11zm-6 0v1.5A1.5 1.5 0 1 1 3.5 11H5z"/> 
          </svg> ${manager.getRole()}</li>
            <li class="list-group-item">ID #: ${manager.getId()}</li>
            <li class="list-group-item">Email: ${manager.getEmail()}</li>
            <li class="list-group-item">Phone: ${manager.getNumber()}</li>
            </ul>
        </div>
    </div>`
    };

    function outputEngineer(engineer) {
      return `<div class="container">
      <div class="card" style="width: 18rem;">
          <div class="card-header bg-warning">
          ${engineer.getName()}
          </div>
          <ul class="list-group list-group-flush">
          <li class="list-group-item"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
        </svg> ${engineer.getRole()}</li>
          <li class="list-group-item">ID #: ${engineer.getId()}</li>
          <li class="list-group-item">Email: ${engineer.getEmail()}</li>
          <li class="list-group-item">GitHub: ${engineer.getGithub()}</li>
          </ul>
      </div>
  </div>`
  };

  function outputIntern(intern) {
    return `<div class="container">
    <div class="card" style="width: 18rem;">
        <div class="card-header bg-warning">
        ${intern.getName()}
        </div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen" viewBox="0 0 16 16">
        <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
      </svg> ${intern.getRole()}</li>
        <li class="list-group-item">ID #: ${intern.getId()}</li>
        <li class="list-group-item">Email: ${intern.getEmail()}</li>
        <li class="list-group-item">School: ${intern.getSchool()}</li>
        </ul>
    </div>
</div>`
};
};

function build() {
    function topBuild() {
      return `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Employee Roster</title>
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossorigin="anonymous"
          />
        </head>
        <body>
          <nav class="navbar navbar-light bg-success">
            <div class="d-flex container-fluid justify-content-center">
              <span class="navbar-brand mb-0 fs-1 text text-white">Our Team</span>
            </div>
          </nav>`
    };

    function bottomBuild() {
      return `</body>
      </html>`
    };
    fs.writeFileSync(distPath, topBuild()+teamData(teamMembers)+bottomBuild(), "utf8");
};

init();
