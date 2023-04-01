import './App.css'
import React from 'react'

const API =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

const colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857"
];

const randomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      quote:
        "The person who says it cannot be done should not interrupt the person who is doing it.",
      author: "Chinese Proverb"
    };
    this.onNewQuote = this.onNewQuote.bind(this);
  }

  componentDidMount() {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          quotes: res.quotes
        });
      });
  }

  onNewQuote() {
    console.log("newQuote");
    this.forceUpdate();
  }

  render() {
    const color = randomColor();
    const { quotes } = this.state;
    var { quote, author } = this.state;
    var tweetUrl = encodeURI(
      `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    );
    if (quotes.length > 0) {
      let randomIndex = Math.floor(Math.random() * quotes.length);
      quote = quotes[randomIndex].quote;
      author = quotes[randomIndex].author;
      tweetUrl = encodeURI(
        `https://twitter.com/intent/tweet?text=${quote} - ${author}`
      );
      console.log(quote, author, tweetUrl);
    } else {
      console.log("in else", quote, author);
    }
    return (
      <div
        className="row wrapper d-flex align-items-center justify-content-center"
        style={{
          backgroundColor: color,
          width: "100vw",
          height: "100vh"
        }}
      >
        <div
          className="shadow p-3 col-6 box p-4 rounded"
          id="quote-box"
          style={{
            color: color
          }}
        >
          <div className="fs-4 fw-semibold " id="text">
            <p>{quote}</p>
          </div>
          <div className="d-flex justify-content-end m-3" id="author">
            <cite>- {author}</cite>
          </div>
          <div className="d-flex justify-content-between">
            <a id="tweet-quote" href={tweetUrl} target="_top">
              <button
                className="btn"
                style={{
                  backgroundColor: color,
                  color: "white"
                }}
              >
                <i className="fa-brands fa-twitter"></i>
              </button>
            </a>
            <button
              className="btn"
              id="new-quote"
              onClick={this.onNewQuote}
              style={{
                backgroundColor: color,
                color: "white"
              }}
            >
              New Quote <i className="fa-solid fa-shuffle"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
