import './App.css';
import Header from './components/Header';
import Experiences from './components/Experiences';
import Contact from './components/Contact';
import Projects from './components/Projects';
import CreateProject from './components/CreateProject';
import { useState, useEffect } from 'react';
import { ofetch } from 'ofetch';


function App() {
  
  type ProjectType = {
    title: string;
    description: string;
    category: string;
  };

  const [projects, setProjects] = useState<ProjectType[]>([]);

  useEffect(() => {
    ofetch('http://localhost:3000/projects')
      .then((data) => setProjects(data))
      .catch((error) => console.error('Error fetching projects:', error));
  }, []);

  const addProject = (newProject: { title: string; description: string; category: string }) => {
    setProjects([...projects, newProject]);
  };

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const student = {
    name: 'Halgeir Geirson',
    degree: 'Bachelor IT',
    points: 180,
    email: 'student@hiof.no',
    experiences: [
      { name: 'Figma UI for customer X' },
      { name: 'Website for customer Y' },
    ],
  };

  return (
    <main>
      <Header student={student} />
      <Experiences experiences={student.experiences} />
      <Projects projects={projects} removeProject={removeProject} />
      <CreateProject addProject={addProject} /> 
      <Contact student={student} />
    </main>
  );
}

export default App;
