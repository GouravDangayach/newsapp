import React from 'react';

const NewsItem = (props) => {
  let {title, description, imageUrl, newsUrl, author, date, source} = props;
  return (
    <div>
          <div className="card">
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'85%', zIndex:'1'}}>{source}</span>
              <img src={imageUrl ? imageUrl : "https://images.axios.com/YKEKW1h8ajc_kVOUPhvfOl8DIl0=/0x0:1600x900/1366x768/2024/12/26/1735213395651.png"} className="card-img-top" style={{height:"200px"}} alt={title} />
              <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                  <p className="card-text">{description}...</p>
                  <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                  <a href={newsUrl} className="btn btn-sm btn-dark" target="_blank" rel='noreferrer'>Read More</a>
              </div>
          </div>
    </div>
  );
}

export default NewsItem;
