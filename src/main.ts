import * as core from '@actions/core'
import * as github from '@actions/github'

const context = github.context

async function run(): Promise<void> {
  try {
    const repoToken: string = core.getInput('repo-token', {required: true})
    // core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

    // await wait(parseInt(ms, 10))
    // add comment

    core.info(`context: ${context ? JSON.stringify(context) : ''}`)

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
