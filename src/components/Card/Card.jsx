import React, { useState } from "react";

function Card({ launch }) {
  const [collapsed, setCollapsed] = useState(false);

  const yearsPassed = new Date().getFullYear() - parseInt(launch.launch_year);
  const badgeStatus = launch.upcoming
    ? "upcoming"
    : launch.launch_success
    ? "success"
    : "failure";

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{launch.mission_name}</h3>
        <span className={`badge ${badgeStatus}`}>
          {badgeStatus}
        </span>
      </div>

      {collapsed && (
        <>
          <div className="card-content">
            <span>{yearsPassed} years ago</span> 
              {launch.links.article_link && (<span> | {" "}
                <a href={launch.links.article_link} target="_blank" rel="noopener noreferrer">
                  Article
                </a>
                </span>
              )}
              {launch.links.video_link && 
              (<span> | {" "} 
              <a href={launch.links.video_link} target="_blank" rel="noopener noreferrer">
                Video
              </a>
              </span>
              )}
          </div>

          <div className="card-row">
            <img
              src={launch.links.mission_patch_small || ""}
              alt="Mission"
              className="card-image"
            />
            <div className="card-details">
              <p>{launch.details}</p>
            </div>
          </div>
        </>
      )}
      <div className="card-footer">
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "Hide" : "View" }
        </button>
      </div>
    </div>
  );
}

export default Card;
