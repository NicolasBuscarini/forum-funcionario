// PhoneList.js
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const PhoneList = () => {
  const { authData, logout } = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulação de dados de ramais
    const exampleContacts = [
      { id: 1, name: "João Silva", phone: "1234-5678" },
      { id: 2, name: "Maria Oliveira", phone: "2345-6789" },
      { id: 3, name: "Pedro Santos", phone: "3456-7890" },
      { id: 4, name: "Ana Costa", phone: "4567-8901" },
      { id: 5, name: "Lucas Almeida", phone: "5678-9012" },
    ];

    // Simulando uma requisição
    const fetchContacts = () => {
      try {
        if (!authData || !authData.token) {
          throw new Error("Você precisa estar autenticado para ver a lista de ramais.");
        }
        
        // Aqui você definiria a lógica de "carregar" os ramais
        setContacts(exampleContacts);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          logout(); // Log out if unauthorized
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [authData, logout]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div className="card mt-3">
      <div className="card-header">
        <h5>Lista de Ramais</h5>
      </div>
      <ul className="list-group list-group-flush">
        {contacts.map((contact) => (
          <li key={contact.id} className="list-group-item">
            {contact.name}: {contact.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhoneList;
