const contactServ = require("./ contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactServ.contactsList();
      return console.log(allContacts);

    case "get":
      const foundedBook = await contactServ.getIdCont(id);
      return console.log(foundedBook);

    case "add":
      const addedContact = await contactServ.addContact(name, email, phone);
      return console.log(addedContact);

    case "remove":
      const removedContact = await contactServ.removeContact(id);
      return console.log(removedContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

// invokeAction({ action: "list" });

invokeAction({ action: "get", id: "qdggE76Jtbfd9eWJHrssH" });
