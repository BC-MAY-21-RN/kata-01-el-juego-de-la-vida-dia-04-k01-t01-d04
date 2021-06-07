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

    const shouldSurvive = this.state === DEAD && liveNeighbors === 3
    const shouldDie = this.state === LIVE && (liveNeighbors < 2 || liveNeighbors > 3)

    if (shouldSurvive) {
      this.nextState = LIVE
    } else if (shouldDie) {
      this.nextState = DEAD
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