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
    })

})