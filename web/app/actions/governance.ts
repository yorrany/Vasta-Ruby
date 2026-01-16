'use server'

import { exec } from 'child_process'
import path from 'path'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function getScanResults() {
  try {
    const pluginPath = path.resolve(process.cwd(), '../.antigravity/plugins/vasta-ux-guard/scanner.js')
    const { stdout } = await execAsync(`node "${pluginPath}" --json`)
    
    try {
        // The scanner might output other logs if not careful, but we suppressed them in jsonMode. 
        // We find the JSON start/end if there's noise, but there shouldn't be.
        return JSON.parse(stdout)
    } catch (parseError) {
        console.error("Failed to parse scanner output:", stdout)
        throw new Error("Invalid format from UX Guard scanner")
    }
  } catch (error) {
    console.error('UX Guard Scan Failed:', error)
    return null
  }
}
