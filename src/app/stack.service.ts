import { Injectable } from '@angular/core'
import hri from 'human-readable-ids'
import { PersistentData, Stack, Card } from './interfaces'
import { CardSide } from './enums'

type Item = Stack | Card

@Injectable({
  providedIn: 'root',
})
export class StackService {
  persistentData: PersistentData = {
    stacks: [],
    activeStackId: undefined,
    banner: true,
  }
  activeStack: Stack = {
    id: undefined,
    name: undefined,
    cards: [],
  }
  activeStackBase = JSON.parse(JSON.stringify(this.activeStack))
  chosenCardSide = CardSide.top

  constructor() {
    const state = JSON.parse(localStorage.getItem('flippyPanda'))
    if (state) {
      this.persistentData = state
      this.SetActiveStackId(state.activeStackId)
    }
  }

  addStack() {
    const newId = this.createUniqueId(this.persistentData.stacks)
    const newStack = {
      id: newId,
      name: `stack #${this.persistentData.stacks.length + 1}`,
      cards: [],
    }

    const newStacks = [...this.persistentData.stacks, newStack]
      .sort((a: Stack, b: Stack) => a.name > b.name ? 1 : -1)

    this.updatePersistentData({ stacks: newStacks })
    this.SetActiveStackId(newId)
  }

  removeStack() {
    const leftStacks = this.persistentData.stacks.filter(e => {
      return e.id !== this.persistentData.activeStackId
    })
    this.updatePersistentData({ stacks: [...leftStacks] }, false)
    if (this.persistentData.stacks.length > 0) {
      this.SetActiveStackId(this.persistentData.stacks[0].id)
    } else {
      this.SetActiveStackId(undefined)
    }
  }

  addCard(leftText: string, rightText: string) {
    this.updateActiveStack({
      cards: [...this.activeStack.cards, {
        id: this.createUniqueId(this.activeStack.cards),
        left: leftText,
        right: rightText,
      }],
    })
  }

  removeCard(id: string) {
    const activeStack = this.activeStack
    const leftCards = activeStack.cards.filter(e => e.id !== id)
    this.updateActiveStack({ cards: [...leftCards] })
  }

  updatePersistentData(update: object, updateLocalStorage = true) {
    Object.assign(this.persistentData, update)
    if (updateLocalStorage) {
      this.updateLocalStorage()
    }
  }

  updateActiveStack(update: object, updateLocalStorage = true) {
    Object.assign(this.activeStack, update)
    if (updateLocalStorage) {
      this.updateLocalStorage()
    }
  }

  updateLocalStorage = () => localStorage.setItem('flippyPanda', JSON.stringify(this.persistentData))

  SetActiveStackId(id: string) {
    this.updatePersistentData({ activeStackId: id })
    this.activeStack = id
      ? this.persistentData.stacks.filter(e => e.id === this.persistentData.activeStackId)[0]
      : this.activeStackBase
  }

  createUniqueId = (arr: Item[]): string => {
    let newId: string
    while (true) {
      newId = hri.hri.random()
      const leftStacks = arr.filter(e => e.id === newId)
      if (leftStacks.length === 0) { return newId }
    }
  }
}
