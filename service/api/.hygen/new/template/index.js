module.exports = {
  prompt: async ({ inquirer }) => {
    const layerAnswer = await inquirer.prompt([
      {
        type: 'select',
        name: 'layer',
        message: 'Which internal layer?',
        choices: ['domain', 'usecase', 'infra'],
      },
    ])

    const operation = ['create', 'get', 'list', 'update', 'delete']
    let sublayerChoices = []

    if (layerAnswer.layer === 'domain') {
      sublayerChoices = ['model', 'repository']
    } else if (layerAnswer.layer === 'usecase' || layerAnswer.layer === 'infra') {
      sublayerChoices = operation
    }

    const questions = [
      {
        type: 'select',
        name: 'sublayer',
        message: 'Select the sub-layer or component:',
        choices: sublayerChoices,
      },
      {
        type: 'input',
        name: 'entity',
        message: 'What is the name of the entity?',
      },
    ]

    const sublayerAnswers = await inquirer.prompt(questions)

    return { ...layerAnswer, ...sublayerAnswers }
  },
}
