import ContactList from "./ContactList/ContactList";
import SearchBox from "./SearchBox/SearchBox";
import ContactForm from "./ContactForm/ContactForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from "../redux/operations";
import Loader from "./Loader/Loader";

import { selectError, selectLoading } from "../redux/contactsSlice";

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div>
      {error && <h2>Oops...Something went wrong!!!</h2>}
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {loading ? <Loader /> : <ContactList />}
    </div>
  );
};

export default App;
