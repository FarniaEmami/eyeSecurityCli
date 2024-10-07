import chalk from 'chalk'

export function help(){
    console.log(chalk.bold('ingest-cli - A tool for ingesting CSV files with optional filtering.\n'));

    console.log(chalk.bold('USAGE:'));
    console.log(`  ${chalk.green('ingest-cli')} [COMMAND] [OPTIONS]\n`);

    console.log(chalk.bold('COMMANDS:'));
    console.log(`  ${chalk.green('help')}                  Show information about how to use ingest-cli.`);
    console.log(`  ${chalk.green('ingest')}                Ingest data from a CSV file with optional filtering.\n`);

    console.log(chalk.bold('OPTIONS:'));
    
    console.log(chalk.bold('  ingest [OPTIONS]:'));
    console.log(`    ${chalk.green('--path, -p <file_path>')}    Path to the CSV file to ingest (required).`);
    console.log(`    ${chalk.green('--filter, -f <filter>')}     Filter to apply on the CSV data (optional). Specify filter conditions in a key=value format.\n`);

    console.log(chalk.bold('EXAMPLES:'));
    console.log(`  1. Show help information:`);
    console.log(`     ${chalk.green('$ ingest-cli help')}\n`);
    console.log(`  2. Ingest a CSV file:`);
    console.log(`     ${chalk.green('$ ingest-cli ingest --path /path/to/file.csv')}\n`);
    console.log(`  3. Ingest a CSV file and apply a filter:`);
    console.log(`     ${chalk.green(`$ ingest-cli ingest --path /path/to/file.csv --filter "age>30"`)}\n`);

    console.log(chalk.bold('NOTES:'));
    console.log('  - The ' + chalk.green('--path') + ' option is required for the ingest command.');
    console.log('  - The ' + chalk.green('--filter') + ' option is optional and can be used to filter rows based on conditions.');
}
