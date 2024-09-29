type ProjectProps = {
    title: string
    description: string
    category: string
  }
  
export default function Project({ title, description, category }: ProjectProps) {
        return (
          <div>
            <h2>{title}</h2>
            <p>{description}</p>
            <p>{category}</p>
          </div>
        )
    }
  
  