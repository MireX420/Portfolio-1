import { useState } from 'react';

type ContactProps = {
  student: {
    email: string;
  };
};

export default function Contact({ student }: ContactProps) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submittedData, setSubmittedData] = useState<{ name: string; message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === '' || message.trim() === '') {
      alert('Vennligst fyll ut begge feltene.');
      return;
    }

  
    const formData = { name, message };
    setSubmittedData(formData);
    setName('');
    setMessage('');
  };

  return (
    <>
      <h2>Kontakt {student.email}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Navn:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}  
            required
          />
        </div>
        <div>
          <label htmlFor="message">Melding:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}  
            required
          />
        </div>
        <button type="submit">Send</button>
      </form>

      {submittedData && (
        <div>
          <h3>Data som ble sendt inn:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </>
  );
}