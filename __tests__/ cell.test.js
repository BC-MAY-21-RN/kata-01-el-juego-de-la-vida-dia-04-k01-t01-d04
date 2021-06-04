/* eslint-disable no-undef */
const { LIVE, DEAD } = require('../src/states')
const Cell = require('../src/models/Cell')

describe('cell tests', () => {
  test('should create a cell with a initial LIVE state', () => {
    const cell = new Cell(LIVE)
    expect(cell.getState()).toBe(LIVE)
  })

  test('should create a cell with a initial DEAD state', () => {
    const cell = new Cell(DEAD)
    expect(cell.getState()).toBe(DEAD)
  })

  test('should create a cell with a initial default state', () => {
    const cell = new Cell()
    expect(cell.getState()).toBe(DEAD)
  })

  test('should have neighbors', () => {
    const cell = new Cell()
    expect(cell.neighbors).toEqual([])
  })

  test('should change state from dead to live', () => {
    const n1 = new Cell(LIVE)
    const n2 = new Cell(LIVE)
    const n3 = new Cell(LIVE)
    const n4 = new Cell(DEAD)
    const n5 = new Cell(DEAD)

    const cell = new Cell(DEAD, [n1, n2, n3, n4, n5])
    cell.generateNewState()
    cell.updateState()
    expect(cell.getState()).toBe(LIVE)
  })

  test('should change state from live to dead', () => {
    const n1 = new Cell(LIVE)
    const n2 = new Cell(DEAD)
    const n3 = new Cell(DEAD)
    const n4 = new Cell(DEAD)
    const n5 = new Cell(DEAD)

    const cell = new Cell(LIVE, [n1, n2, n3, n4, n5])
    cell.generateNewState()
    cell.updateState()
    expect(cell.getState()).toBe(DEAD)
  })

  test('should keep its state (live)', () => {
    const n1 = new Cell(LIVE)
    const n2 = new Cell(LIVE)
    const n3 = new Cell(DEAD)
    const n4 = new Cell(DEAD)
    const n5 = new Cell(DEAD)

    const cell = new Cell(LIVE, [n1, n2, n3, n4, n5])
    cell.generateNewState()
    cell.updateState()
    expect(cell.getState()).toBe(LIVE)
  })

  test('should keep its state (dead)', () => {
    const n1 = new Cell(LIVE)
    const n2 = new Cell(LIVE)
    const n3 = new Cell(DEAD)
    const n4 = new Cell(DEAD)
    const n5 = new Cell(DEAD)

    const cell = new Cell(DEAD, [n1, n2, n3, n4, n5])
    cell.generateNewState()
    cell.updateState()
    expect(cell.getState()).toBe(DEAD)
  })
})