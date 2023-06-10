import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Container, Title, Section } from './App.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import dataFirst from './data.json';
const Key_Contacts = 'ContactsLocalList';

export const App = () => {
  const [data, setData] = useState(
    () => JSON.parse(localStorage.getItem(Key_Contacts)) ?? [...dataFirst]
  );
  const [filter, setFilter] = useState('');
  useEffect(() => {
    localStorage.setItem(Key_Contacts, JSON.stringify(data));
    console.log('dd', data);
  }, [data]);

  const handleFilterChange = e => setFilter(e.target.value);

  const handleDeleteContact = id => {
    setData(prevState => prevState.filter(contact => contact.id !== id));
  };
  const handleAddContact = (name, number) => {
    const isExist = data.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const newContact = { id: nanoid(), name, number };
    setData(prevState => [...prevState, newContact]);
    console.log('ddch', data);
  };

  const filteredContacts = data.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <Section>
        <Title>Phonebook</Title>
        <ContactForm onAddContact={handleAddContact} />
      </Section>
      <Section>
        <Title>Contacts</Title>
        <Filter value={filter} Input={handleFilterChange} />
        {filteredContacts.length > 0 ? (
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={handleDeleteContact}
          />
        ) : (
          'Сontact not found'
        )}
      </Section>
    </Container>
  );
};

// export class App extends React.Component {
//   state = {
//     contacts: data,
//     filter: '',
//   };
//   componentDidMount() {
//     const stateLocal = JSON.parse(localStorage.getItem(Key_Contacts));
//     if (stateLocal) {
//       this.setState({ contacts: stateLocal });
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem(Key_Contacts, JSON.stringify(this.state.contacts));
//     }
//   }

//   handleFilterChange = e => {
//     this.setState({ filter: e.target.value });
//   };

//   handleAddContact = (name, number) => {
//     const { contacts } = this.state;
//     const isExist = contacts.find(
//       contact => contact.name.toLowerCase() === name.toLowerCase()
//     );
//     if (isExist) {
//       alert(`${name} is already in contacts.`);
//       return;
//     }

//     const newContact = { id: nanoid(), name, number };
//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, newContact],
//     }));
//   };

//   handleDeleteContact = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== id),
//     }));
//   };

//   getFilteredContacts = () => {
//     const filteredContacts = this.state.contacts.filter(contact =>
//       contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
//     );

//     return filteredContacts;
//   };

//   render() {
//     const { filter } = this.state;
//     const filteredContacts = this.getFilteredContacts();
//     return (
//       <Container>
//         <Section>
//           <Title>Phonebook</Title>
//           <ContactForm onAddContact={this.handleAddContact} />
//         </Section>{' '}
//         <Section>
//           <Title>Contacts</Title>
//           <Filter value={filter} Input={this.handleFilterChange} />
//           {filteredContacts.length > 0 ? (
//             <ContactList
//               contacts={filteredContacts}
//               onDeleteContact={this.handleDeleteContact}
//             />
//           ) : (
//             'Сontact not found'
//           )}
//         </Section>
//       </Container>
//     );
//   }
// }
