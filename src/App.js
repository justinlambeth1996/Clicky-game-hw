import React from 'react';


import Navbar from './components/Navbar'

// Importing Game Cards
import GameCard from "./components/GameCard";

// Importing Match cards
import matches from "./MatchCards";

// Importing App css
import './App.css';

class App extends React.Component {
  state = {
    matches,
    correctGuesses: 0,
    bestScore: 0,
    clickMessage: "Click on an image to gain points! Click on the same one twice and you lose."
  };

  handleImageClicked = async id => {
    const moviePosters = document.getElementById("game-cards");
    const clickedMatch = this.state.matches.filter(match => match.id === id);
    moviePosters.classList.remove("apply-shake");
    if(clickedMatch[0].clicked) {

      moviePosters.classList.add("apply-shake");
      this.setState({
        correctGuesses: 0,
        clickMessage:"You already clicked on that one. Try again.",
      });
      this.handleResetAllCards();
    } else if(this.state.correctGuesses < 11) {
      clickedMatch[0].clicked = true;
      this.setState({correctGuesses: this.state.correctGuesses + 1}, () => {
        if (this.state.correctGuesses > this.state.bestScore){
          this.setState({ bestScore: this.state.correctGuesses });
        }
      });
      this.setState({clickMessage:  "Great! You haven't click on that one yet! Keep going!" });
      this.handleShuffleCards();
    } else {
      clickedMatch[0].clicked = true;
      this.state.correctGuesses = 0;
      this.state.clickMessage = "WOW!!! You got ALL of them!!! Now, let's see if you can do it again!";
      this.setState({ bestScore: 12 });
      this.handleResetAllCards();
    }
  };

  handleShuffleCards = () => {
    let cards = this.state.matches;
    for (let i = 0; i < cards.length - 1; i++) {
      const j = i + Math.floor(Math.random() * (cards.length - i));

      const temp = cards[j];
      cards[j] = cards[i];
      cards[i] = temp;
    }
    this.setState({matches: cards});
  };

  handleResetAllCards = () => {
    for (let i = 0 ; i < this.state.matches.length ; i++){
      matches[i].clicked = false;
      this.setState({
        correctGuesses: 0,
        matches: matches
      });
      this.handleShuffleCards()
    }
  };

  render() {
    return (
        <div className="App">
          <Navbar score={this.state.correctGuesses} topScore={this.state.bestScore} />
          <div className="jumbotron py-3">
            <h4>{this.state.clickMessage}</h4>
          </div>
          <div className="container">
            <div id="game-cards" className="row">
              {this.state.matches.map((matchCard, index) => {
                return <GameCard
                    key={index}
                    id={matchCard.id}
                    name={matchCard.name}
                    image={matchCard.image}
                    handleOnClick={this.handleImageClicked}
                />
              })}
            </div>

          </div>
        </div>
    );
  };
}

export default App;
