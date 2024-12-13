import s from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { FaUser } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { deleteContact } from "../../redux/contactsOps";

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();
  return (
    <li className={s.contactItem}>
      <div className={s.itemsInfo}>
      <p>
        <FaUser /> 
        {name}
      </p>

      <p>
        <BsFillTelephoneFill /> {number}
      </p>
      </div>
      <button
        className={s.delButton}
        onClick={() => dispatch(deleteContact(id))}
        type="button"
      >
        Delete
      </button>
    </li>
  );
};

export default Contact;
