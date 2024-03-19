import * as util from "node:util"
import { spawn, execFile } from "child_process"

const execFileWithPromise = util.promisify(execFile)

/*
    if POST REQUEST:
        Read request data for material
        Update material excel data
        Execute julia/python code

    Read request inputs
    Generate results
    send response
*/
export default class QueryMaterialCtrl {

    static async executeUpdateScript(data) {

        // update materials_few.xlsx
        const {error, stderr} = await execFileWithPromise("python3", ["UpdateMaterials.py", JSON.stringify(data)])

        if (error) {
            throw error 
        }

        if (stderr) {
            throw new Error(stderr)
        }
    }

    static async generateResults(input1, input2) {
        // execute julia/python script
        // await executeScript()
        
        // generate results
        const {error, stderr, stdout} = await execFileWithPromise("python3", ["conv_to_sank.py", input1, input2], { cwd: "CMI_Tool_V1/" })
        
        if (error) {
            throw error 
        }

        if (stderr) {
            throw new Error(stderr)
        }

        return stdout
    }

    static async queryMaterialsGet(req, res, next) {

        // this prevents from sending multiple responses
        let response_sent = false
        
        try {
            // generate results
            const input1 = req.data != undefined ? req.data.input1 : req.query.input1
            const input2 = req.data != undefined ? req.data.input2 : req.query.input2
            
            const stdout = await QueryMaterialCtrl.generateResults(input1, input2)

            console.log(`Received from child process: ${stdout}`)
            console.log(`[stdout] Response status: ${response_sent}`)

            if (!response_sent) {
                console.log(`[stdout] Response status inside: ${response_sent}`)
                res.status(200).json(stdout.toString())
                response_sent = true
                return
            }

        } catch (e) {
            console.log(e)
            res.status(404).json({ error: `Error received from server: Invalid request` })
        }
    }

    static async queryMaterialsPost(req, res, next) {

        // this prevents from sending multiple responses
        let response_sent = false

        try {
            // update material data
            json_data = req.data.json_data
            await QueryMaterialCtrl.executeUpdateScript(json_data)

            // use the same get method
            await QueryMaterialCtrl.queryMaterialsGet(req, res)

        } catch (e) {
            console.log(e)
            res.status(404).json({ error: `Error received from server: Invalid request` })
        }
    }

}

async function executeScript() {
    await execFileWithPromise("julia", ["ConvAssOptAllCompounds_highs.jl"], { cwd: "CMI_Tool_V1/" })
    await execFileWithPromise("python3", ["convert_scaled_xlsx_to_csv.py"], { cwd: "CMI_Tool_V1/" })
    console.log("script execute success")
}
