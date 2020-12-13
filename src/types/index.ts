export interface Size {
  cols: number
  rows: number
}

export interface Settings {
  size: Size
  mines: number
}

export interface Position {
  col: number
  row: number
}

export enum Status {
  inProgress = 'in_progress',
  lost = 'lost',
  won = 'won'
}

export interface Cell {
  value: Value
  state: State
}

export enum State {
  hidden,
  revealed,
  marked,
  lost
}

export enum Value {
  mine = -1,
  empty,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight
}
