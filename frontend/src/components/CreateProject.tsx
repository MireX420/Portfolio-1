import { useState } from 'react';

type ProjectType = {
  title: string;
  description: string;
  category: string;
};

type CreateProjectProps = {
  addProject: (newProject: ProjectType) => void;
};

export default function CreateProject({ addProject }: CreateProjectProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() === '' || description.trim() === '' || category.trim() === '') {
      alert('Vennligst fyll ut alle feltene.');
      return;
    }

    const newProject = { title, description, category };
    addProject(newProject);
    setTitle('');
    setDescription('');
    setCategory('');
  };

  return (
    <>
      <h2>Opprett nytt prosjekt</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Prosjekttittel:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Prosjektbeskrivelse:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Kategori:</label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <button type="submit">Opprett prosjekt</button>
      </form>
    </>
  );
}
