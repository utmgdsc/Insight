import React, { useState, useEffect } from "react";
import AssetPostingsService from "../services/AssetPostingsService";
import { useNavigate } from "react-router-dom";

const AssetPostings = () => {
  const [assetPostings, setAssetPostings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedAssetId, setExpandedAssetId] = useState(null);

  const navigate = useNavigate();
  const navigateToApplication = () => {
    navigate("/application");
  };

  useEffect(() => {
    fetchAssetPostings();
  }, []);

  const fetchAssetPostings = async () => {
    try {
      const data = await AssetPostingsService.getAssets();
      setAssetPostings(data);
    } catch (error) {
      console.error("Error fetching asset postings:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleExpandAsset = (id) => {
    setExpandedAssetId(expandedAssetId === id ? null : id);
  };

  const filteredAssetPostings = assetPostings.filter((posting) => {
    return posting.assetType.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="assets-page">
      <h1>Asset Postings</h1>
      <input
        type="text"
        placeholder="Search assets..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="asset-listings">
        {filteredAssetPostings.map((posting) => (
          <div
            key={posting._id}
            className="asset-posting"
            onClick={() => toggleExpandAsset(posting._id)}
          >
            <div className="asset-title-container">
              <h3>{posting.assetName}</h3>
              <span
                className={`arrow-icon ${expandedAssetId === posting._id ? "expanded" : ""}`}
              >
                &#9660;
              </span>
            </div>
            <p>Location: {posting.location}</p>
            <p>Type: {posting.assetType}</p>
            {expandedAssetId === posting._id && (
              <div className="asset-details">
                {/* Render expanded asset details here */}
                <p>Description: {posting.details.description}</p>
                {/* Add more details as needed */}
              </div>
            )}
            <button className="apply-button" onClick={navigateToApplication}>
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetPostings;