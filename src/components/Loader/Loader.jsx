import { Circles } from "react-loader-spinner";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loader}>
      <p>Loading....</p>
      <Circles
        // cssOverride={{}}
        // size={100}
        // speedMultiplier={4}
        height="100"
        width="100"
        color="#1d8989"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
