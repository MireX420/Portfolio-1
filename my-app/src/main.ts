interface Project {
  name: string;
  description: string;
  date: string;
}

const form = document.getElementById("new-project-form") as HTMLFormElement
const projectList = document.getElementById("project-list") as HTMLUListElement
const projects: Project[] = [] 

const nameInput = document.getElementById("project-name") as HTMLInputElement
const descriptionInput = document.getElementById("project-description") as HTMLTextAreaElement
const dateInput = document.getElementById("date") as HTMLInputElement

form.addEventListener("submit", async (event: Event) => {
  event.preventDefault() 

  //lage prosjekt basert på bruker input
  const newProject: Project = {
    name: nameInput?.value || '',
    description: descriptionInput?.value || '',
    date: dateInput?.value || ''
  }

  projects.push(newProject) 
  updateProjectList() 

  //prøve å sende nytt prosjekt til serveren
  try {
    const response = await fetch("http://localhost:3999/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProject)
    })

    //håndere responsen
    if (response.status === 201) {
      console.log("Project saved on the server")
    } else {
      console.error("Error saving project on the server")
    }
  } catch (error) {
    console.error("Error sending data to the server:", error)
  }
})

//oppdatere prosjekt listen
function updateProjectList() {
  console.log(projects)
  projectList.innerHTML = ""

  //legge til hver prosjekt som list item
  for (const project of projects) {
    const listItem = document.createElement("li")
    listItem.textContent = `${project.name} - ${project.description} - ${new Date(project.date).toLocaleDateString()}`
    projectList.appendChild(listItem)
  }
}

//Hente prosjekter fra API
function loadFromApi() {
  fetch("http://localhost:3999/")
    .then(response => response.json())
    .then((data: Project[]) => {
      projects.push(...data) 
      updateProjectList() 
    })
    .catch(error => {
      console.error("Error fetching data from the server:", error)
    })
}

//Hente prosjekter fra Json filen
function loadFromJSON() {
  fetch("src/static/projects.json") 
    .then(response => response.json())
    .then((data: { projects: Project[] }) => {
      console.log("Loaded JSON data:", data)
      projectList.innerHTML = "" 
      data.projects.forEach(project => {
        const listItem = document.createElement("li")
        listItem.textContent = `${project.name} - ${project.description} - ${project.date}`
        projectList.appendChild(listItem)
      })
    })
    .catch(error => {
      console.error("Error loading JSON data:", error)
    })
}

loadFromJSON() 
loadFromApi()