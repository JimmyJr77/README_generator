// TODO: Include packages needed for this application

const fs = require('fs');
const inquirer = require('inquirer');

// TODO: Create an array of questions for user input
const descriptionQuestions = [
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
  }
];

const installationQuestions = [
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
      name: 'installationStep2',
      when: (answers) => answers.installationConfirm,
    },
    {
      type: 'input',
      message: 'Enter the next step or leave empty to finish.',
      name: 'installationRemainingSteps',
      when: (answers) => answers.installationConfirm && answers.installationStep2,
    },
];

const usageQuestions = [
  {
    type: 'confirm',
    message: 'Do you want to add the section: "Usage"?',
    name: 'usageConfirm',
    default: false,
  },
  {
    type: 'input',
    message: 'Provide full instruction and examples of use here. Associated screenshots can be added next.',
    name: 'usageStep1',
    when: (answers) => answers.usageConfirm,
  },
  {
    type: 'input',
    message: 'Provide alt text and relative path to the image you would like to show. use the following format: ![alt text](assets/images/screenshot.png)',
    name: 'usageStep1Image',
    when: (answers) => answers.usageConfirm,
  },
  {
    type: 'input',
    message: 'Provide full instruction and examples of use here. Associated screenshots can be added next.',
    name: 'usageStep2',
    when: (answers) => answers.usageStep1,
  },
  {
    type: 'input',
    message: 'Provide alt text and relative path to the image you would like to show. use the following format: ![alt text](assets/images/screenshot.png)',
    name: 'usageStep2Image',
    when: (answers) => answers.usageStep1,
  },
  {
    type: 'input',
    message: 'Provide full instruction and examples of use here. Associated screenshots can be added next.',
    name: 'usageRemainingSteps',
    when: (answers) => answers.usageStep2,
  },
  {
    type: 'input',
    message: 'Provide alt text and relative path to the image you would like to show. use the following format: ![alt text](assets/images/screenshot.png)',
    name: 'usageRemainingStepsImage',
    when: (answers) => answers.usageStep2,
  }
];

const creditsQuestions = [
  {
    type: 'confirm',
    message: 'Do you want to add the section: "Credits"?',
    name: 'creditsConfirm',
    default: false,
  },
  {
    type: 'input',
    message: 'List your collaborators, if any, with links to their GitHub profiles.',
    name: 'creditProfiles',
    when: (answers) => answers.creditsConfirm,
  },
  {
    type: 'input',
    message: 'If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.',
    name: 'credit3rdPartyAssets',
    when: (answers) => answers.creditsConfirm,
  },
  {
    type: 'input',
    message: 'If you followed tutorials, include links to those here as well.',
    name: 'creditTutorials',
    when: (answers) => answers.creditsConfirm,
  },
];

const licenseQuestions = [
  {
    type: 'confirm',
    message: 'Do you want to add the section: "License"?',
    name: 'licenseConfirm',
    default: false,
  },
  {
    type: 'input',
    message: 'The last section of a high-quality README file is the license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, refer to [https://choosealicense.com/](https://choosealicense.com/).',
    name: 'license',
    when: (answers) => answers.licenseConfirm,
  }
];

const badgesQuestions = [
  {
    type: 'confirm',
    message: 'Do you want to add the section: "Badges"?',
    name: 'badgesConfirm',
    default: false,
  },
  {
    type: 'input',
    message: "If you have badges, use the following format: ![badmath](https://img.shields.io/github/languages/top/lernantino/badmath)",
    name: 'badges',
    when: (answers) => answers.badgesConfirm,
  }
];

const featuresQuestions = [
  {
    type: 'confirm',
    message: 'Do you want to add the section: "Features"?',
    name: 'featuresConfirm',
    default: false,
  },
  {
    type: 'input',
    message: 'If your project has a lot of features, list them here.',
    name: 'features',
    when: (answers) => answers.featuresConfirm,
  }
];

const contributeQuestions = [
  {
    type: 'confirm',
    message: 'Do you want to add the section: "How to Contribute"?',
    name: 'contributeConfirm',
    default: false,
  },
  {
    type: 'input',
    message: "If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own if you'd prefer.",
    name: 'contribute',
    when: (answers) => answers.contributeConfirm,
  }
];

const testsQuestions = [
  {
    type: 'confirm',
    message: 'Do you want to add the section: "Tests"?',
    name: 'testsConfirm',
    default: false,
  },
  {
    type: 'input',
    message: 'Go the extra mile and write tests for your application.',
    name: 'tests',
    when: (answers) => answers.testsConfirm,
  }
];

// Recursive function to ask a question repeatedly until a blank response
function askUntilBlank(question, fieldName, answers) {
  return inquirer
    .prompt([
      {
        type: 'input',
        message: question,
        name: fieldName,
      },
    ])
    .then((response) => {
      const fieldValue = response[fieldName].trim();
      if (fieldValue !== '') {
        // Append the response to the respective field in answers
        answers[fieldName] += '\n' + fieldValue;
        return askUntilBlank(question, fieldName, answers);
      }
      return answers;
    });
}

