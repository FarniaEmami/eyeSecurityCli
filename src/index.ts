#!/usr/bin/env node
import { cliOpts } from './cli/options'
import { help } from './cli/commands/help'
import { ingest } from './cli/commands/ingest'

const cliTasks: Record<string, Function> = {
    ingest: ingest
}

async function run(){
    if(cliOpts.command in cliTasks){
        await cliTasks[cliOpts.command](cliOpts.path, cliOpts.filter)
    } else {
        help()
    }
}

run()
