const Card = () => {
  return (
    <div className="col mb-4">
      <div className="card">
        <div className="container">
          <div className="row">
            <div className="col">fixed</div>
            <div className="col"># 6179</div>
          </div>
        </div>
        <div className="card-body">
          <h3 className="card-title">Chainink</h3>
          <p className="card-text" style={{ borderTop: "2px black solid" }}>
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td colspan="2">Address</td>
                  <td>Otto</td>
                </tr>
                <tr>
                  <td colspan="2">Pair</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td colspan="2">Swap Ratio</td>
                  <td>@twitter</td>
                </tr>
                <tr>
                  <td colspan="2">Price</td>
                  <td>@twitter</td>
                </tr>
                <tr>
                  <td colspan="2">Participants</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
            <div className="progress">
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: "25%" }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
