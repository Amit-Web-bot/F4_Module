import React from 'react';
import './PincodeCard.css'
function PincodeCard({ pincodeDetail }) {
  return (
    <div className="card">
      <p><strong>Name:</strong> {pincodeDetail.Name}</p>
      <p><strong>Branch Type :</strong> {pincodeDetail.BranchType}</p>
      <p><strong>Delivery Status:</strong> {pincodeDetail.DeliveryStatus}</p>
      <p><strong>District:</strong> {pincodeDetail.District}</p>
      <p><strong>State:</strong> {pincodeDetail.State}</p>
    </div>
  );
}

export default PincodeCard;
