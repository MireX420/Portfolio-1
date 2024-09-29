import Project from './Project';

type ProjectType = {
  title: string;
  description: string;
  category: string;
};

type ProjectsProps = {
  projects: ProjectType[];
  removeProject: (index: number) => void;
};

export default function Projects({ projects, removeProject }: ProjectsProps) {

  const projectCountByCategory = projects.reduce((count: { [key: string]: number }, project) => {
    count[project.category] = (count[project.category] || 0) + 1;
    return count;
  }, {});

  return (
    <div>
      <h3>Prosjektantall per kategori:</h3>
      {Object.entries(projectCountByCategory).map(([category, count]) => (
        <p key={category}>
          <span>{category}</span>: {count} prosjekter
        </p>
      ))}

      {projects.length === 0 ? (
        <p>Ingen prosjekter</p>
      ) : (
        projects.map((project, index) => (
          <div key={index}>
            <Project title={project.title} description={project.description} category={project.category} />
            <button onClick={() => removeProject(index)}>Fjern</button>
          </div>
        ))
      )}
    </div>
  );
}
