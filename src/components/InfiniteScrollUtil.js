import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Loading.js'

class InfiniteScrollUtil extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            data: [],
            hasMore: true,
            fetchStart: 0,
            loading: true,
            minDataLength: 4
        }
        this.fetchData = this.fetchData.bind(this)
    }
    componentDidMount () {
        this.fetchData ()
    }
    fetchData () {
        const {fetchStart, minDataLength} = this.state;
        const {fetchAmount, ids, fetchFunc} = this.props;
        let idsToFetch = []
        if (fetchStart >= ids.length) {
            this.setState({
                hasMore: false
            })
            return;
        }
        if (fetchStart + fetchAmount > ids.length) {
            idsToFetch = ids.slice(fetchStart)
        } else {
            idsToFetch = ids.slice(fetchStart, fetchStart + fetchAmount)
        }
        fetchFunc(idsToFetch)
        .then((newData)=>{
            console.log(newData)
            this.setState((state) => ({
                data: state.data.concat(newData),
                fetchStart: state.fetchStart + fetchAmount,
                loading: false
            }))
            if (newData.length < minDataLength) {
                this.fetchData()
            }
        })
        .catch((error) => {
            console.warn('Error fetching data: ', error)
            this.setState({
              error: `There was an error fetching the data.`,
              loading: false
            })
        })
    }
    render () {
        const {data, hasMore, loading, error} = this.state;
        const {text, speed} = this.props;
        return (
            loading 
                    ?<Loading text={text} speed={speed}/>
                    :error
                        ?<div>{error}</div>
                        :<InfiniteScroll
                            dataLength={data.length}
                            next={this.fetchData}
                            hasMore={hasMore}
                            loader={<Loading text='Fetching more' speed={200}/>}
                            endMessage={
                                <p style={{ textAlign: "center" }}>
                                    <b>Yay! You have seen it all</b>
                                </p>}
                        >
                        {this.props.children(data)}
                    </InfiniteScroll>
        )
    }
}
export default InfiniteScrollUtil;

