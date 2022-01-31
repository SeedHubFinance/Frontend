import { useParams } from "react-router-dom";

export default function Idpage({ match }) {
  let params = useParams();
  console.log(match);
  return <h1>Hello {params.id}</h1>;
}
