import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      {" "}
      <p>Sorry,this page does not exist.</p>
      <p>
        <Link to="/" className={css.link}>
          Go Back!
        </Link>
      </p>
    </div>
  );
}
