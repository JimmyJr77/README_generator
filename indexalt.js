// TODO: Include packages needed for this application

const fs = require('fs');
const inquirer = require('inquirer')
import { input, confirm } from '@inquirer/prompts';

// TODO: Create an array of questions for user input

const projectTitleQuestions = [
    {
        type: 'input',
        message: 'What is your project titled?',
        name: 'projectTitled',
    },
];

const tableOfContentsQuestions = [
    // {
    //     type: 'confirm',
    //     message: 'Do you want to add the section: "Description"?',
    //     name: 'descriptionConfirm',
    // },
    {
        type: 'confirm',
        message: 'Do you want to add the section: "Table of Contents"?',
        name: 'tableOfContentsConfirm',
    },
    // {
    //     type: 'confirm',
    //     message: 'Do you want to add the section: "Installation"?',
    //     name: 'installationConfirm',
    // },
    {
        type: 'confirm',
        message: 'Do you want to add the section: "Usage"?',
        name: 'UsageConfirm',
    },
    {
        type: 'confirm',
        message: 'Do you want to add the section: "Credits"?',
        name: 'creditsConfirm',
    },
    {
        type: 'confirm',
        message: 'Do you want to add the section: "License"?',
        name: 'licenseConfirm',
    },
    {
        type: 'confirm',
        message: 'Do you want to add the section: "Badges"?',
        name: 'badgesConfirm',
    },
    {
        type: 'confirm',
        message: 'Do you want to add the section: "Features"?',
        name: 'featuresConfirm',
    },
    {
        type: 'confirm',
        message: 'Do you want to add the section: "How to Contribute"?',
        name: 'howToContributeConfirm',
    },
    {
        type: 'confirm',
        message: 'Do you want to add the section: "Tests"?',
        name: 'testsConfirm',
    }
];

// const descriptionQuestions = [
//     {
//         type: 'input',
//         message: 'What was your motivation?',
//         name: 'motivation',
//     },
//     {
//         type: 'input',
//         message: 'Why did you build this project?',
//         name: 'whyBuild',
//     },
//     {
//         type: 'input',
//         message: 'What problem does it solve?',
//         name: 'problemSolved',
//     },
//     {
//         type: 'input',
//         message: 'What did you learn?',
//         name: 'whatWasLearned',
//     }
// ];

const installationQuestions = [
    {
        type: 'input',
        message: 'What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.',
        name: 'motivation',
    },
    {
        type: 'input',
        message: 'Enter the next step or leave empty to finish.',
        name: 'step',
      },
];

const usageQuestions = [
    {
        type: 'input',
        message: 'Provide instructions and examples for use. Include screenshots as needed.',
        name: 'usage',
    },
    {
        type: 'input',
        message: 'To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. This response will generate the relative filepath and add it to the README. What is the name and file extention of the image file (file name is caps sensitive)?',
        name: 'imageName',
    },
    {
        type: 'input',
        message: 'What is an appropriate alt text for the image?',
        name: 'imageAltText',
    },
];


// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

function createStepByStepList() {
  return inquirer
    .prompt([installationQuestions])
    .then((answers) => {
      const { step } = answers;
      // If the user enters a step, recursively call the function to get the next step
      if (step) {
        return createStepByStepList().then((nextSteps) => [step, ...nextSteps]);
      }
      // If the user leaves the step empty, return an empty array to indicate completion
      return [];
    });
}
// Usage
createStepByStepList().then((steps) => {
  console.log('Step-by-Step List:');
  steps.forEach((step, index) => {
    console.log(`${index + 1}. ${step}`);
  });
});


// TODO: Create a function to initialize app
function init() {}


// Function call to initialize app
init();










_____________________________________________________________________________________________________________________________________________________________________________________











// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');

// TODO: Create an array of questions for user input
const questions = [
  {
    type: 'input',
    message: 'What is your project titled?',
    name: 'projectTitle',
  },
  {
    type: 'confirm',
    message: 'Do you want to add the section: "Description"?',
    name: 'descriptionConfirm',
    default: false,
  },
  {
    type: 'input',
    message: 'What was your motivation?',
    name: 'motivation',
    when: (answers) => answers.descriptionConfirm,
  },
  {
    type: 'input',
    message: 'Why did you build this project?',
    name: 'whyBuild',
    when: (answers) => answers.descriptionConfirm,
  },
  {
    type: 'input',
    message: 'What problem does it solve?',
    name: 'problemSolved',
    when: (answers) => answers.descriptionConfirm,
  },
  {
    type: 'input',
    message: 'What did you learn?',
    name: 'whatWasLearned',
    when: (answers) => answers.descriptionConfirm,
  },
  {
    type: 'confirm',
    message: 'Do you want to add the section: "Installation"?',
    name: 'installationConfirm',
    default: false,
  },
  {
    type: 'input',
    message: 'What is required to install your project? Provide full instruction or the first step instructing how to get the development environment running.',
    name: 'installationSteps',
    when: (answers) => answers.installationConfirm,
  },
  {
    type: 'input',
    message: 'Enter the next step or leave empty to finish.',
    name: 'step',
  },
];

