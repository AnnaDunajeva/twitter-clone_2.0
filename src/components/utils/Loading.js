//should rewrite it to be a spinner
import React from 'react'
import PropTypes from 'prop-types'

const styles = {
    content: {
      fontSize: '25px',
      marginTop: '20px',
      marginBottom: '20px',
      textAlign: 'center',
    }
  }

class Loading extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: props.text
        }
    }
    componentDidMount () {
        this.interval = setInterval(()=>{
            if (this.state.text === this.props.text + '...') {
                this.setState({
                    text: this.props.text
                })
            } else {
                this.setState((state) => ({
                    text: state.text + '.'
                }))
            }
        }, this.props.speed)
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render () {
        return (
            <p style={styles.content}>
                {this.state.text}
            </p>
        )
    }
}
Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
}
Loading.defaultProps = {
    text: 'Loading',
    speed: 300
}

export default Loading;