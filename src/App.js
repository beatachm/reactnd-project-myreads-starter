import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import MyReads from './MyReads'
import Search from './Search';

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route path="/" exact render={() => <MyReads />} />
        <Route path="/search" render={() => <Search />} />
      </div>
    )
  }
}

export default BooksApp
