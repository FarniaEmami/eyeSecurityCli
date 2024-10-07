import * as fs from 'fs'
import chalk from 'chalk'
import csv from 'csv-parser'
import axios from 'axios'

interface Asset {
    id: string;
    asset_name: string;
    ip: string;
    created_utc: string;
    source: string;
    category: string;
}

export async function ingest(path: string, filter: string) {
    if(!path){
        console.error(chalk.red(`Error: The --path option is required.`))
        process.exit(1)
    }

    if(!fileExists(path)){
        console.error(chalk.red(`Error: File does not exist or path is incorrect`))
        process.exit(1)
    }

    const batchSize = 20
    let batchData : Asset[] = []

    const readStream = fs.createReadStream(path).pipe(csv());
    console.log(chalk.bold(`Ingestion started. Sending data in batches of ${batchSize}`))

    for await (const row of readStream) {
        const asset = convertCSVToObject(row)

        //TODO: Apply filter 

        batchData.push(asset)
        
        if (batchData.length === batchSize) {
            // console.log('Processing batch of size:', batchData.length)
            await processBatch(batchData)
            batchData = []
        }
    }

    if (batchData.length > 0) {
        // console.log('Processing final batch of size:', batchData.length)
        await processBatch(batchData)
    }

    console.log(chalk.green('CSV file successfully processed'))
    //TODO: display summary: successful ingestion count, failed ingestion count
} 


function fileExists(path: string): boolean {
    return fs.existsSync(path)
}

async function processBatch(batchData: Asset[]) {
    try {
      const response = await callIngestService(batchData)
      const data = response?.data
      console.log(chalk.yellow(`Total Assets: ${data.summary.totalAssets}`))
      console.log(chalk.green(`Successfully Enriched: ${data.summary.successfullyEnriched}`))
      console.log(chalk.red(`Enrichment Failed: ${data.summary.enrichmentFailed}`))
      console.log(chalk.green(`Analytics Success: ${data.summary.analyticsSuccess}`))
      console.log(chalk.red(`Analytics Failed: ${data.summary.analyticsFailed}`))
      console.log(`----------------------------------------`)
    } catch (error) {
      console.error(chalk.red('Error processing batch:', error))
    }
  }

async function callIngestService(data: Asset[]) {
    try {
        const axiosConfig = {
            method: 'post',
            url: 'http://localhost:3000/ingest',
            data
        }
      
        return await axios.request(axiosConfig)
    } catch (error) {
        console.error(`Error: There was an error in callIngestService ${error}`)
        //TODO: throw or process.exit
    }
}

function convertCSVToObject(row: any): Asset {
    const headerLine = Object.keys(row)[0]
    const valueLine = row[headerLine]

    const headers = headerLine.split(';')
    const values = valueLine.split(';')

    const obj: { [key: string]: string } = {}
    headers.forEach((header, index) => {
        obj[header] = values[index]
    })

    return {
        id: obj.id,
        asset_name: obj.asset_name,
        ip:obj.ip,
        created_utc: obj.created_utc,
        source: obj.source,
        category: obj.category
    }
}