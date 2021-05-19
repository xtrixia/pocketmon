import { Link, withRouter } from "react-router-dom";

function MyList() {
  return (
    <>
      <h1>MyList</h1>
      <Link to="/">Back</Link>
    </>
  );
}

export default withRouter(MyList);
