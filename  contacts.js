const crypto = require("crypto");
const { join } = require("path");
const fs = require("fs").promises;

const contactPath = join(__dirname, "db", "contacts.json");

const contactsList = async () => {
  const contacts = await fs.readFile(contactPath);
  return JSON.parse(contacts);
};

const getIdCont = async (IdCont) => {
  const contacts = await contactsList();
  const result = contacts.find((contact) => contact.id === IdCont);

  return result || null;
};

const removeContact = async (IdCont) => {
  const contacts = await contactsList();
  const contactIndex = contacts.findIndex((contact) => contact.id === IdCont);
  if (contactIndex === -1) {
    return null;
  }
  const updatedContacts = contacts.splice(contactIndex, 1);
  await fs.writeFile(contactPath, JSON.stringify(contacts));
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
  await fs.writeFile(contactPath, JSON.stringify(contacts));
  return newContact;
};

module.exports = {
  contactsList,
  getIdCont,
  removeContact,
  addContact,
};
