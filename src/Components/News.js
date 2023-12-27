import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spineer';
import PropTypes from 'prop-types'


class News extends Component {
  static defaultProps = {
   country: 'in',
   pageSize:8,
   category:'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

  }
  constructor() {
    super();
    this.state = {
      articles: [], // Corrected property name
      loading: true,
      page:1
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0e3aee116139454f97374722296e9630&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults,loading:false});
  }

  handleNextClick = async()=>{
    console.log("next")
    if( !(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
    {let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0e3aee116139454f97374722296e9630&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    
   this.setState({
    page: this.state.page + 1,
    articles: parsedData.articles ,
    loading:false
   })
  }
  }
  handlePrevClick = async()=>{
    console.log("Previous")
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0e3aee116139454f97374722296e9630&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
   this.setState({
    page: this.state.page - 1,
    articles: parsedData.articles,
    loading:false
   })
  }
  render() {
    console.log("render");
    return (
      <div className='container my-4 '>
        <h1 className='text-center ' style={{margin:'30px 0px'}}>NewsMonkey - Top Headline</h1>
       {this.state.loading && <Spinner/>}
        <div className='row'>
          {!this.state.loading && this.state.articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title : ""}
                description={element.description ? element.description : ""}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
              />
            </div>
          ))}
        </div>
        <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} className="btn btn-dark"  onClick={this.handlePrevClick}>&laquo; Previous</button>
        <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>
        </div>
      </div>
    );
  }
}

export default News;
