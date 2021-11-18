const Jumbotron = () => {
  return (
    <nav aria-label="breadcrumb">
      <ol
        className="breadcrumb"
        style={{
          marginTop: "2rem",
          borderTop: "2px black solid",
          borderBottom: "2px black solid",
          backgroundColor: "white",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-3" style={{ borderRight: "2px black solid" }}>
              <li className="breadcrumb-item" aria-current="page">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <button className="btn" type="button">
                      Pool Type
                    </button>
                  </div>
                  <select
                    className="custom-select"
                    id="inputGroupSelect03"
                    aria-label="Example select with button addon"
                  >
                    <option selected>Choose...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </li>
            </div>
            <div className="col-3" style={{ borderRight: "2px black solid" }}>
              <li className="breadcrumb-item" aria-current="page">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <button className="btn" type="button">
                      Token Filter
                    </button>
                  </div>
                  <select
                    className="custom-select"
                    id="inputGroupSelect03"
                    aria-label="Example select with button addon"
                  >
                    <option selected>All Tokens</option>
                    <option value="1">USDT</option>
                    <option value="2">AAVE</option>
                    <option value="3">USDC</option>
                  </select>
                </div>
              </li>
            </div>
            <div className="col-3" style={{ borderRight: "2px black solid" }}>
              <li className="breadcrumb-item" aria-current="page">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <button className="btn" type="button">
                      Status
                    </button>
                  </div>
                  <select
                    className="custom-select"
                    id="inputGroupSelect03"
                    aria-label="Example select with button addon"
                  >
                    <option selected>All</option>
                    <option value="1">Live&Filled </option>
                    <option value="2">Closed</option>
                  </select>
                </div>
              </li>
            </div>
            <div className="col-3">
              <li className="breadcrumb-item" aria-current="page">
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Search by
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </div>
                </div>
              </li>
            </div>
          </div>
        </div>
      </ol>
    </nav>
  );
};

export default Jumbotron;
