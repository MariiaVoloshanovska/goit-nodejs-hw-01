const crypto = require("crypto");
const { join } = require("path");
const fs = require("fs").promises;

const contactsPath = join(__dirname, "db", "contacts.json");

const contactsList = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getIdContact = async (contactId) => {
  const contacts = await contactsList();
  const result = contacts.find((contact) => contact.id === contactId);

  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await contactsList();
  const contactIndex = contacts.findIndex((contact) => contact.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  const updatedContacts = contacts.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return updatedContacts;
};

const addContact = async (name, email, phone) => {
  const contacts = await contactsList();
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContacts;
};

module.exports = {
  contactsList,
  getIdContact,
  removeContact,
  addContact,
};
