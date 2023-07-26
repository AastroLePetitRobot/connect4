import { beforeEach, describe, expect, it } from "vitest";
import { InterpreterFrom, interpret } from "xstate";
import { GameMachine, GameModel } from "../../machine/GameMachine";

describe("machines/guards", () =>{
    
    describe("canJoinGame", () =>{
        let machine:InterpreterFrom<typeof GameMachine>

        beforeEach(() =>
        {
            machine = interpret(GameMachine).start()
        })

        it('Let a Player Join', () => {
            expect(machine.send(GameModel.events.join("1","1")).changed).toBe(true)
        })

        it('Do not Let a Player Join twice ', () => {
            expect(machine.send(GameModel.events.join("1","1")).changed).toBe(true)
            expect(machine.send(GameModel.events.join("1","1")).changed).toBe(false)
        })

        it('Do not Let 3 Player Join', () => {
            expect(machine.send(GameModel.events.join("1","1")).changed).toBe(true)
            expect(machine.send(GameModel.events.join("2","2")).changed).toBe(true)
            expect(machine.send(GameModel.events.join("3","3")).changed).toBe(false)
        })
    })

    describe("canLeaveGame", () =>{
        let machine:InterpreterFrom<typeof GameMachine>

        beforeEach(() =>
        {
            machine = interpret(GameMachine).start()
        })

        it ('Let a player leave',() => {
            expect(machine.send(GameModel.events.join("1","1")).changed).toBe(true)
            expect(machine.send(GameModel.events.leave("1")).changed).toBe(true)
        })

        it('Do not let an  player leave before enter',() => {
            expect(machine.send(GameModel.events.leave("2")).changed).toBe(false)
        })

        it('Do not let an unknow player leave',() => {
            expect(machine.send(GameModel.events.join("1","1")).changed).toBe(true)
            expect(machine.send(GameModel.events.leave("2")).changed).toBe(false)
        })

        it('Do not let an player leave twice',() => {
            expect(machine.send(GameModel.events.join("1","1")).changed).toBe(true)
            expect(machine.send(GameModel.events.leave("1")).changed).toBe(true)
            expect(machine.send(GameModel.events.leave("1")).changed).toBe(false)

        })

    })

})