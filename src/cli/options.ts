import minimist from 'minimist'

export const cliOpts = parseOptions(process.argv.slice(2))

interface CliOptions {
    command: string;
    path: string;
    filter?: string
}

function parseOptions(argv: string[]): CliOptions {
    const opts = minimist(argv, {
        string: ['path', 'filter'], 
        alias: {
            p: 'path', 
            f: 'filter'
        }, 
        default: {}
    })

    return{
        command: opts._[0], 
        path: opts.path, 
        filter: opts.filter
    }
}