import React, { useState, useEffect } from 'react';
import PincodeCard from './PincodeCard';
import './PincodeLookup.css'
import Loader from './loader';

function PincodeLookup() {
  const [pincode, setPincode] = useState('');
  const [pincodeDetails, setPincodeDetails] = useState(null);
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pincode.length === 6) {
      fetchPincodeDetails();
    }
  }, [pincode]);

  const fetchPincodeDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data[0].Status === "Error") {
        setError(data[0].Message);
        setPincodeDetails(null);
      } else {
        setPincodeDetails(data[0].PostOffice);
        setFilteredDetails(data[0].PostOffice);
        setError(null);
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setError('There was a problem with the fetch operation');
      setPincodeDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    const filtered = pincodeDetails.filter((detail) =>
      detail.Name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredDetails(filtered);
  };

  return (
    <div className='contain'>
      <h1>Pincode Lookup</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="pincodeInput">Enter Pincode (6 digits):</label><br/><br/>
        <input
          type="text"
          id="pincodeInput"
          maxLength="6"
          pattern="[0-9]{6}"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        /><br/><br/>
        <button type="button" onClick={fetchPincodeDetails}>Lookup</button><br/><br/>
      </form>

      {pincode.length !== 6 && <p>Pincode must be 6 digits</p>}

      {loading && <Loader/>}

      {error && <p>Error: {error}</p>}

      {filteredDetails.length === 0 && !loading && <p>Couldn’t find the postal data you’re looking for…</p>}

      <input
        type="text"
        placeholder="Filter by Post Office Name"
        value={filter}
        onChange={handleFilterChange}
      />
    <div className='detailcontain'>
    {filteredDetails.map((detail, index) => (
        <PincodeCard key={index} pincodeDetail={detail} />
      ))}
    </div>
    </div>
  );
}

export default PincodeLookup;
