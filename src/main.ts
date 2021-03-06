import * as core from '@actions/core'
import * as github from '@actions/github'

const context = github.context

async function run(): Promise<void> {
  try {
    const repoToken: string = core.getInput('repo-token', {required: true})
    // core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

    // await wait(parseInt(ms, 10))
    // add comment
    if (context !== undefined) {
      core.info(`context: ${JSON.stringify(context)}`)
      if (context.payload.pull_request === undefined) {
        throw new Error('pull request is undefined')
      }
      core.info(`current pr: ${context.payload.pull_request.number}`)
      const octokit = github.getOctokit(repoToken)

      core.info(JSON.stringify(octokit))

      core.info(context.payload.pull_request.base.ref)

      const labelName = context.payload.pull_request.base.ref

      await octokit.issues.addLabels({
        issue_number: context.payload.pull_request.number,
        labels: [labelName],
        ...context.repo
      })
      console.log('OK!!')
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
