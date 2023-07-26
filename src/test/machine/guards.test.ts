import { beforeEach, describe, expect, it } from "vitest";
import { InterpreterFrom, interpret } from "xstate";
import { GameMachine, GameModel, makeGame } from "../../machine/GameMachine";
import { GameContext, GameStates, PlayerColors } from "../../types";

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






    describe("canDropToken", () =>{

        let machine: InterpreterFrom<typeof GameMachine>

        beforeEach(() => {
            machine = makeGame (GameStates.GAME, {
                players:[{
                    id:'1',
                    name : 'Player1',
                    color: PlayerColors.RED   
                }, {
                    id:'2',
                    name : 'Player2',
                    color: PlayerColors.YELLOW   
                }],
                currentPlayer: '1',
                grid: [
                    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', PlayerColors.RED],
                    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', PlayerColors.RED, PlayerColors.YELLOW],
                    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', PlayerColors.RED, PlayerColors.RED],
                    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', PlayerColors.RED, PlayerColors.YELLOW],
                    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', PlayerColors.YELLOW, PlayerColors.RED],
                    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY',PlayerColors.YELLOW, PlayerColors.YELLOW],
                ]
            })
        })
      
        it('let me drop a token', () =>{
            expect(machine.send(GameModel.events.dropToken("1", 0 )).changed).toBe(true)
            expect(machine.getSnapshot().value).toBe('GAME')
        })

        it('Do not let me drop a token', () =>{
            expect(machine.send(GameModel.events.dropToken("1",6)).changed).toBe(false)
            expect(machine.getSnapshot().value).toBe('GAME')
        })
        
        it('let me win ', () =>{
            expect(machine.send(GameModel.events.dropToken("1",5)).changed).toBe(true)
            expect(machine.getSnapshot().value).toBe('WIN')
            expect(machine.getSnapshot().context.winingPosition).toHaveLength(4)
        })
    })

})