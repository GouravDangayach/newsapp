import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 5,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `GDInfo News - ${props.category.charAt(0).toUpperCase() + props.category.slice(1)}`;
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f9905f101312407db9f9783a7cf3fbc9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ loading: false });
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults
        });
    }


    async componentDidMount() {
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

  render() {
    return (
        <div className='container my-3'>
            `<h2 className='text-center'>News - Top {this.props.category} headlines</h2>`
            {this.state.loading && <Spinner />}
            <div className="row">
                {!this.state.loading && this.state.articles.map((element) => {
                    return <div className="col-md-4 my-2" key={element.url} >
                        <NewsItem title={element.title ? element.title : "" } description={element.description ? element.description.slice(0, 88) : "" } imageUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url ? element.url : ""}  author={element.author ? element.author : ""}  date={element.publishedAt ? element.publishedAt : ""} source={element.source.name} />
                    </div>
                })}
            </div>
            <div className='container d-flex justify-content-between'>
                <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
        </div>
    );
  }
}

export default News;