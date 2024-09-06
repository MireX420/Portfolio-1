document.addEventListener('DOMContentLoaded', () => {
  fetch('src/projects.json')
    .then(response => response.json())
    .then(data => {
      const projectList = document.getElementById('project-list')

      const renderProjects = (projects: any[]) => {
        projectList!.innerHTML = ''
        projects.forEach(project => {
          const li = document.createElement('li')
          li.textContent = `${project.name} - ${project.description} - ${project.date}`
          projectList!.appendChild(li)
        })
      }

      renderProjects(data.projects)

      const newProjectForm = document.getElementById('new-project-form') as HTMLFormElement

      newProjectForm.addEventListener('submit', (event: Event) => {
        event.preventDefault()

        const projectName = (document.getElementById('project-name') as HTMLInputElement).value
        const projectDescription = (document.getElementById('project-description') as HTMLTextAreaElement).value
        const projectDate = (document.getElementById('date') as HTMLInputElement).value

        const newProject = {
          id: data.projects.length + 1,
          name: projectName,
          description: projectDescription,
          date: projectDate
        }

        data.projects.push(newProject)

        renderProjects(data.projects)

        newProjectForm.reset()
      })
    })
    .catch(error => console.error('Error loading projects:', error))
})