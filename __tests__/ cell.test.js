/* eslint-disable no-undef */
const { LIVE, DEAD } = require('../src/states')
const Cell = require('../src/models/Cell');

describe('cell tests', () => {
  const cellGroupDeadtoAlive = [new Cell(LIVE), new Cell(LIVE), new Cell(LIVE), new Cell(), new Cell()]
  const cellGroupLivetoDie = [new Cell(LIVE), new Cell(), new Cell(), new Cell(), new Cell()]
  const cellGroupKeepState = [new Cell(LIVE), new Cell(LIVE), new Cell(), new Cell(), new Cell()]

  const expectIsAlive = (state) => expect(state).toBe(LIVE)
  const expectIsDead = (state) => expect(state).toBe(DEAD)

  const updateState = (cell) => {
    cell.generateNewState()
    cell.updateState()
  }

  test('should create a cell with a initial LIVE state', () => {
    const cell = new Cell(LIVE)
    expectIsAlive(cell.getState())
  })

  test('should create a cell with a initial DEAD state', () => {
    const cell = new Cell(DEAD)
    expectIsDead(cell.getState())
  })

  test('should create a cell with a initial default state', () => {
    const cell = new Cell()
    expectIsDead(cell.getState())
  })

  test('should have neighbors', () => {
    expect(new Cell().neighbors).toEqual([])
  })

  test('should change state from dead to live', () => {
    const cell = new Cell(DEAD, cellGroupDeadtoAlive)
    updateState(cell)
    expectIsAlive(cell.getState())
  })

  test('should change state from live to dead', () => {
    const cell = new Cell(LIVE, cellGroupLivetoDie)
    updateState(cell)
    expectIsDead(cell.getState())
  })

  test('should keep its state (live)', () => {
    const cell = new Cell(LIVE, cellGroupKeepState)
    updateState(cell)
    expectIsAlive(cell.getState())
  })

  test('should keep its state (dead)', () => {
    const cell = new Cell(DEAD, cellGroupKeepState)
    updateState(cell)
    expectIsDead(cell.getState())
  })
})