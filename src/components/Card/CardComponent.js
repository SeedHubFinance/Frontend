import { Card, Row, Col } from "react-bootstrap";

const CardComponent = ({
  id,
  title,
  address,
  pair,
  swapRatio,
  price,
  participants,
}) => {
  return (
    <Card>
      <Card.Body>
        <div className="card-head d-flex justify-content-between">
          <span>
            <div className="dot me-2"></div> Live
          </span>
          <p># {id}</p>
        </div>
        <div className="card-title">{title}</div>

        <div class="card-content">
          <div>
            <span>Address</span>
            <p>{address}</p>
          </div>
          <div>
            <span>Pair</span>
            <p>{pair}</p>
          </div>
          <div>
            <span>Swap Ratio</span>
            <p>{swapRatio}</p>
          </div>
          <div>
            <span>Price</span>
            <p>$ {price}</p>
          </div>
          <div>
            <span>Participants</span>
            <p>{participants}</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
export default CardComponent;
