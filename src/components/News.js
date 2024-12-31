import React, {useEffect, useState} from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    // document.title = `GDInfo News - ${props.category.charAt(0).toUpperCase() + props.category.slice(1)}`;

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setLoading(false);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        props.setProgress(100);
    }
    
    useEffect(() => {
        updateNews();
    }, [])

    const handleNextClick = async () => {
        setPage(page + 1);
        updateNews();
    }
    
    const handlePrevClick = async () => {
        setPage(page - 1);
        updateNews();
    }

    return (
        <div className='container my-3'>
            <h2 className='text-center' style={{marginTop:'90px', marginBottom:'40px'}}>News - Top {props.category} headlines</h2>
            {loading && <Spinner />}
            <div className="row">
                {!loading && articles.map((element) => {
                    return <div className="col-md-4 my-2" key={element.url} >
                        <NewsItem title={element.title ? element.title : "" } description={element.description ? element.description.slice(0, 88) : "" } imageUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url ? element.url : ""}  author={element.author ? element.author : ""}  date={element.publishedAt ? element.publishedAt : ""} source={element.source.name} />
                    </div>
                })}
            </div>
            <div className='container d-flex justify-content-between'>
                <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
                <button disabled={page + 1 > Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
            </div>
        </div>
    );
}

News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
export default News;