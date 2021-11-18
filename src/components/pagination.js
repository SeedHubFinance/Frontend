const Pagination = () => {
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
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-start">
              <li className="page-item disabled">
                <button
                  className="page-link btn"
                  href="#"
                  tabindex="-1"
                  aria-disabled="true"
                >
                  Previous
                </button>
              </li>
              <li className="page-item">
                <button className="page-link btn" href="#">
                  1
                </button>
              </li>
              <li className="page-item">
                <button className="page-link btn" href="#">
                  2
                </button>
              </li>
              <li className="page-item">
                <button className="page-link btn" href="#">
                  3
                </button>
              </li>
              <li className="page-item">
                <button className="page-link btn" href="#">
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </ol>
    </nav>
  );
};

export default Pagination;
