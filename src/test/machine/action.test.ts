import { beforeEach, describe, expect, it } from "vitest";
import { InterpreterFrom, interpret } from "xstate";
import { GameMachine, GameModel } from "../../machine/GameMachine";


describe("machines/actions", () =>{
    
    describe("joinGame", () =>{
        let machine:InterpreterFrom<typeof GameMachine>

        beforeEach(() =>
        {
            machine = interpret(GameMachine).start()
        })

        it('Let a Player Join', () => {
            expect(machine.send(GameModel.events.join("1","1")).changed).toBe(true)
            expect(machine.getSnapshot().context.players).toHaveLength(1)
        })

        it('Let 2 Player Join  ', () => {
            expect(machine.send(GameModel.events.join("1","1")).changed).toBe(true)
            expect(machine.send(GameModel.events.join("2","2")).changed).toBe(true)
            expect(machine.getSnapshot().context.players).toHaveLength(2)
        })

        it('3 Player Join but the game accept 2', () => {
            expect(machine.send(GameModel.events.join("1","1")).changed).toBe(true)
            expect(machine.send(GameModel.events.join("2","2")).changed).toBe(true)
            machine.send(GameModel.events.join("3","3"))
            expect(machine.getSnapshot().context.players).toHaveLength(2)
        })
    })

    describe("leaveGameAction", () =>{
        let machine:InterpreterFrom<typeof GameMachine>

        beforeEach(() =>
        {
            machine = interpret(GameMachine).start()
        })

        it('Let a Player Leave', () => {
            expect(machine.send(GameModel.events.join("1","1")).changed).toBe(true)
            machine.send(GameModel.events.leave("1"))
            expect(machine.getSnapshot().context.players).toHaveLength(0)
        })

        it('Let two Player Leave', () => {
            expect(machine.send(GameModel.events.join("1","1")).changed).toBe(true)
            expect(machine.send(GameModel.events.join("2","2")).changed).toBe(true)
            machine.send(GameModel.events.leave("1"))
            machine.send(GameModel.events.leave("2"))
            expect(machine.getSnapshot().context.players).toHaveLength(0)
        })
    })

})