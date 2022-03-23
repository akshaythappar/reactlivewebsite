import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
const News = (props) => {
  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
 

  const updateNews = async ()=> {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    setloading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    console.log(parsedData);
    setarticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setloading(false)
  
    props.setProgress(100);
  }
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
      updateNews();

      
  }, [])
  
  // async componentDidMount() {
  //   // console.log("cdm");
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=892d670886534167b54e1f25cd3e8d12&page=1&pageSize=${props.pageSize}`
  //   // this.setState({loading:true});
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json()
  //   // console.log(parsedData);
  //   // this.setState({ articles: parsedData.articles,
  //   //    totalResults: parsedData.totalResults,
  //   //   loading:false })
  //   this.updateNews();
  // }
  // const handlePrevClick = async () => {
  //   // console.log("previous");
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=892d670886534167b54e1f25cd3e8d12&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
  //   // this.setState({loading:true});
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json()
  //   // console.log(parsedData);


  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles: parsedData.articles,
  //   //   loading: false
  //   // })
  //   setpage(page-1)
  //   this.updateNews();
  // }
  // const handleNextClick = async () => {
  //   console.log("next");
  //   // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize))) {
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=892d670886534167b54e1f25cd3e8d12&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
  //   //   this.setState({loading:true});
  //   //   let data = await fetch(url);
  //   //   let parsedData = await data.json()
  //   //   console.log(parsedData);


  //   //   this.setState({
  //   //     page: this.state.page + 1,
  //   //     articles: parsedData.articles,
  //   //     loading: false
  //   //   })
  //   // }
  //   setpage(page+1)
  //   updateNews();
  // }

  const fetchMoreData = async () => {
    // this.setState({ page: page + 1 })
    
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
    setpage(page+1)
    //  this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json()
    setarticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
    console.log(parsedData);
 
  };

  
    console.log("render");
    return (
      <>

        <h1 className="text-center" style={{ margin: '35px 0px',marginTop:'90px' }}>NewsMonkey-Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">



            <div className="row">
              {articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem newsUrl="TODO" title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" class="btn btn-danger" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)) ? true : false} type="button" class="btn btn-danger" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}


      </>
    )
  
}

//  News.defaultProps = {
//     country: 'in',
//     pageSize: 8,
//     category: 'general'
//   }

//   News.PropTypes = {
//     country: Proptypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string,
//   }
export default News
  