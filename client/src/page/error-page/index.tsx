import { NavLink, isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.error?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  return (
    <section>
      <h1>Ooops!</h1>
      <p>Sorry, this page did`t exist</p>
      <p>{errorMessage}</p>
      <NavLink to="/">Go home..</NavLink>
    </section>
  );
};

export default ErrorPage;
