import React from 'react';
import List from './List'
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      list: props.store.lists,
      cards: props.store.allCards
    }
  }


  newRandomCard = () => {
    const id = Math.random().toString(36).substring(2, 4)
      + Math.random().toString(36).substring(2, 4);
    
    return {
      id,
      title: `Random Card ${id}`,
      content: 'lorem ipsum',
    }
  }


  addCard = (listId) => {
    const newCard = this.newRandomCard()

    //updates the cards object in state, indirectly
    let newState = this.state.cards
    newState[newCard.id] = newCard

    let newList = this.state.list

    let thisList = newList.map(list => {
      if(list.id === listId)
        {
          return {
            id: list.id,
            header: list.header,
            cardIds: list.cardIds.concat(newCard.id)
          }
        };

      return list; 
    })
    // updates the state directly using new variables
    this.setState({
      cards: newState,
      list: thisList,
    })
  }

  omit = (cards, cardId) => {
    return Object.entries(cards).reduce(
      (newObj, [key, value]) =>
          key === cardId ? newObj : {...newObj, [key]: value},
      {}
    );
  }

  deleteCard = (cardId) => {
    
    let newCards = this.state.cards
    let newList = this.state.list

    // let deleted = newList.cardIds.filter(id => id !== cardId)
    let thisList = newList.map(list => ({
      
            id: list.id,
            header: list.header,
            cardIds: list.cardIds.filter(id => id !== cardId)
          }));
        
    let deleted = this.omit(newCards, cardId);

    this.setState({
      cards: deleted,
      list: thisList,
    })
  }

  render() {

    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {this.state.list.map(list => (
            <List
              id={list.id}
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => this.state.cards[id])}
              handleDelete={this.deleteCard}
              handleAddCard={this.addCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