// TODO: Create a function to generate README file content based on user answers
function generateReadmeContent(answers) {
  let content = '# ' + answers.projectTitle + '\n\n';

  if (answers.descriptionConfirm) {
    descriptionContent =
      '#### Motivation:\n ' + answers.motivation +'\n\n' + 
      '#### Why Build:\n' + answers.whyBuild + '\n\n' +
      '#### Problem Solved:\n' + answers.problemSolved + '\n\n' +
      '#### What Was Learned:\n' + answers.whatWasLearned;
      content += '## Description\n' + descriptionContent + '\n\n';
  }

  // Create the Table of Contents
  let tableOfContents = [];
  if (answers.installationConfirm) {
    tableOfContents.push('- [Installation](#installation)');
  }
  if (answers.usageConfirm) {
    tableOfContents.push('- [Usage](#usage)');
  }
  if (answers.creditsConfirm) {
    tableOfContents.push('- [Credits](#credits)');
  }
  if (answers.licenseConfirm) {
    tableOfContents.push('- [License](#license)');
  }
  if (answers.badgesConfirm) {
    tableOfContents.push('- [Badges](#badges)');
  }
  if (answers.featuresConfirm) {
    tableOfContents.push('- [Features](#features)');
  }
  if (answers.contributeConfirm) {
    tableOfContents.push('- [How to Contribute](#how-to-contribute)');
  }
  if (answers.testsConfirm) {
    tableOfContents.push('- [Tests](#tests)');
  }
  content += '## Table of Contents\n' + tableOfContents.join('\n') + '\n\n';

  if (answers.installationConfirm && answers.installationStep1) {
    installationContent = 
      '#### Step 1:\n' + answers.installationStep1;
    if (answers.installationStep2) {
      installationContent += '\n\n#### Step 2:\n' + answers.installationStep2;
    }
    if (answers.installationRemainingSteps) {
      installationContent +=
        '\n\n#### Remaining Steps:\n' + answers.installationRemainingSteps;
    }
    content += '## Installation\n' + installationContent + '\n\n';
  }

  if (answers.usageConfirm) {
    content += '## Usage\n';
    content += '#### Step 1:\n' + answers.usageStep1 + '\n\n';
    content += answers.usageStep1Image + '\n\n';
    if (answers.usageStep2) {
      content += '#### Step 2:\n' + answers.usageStep2 + '\n\n';
      content += answers.usageStep2Image + '\n\n';
    }
    if (answers.usageRemainingSteps) {
      content += '#### Remaining Steps:\n' + answers.usageRemainingSteps + '\n\n';
      content += answers.usageRemainingStepsImage + '\n\n';
    }
  }

  if (answers.creditsConfirm) {
    content += '## Credits\n' + answers.creditProfiles + '\n\n';
    content += '#### Third-Party Assets:\n' + answers.credit3rdPartyAssets + '\n\n';
    content += '#### Tutorials Followed:\n' + answers.creditTutorials + '\n\n';
  }

  if (answers.licenseConfirm) {
    content += '## License\n' + answers.license + '\n\n';
  }

  if (answers.badgesConfirm) {
    content += '## Badges\n' + answers.badges + '\n\n';
  }

  if (answers.featuresConfirm) {
    content += '## Features\n' + answers.features + '\n\n';
  }

  if (answers.contributeConfirm) {
    content += '## How to Contribute\n' + answers.contribute + '\n\n';
  }

  if (answers.testsConfirm) {
    content += '## Tests\n' + answers.tests + '\n\n';
  }

  return content;
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

// Prompt for Description section questions
inquirer.prompt(descriptionQuestions).then((descriptionAnswers) => {
  console.log('Description Answers:');
  console.log(descriptionAnswers);

  // Prompt for Installation section questions
  inquirer.prompt(installationQuestions).then((installationAnswers) => {
    console.log('Installation Answers:');
    console.log(installationAnswers);

    // Prompt for Usage section questions
    inquirer.prompt(usageQuestions).then((usageAnswers) => {
      console.log('Usage Answers:');
      console.log(usageAnswers);

      // Prompt for Credits section questions
      inquirer.prompt(creditsQuestions).then((creditsAnswers) => {
        console.log('Credits Answers:');
        console.log(creditsAnswers);

        // Prompt for License section questions
        inquirer.prompt(licenseQuestions).then((licenseAnswers) => {
          console.log('License Answers:');
          console.log(licenseAnswers);

          // Prompt for Badges section questions
          inquirer.prompt(badgesQuestions).then((badgesAnswers) => {
            console.log('Badges Answers:');
            console.log(badgesAnswers);

            // Prompt for Features section questions
            inquirer.prompt(featuresQuestions).then((featuresAnswers) => {
              console.log('Features Answers:');
              console.log(featuresAnswers);

              // Prompt for Contribute section questions
              inquirer.prompt(contributeQuestions).then((contributeAnswers) => {
                console.log('Contribute Answers:');
                console.log(contributeAnswers);

                // Prompt for Tests section questions
                inquirer.prompt(testsQuestions).then((testsAnswers) => {
                  console.log('Tests Answers:');
                  console.log(testsAnswers);

                  // Combine all section answers into one object
                  const allAnswers = {
                    ...descriptionAnswers,
                    ...installationAnswers,
                    ...usageAnswers,
                    ...creditsAnswers,
                    ...licenseAnswers,
                    ...badgesAnswers,
                    ...featuresAnswers,
                    ...contributeAnswers,
                    ...testsAnswers,
                  };

                  // Generate the README file content using all answers
                  const readmeContent = generateReadmeContent(allAnswers);

                  // Write the README file
                  writeToFile('./new_readme/README.md', readmeContent);
                });
              });
            });
          });
        });
      });
    });
  });
});



//   let installationContent = 'No installation instructions provided.';
//   if (answers.installationConfirm && answers.installationSteps) {
//     const steps = answers.installationSteps.split('\n');
//     installationContent = '';
//     let i = 0;
//     while (i < steps.length && steps[i] !== '') {
//       installationContent += `Step ${i + 1}: ${steps[i]}\n\n`;
//       i++;
//     }
//   }
//   return '# ' + answers.projectTitle + '\n\n' +
//     '## Description\n' +
//     descriptionContent + '\n\n' +
//     '## Installation\n' +
//     installationContent + '\n\n' ;
// }