import { useParams } from "react-router-dom";

export default function MovieDetailsPage() {
  const { paymentId } = useParams();

  return (
    <div>
      <MovieDetailsPage { paymentId }/>;
    </div>
  );
}
