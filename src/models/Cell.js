/* eslint-disable no-useless-constructor */
const { DEAD, LIVE } = require('../states')

class Cell {
  constructor (state = DEAD, neighbors = []) {
    this.state = state || LIVE
    this.neighbors = neighbors
    this.nextState = null
  }

  generateNewState () {
    let liveNeighbors = 0
    this.neighbors.forEach(neighbor => {
      if (neighbor.state === LIVE) { liveNeighbors += 1 }
    })

    if (this.state === DEAD && liveNeighbors === 3) {
      this.nextState = LIVE
    } else if (this.state === LIVE && (liveNeighbors < 2 || liveNeighbors > 3)) {
      this.nextState = DEAD
    } else if (this.state === LIVE && (liveNeighbors === 2 || liveNeighbors === 3)) {
      this.nextState = this.state
    } else {
      this.nextState = this.state
    }
  }

  updateState () {
    this.state = this.nextState
  }

  getState () {
    return this.state
  }
}

module.exports = Cell