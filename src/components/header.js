import ConnectedButton from "./ConnectButton";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Fixed Swap
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <button className="nav-link btn" href="#">
              Application <span className="sr-only">(current)</span>
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn" href="#">
              Store
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn" href="#">
              Earning
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn" href="#">
              Statistics
            </button>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <ConnectedButton />
        </form>
      </div>
    </nav>
  );
};

export default Header;
