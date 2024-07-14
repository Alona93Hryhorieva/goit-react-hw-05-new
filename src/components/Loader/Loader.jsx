import { Circles } from "react-loader-spinner";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loader}>
      <p>Loading....</p>
      <Circles
        color="#1d8989"
        cssOverride={{}}
        size={100}
        speedMultiplier={4}
      />
    </div>
  );
}
// ({
//   height: (height = 80),
//   width: (width = 80),
//   color: (color = (0, $4a6abea5e2fde319$export$37394b0fa44b998c)),
//   ariaLabel: (ariaLabel = "circles-loading"),
//   wrapperStyle: wrapperStyle,
//   wrapperClass: wrapperClass,
//   visible: (visible = true),
// });
