type HeaderProps = {
    student: { 
        name: string;
        degree: string;
        points: number;
        email: string;
     }
  };

export default function Header( {student} : HeaderProps) {
    return (
        <>
            <h1>{student.name}</h1>
            <p>{student.degree}</p> 
            <p>Points: {student.points}</p> 
        </>
    );
}