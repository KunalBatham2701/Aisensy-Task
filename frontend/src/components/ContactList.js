import React, { useState, useEffect } from 'react';
import { getContacts } from '../services/contactService';

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage, setContactsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedContacts, setSelectedContacts] = useState(new Set());

  useEffect(() => {
    const fetchContacts = async () => {
      const data = await getContacts(currentPage, contactsPerPage);
      setContacts(data.contacts);
      setTotalPages(data.totalPages);
    };
    fetchContacts();
  }, [currentPage, contactsPerPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const toggleContactSelection = (contactId) => {
    const newSelection = new Set(selectedContacts);
    if (newSelection.has(contactId)) {
      newSelection.delete(contactId);
    } else {
      newSelection.add(contactId);
    }
    setSelectedContacts(newSelection);
  };

  const downloadSelectedContacts = () => {
    // This function will call the backend endpoint to download selected contacts
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedContacts.has(contact._id)}
                  onChange={() => toggleContactSelection(contact._id)}
                />
              </td>
              <td>{contact.name}</td>
              <td>{contact.mobileNumber}</td>
              <td>{contact.email}</td>
              <td>{contact.tags.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <button onClick={downloadSelectedContacts}>
        Download Selected
      </button>
    </div>
  );
}

export default ContactList;