// TODO: Create a function to generate README file content based on user answers
function generateReadmeContent(answers) {
  let descriptionContent = 'No description provided.';
  if (answers.descriptionConfirm) {
    descriptionContent =
      '#### Motivation\n: ' + answers.motivation + '\n\n' +
      '#### Why Build:\n' + answers.whyBuild + '\n\n' +
      '#### Problem Solved:\n' + answers.problemSolved + '\n\n' +
      '#### What Was Learned:\n' + answers.whatWasLearned;
  }

  let installationContent = 'No installation instructions provided.';
  if (answers.installationConfirm && answers.installationSteps) {
    const steps = [];
    let i = 0;
    do {
      const step = answers['step' + (i + 1)];
      if (step !== '') {
        steps.push(step);
      }
      i++;
    } while (answers['step' + (i + 1)] !== '');

    if (steps.length > 0) {
      installationContent = '';
      for (let j = 0; j < steps.length; j++) {
        installationContent += `Step ${j + 1}: ${steps[j]}\n\n`;
      }
    }
  }

  const readmeContent =
    '# ' + answers.projectTitle + '\n\n' +
    '## Description\n' +
    descriptionContent + '\n\n' +
    '## Installation\n' +
    installationContent + '\n\n';

  return readmeContent;
}

// Function to write the README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`File "${fileName}" created successfully.`);
  });
}

inquirer.prompt(questions)
  .then((answers) => {
    console.log('List of Answers:');
    console.log(answers);

    // Generate the README file content using the user's answers
    const readmeContent = generateReadmeContent(answers);

    // Write the README file
    writeToFile('README.md', readmeContent);
  })
  .catch((error) => {
    console.error(error);
  });



// TODO: Create a function to initialize app
function init() {}


// Function call to initialize app
init();



_____________________________________________________________________________________________________________________________________________________________________________________


// TODO: Include packages needed for this application

const fs = require('fs');
const inquirer = require('inquirer');

// TODO: Create an array of questions for user input
const questions = [
    {
      type: 'input',
      message: 'What is your project titled?',
      name: 'projectTitle',
    },
    {
      type: 'confirm',
      message: 'Do you want to add the section: "Description"?',
      name: 'descriptionConfirm',
      default: false,
    },
    {
      type: 'input',
      message: 'What was your motivation?',
      name: 'motivation',
      when: (answers) => answers.descriptionConfirm,
    },
    {
      type: 'input',
      message: 'Why did you build this project?',
      name: 'whyBuild',
      when: (answers) => answers.descriptionConfirm,
    },
    {
      type: 'input',
      message: 'What problem does it solve?',
      name: 'problemSolved',
      when: (answers) => answers.descriptionConfirm,
    },
    {
      type: 'input',
      message: 'What did you learn?',
      name: 'whatWasLearned',
      when: (answers) => answers.descriptionConfirm,
    },
    {
      type: 'confirm',
      message: 'Do you want to add the section: "Installation"?',
      name: 'installationConfirm',
      default: false,
    },
    {
      type: 'input',
      message: 'What is required to install your project? Provide full instruction or the first step instructing how to get the development environment running.',
      name: 'installationStep1',
      when: (answers) => answers.installationConfirm,
    },
    {
      type: 'input',
      message: 'Enter the next step or leave empty to finish.',
      name: 'nextStep',
      when: (answers) => answers.installationConfirm
    },
];

// Recursive function to ask the next step question repeatedly until blank response
function askNextStep(answers) {
  return inquirer
    .prompt([
      {
        type: 'input',
        message: 'Enter the next step or leave empty to finish.',
        name: 'remainingSteps',
      },
    ])
    .then((remainingStepsAnswers) => {
      if (remainingStepsAnswers.remainingSteps !== '') {
        // Append the step answer to the installationSteps
        answers.installationSteps +=
          '\n' + remainingStepsAnswers.remainingSteps;
        return askNextStep(answers);
      }
      return answers;
    });
}


// TODO: Create a function to generate README file content based on user answers
function generateReadmeContent(answers) {
    let descriptionContent = 'No description provided.';
    if (answers.descriptionConfirm) {
        descriptionContent = 
            '#### Motivation:\n ' + answers.motivation + '\n\n' +
            '#### Why Build:\n' + answers.whyBuild + '\n\n' +
            '#### Problem Solved:\n' + answers.problemSolved + '\n\n' +
            '#### What Was Learned:\n' + answers.whatWasLearned;
    }
    let installationContent = 'No installation instructions provided.';
    if (answers.installationConfirm && answers.installationSteps) {
      const steps = answers.installationSteps.split('\n');
      installationContent = '';
      let i = 0;
      while (i < steps.length && steps[i] !== '') {
        installationContent += `Step ${i + 1}: ${steps[i]}\n\n`;
        i++;
      }
    }

  return '# ' + answers.projectTitle + '\n\n' +
    '## Description\n' +
    descriptionContent + '\n\n' +
    '## Installation\n' +
    installationContent + '\n\n' ;


}

// Function to write the README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`File "${fileName}" created successfully.`);
  });
}

inquirer.prompt(questions).then((answers) => {
  console.log('List of Answers:');
  console.log(answers);

  if (answers.installationConfirm && answers.nextStep !== '') {
    answers.installationStep1 = answers.nextStep;
    askNextStep(answers).then((finalAnswers) => {
      // Generate the README file content using the user's answers
      const readmeContent = generateReadmeContent(finalAnswers);

      // Write the README file
      writeToFile('README.md', readmeContent);
    });
  } else {
    // Generate the README file content using the user's answers
    const readmeContent = generateReadmeContent(answers);

    // Write the README file
    writeToFile('README.md', readmeContent);
  }
});