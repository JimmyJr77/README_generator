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
      message: 'What is required to install your project? Provide full instruction or simply the first step.',
      name: 'installationStep1',
      when: (answers) => answers.installationConfirm,
    },
    {
      type: 'input',
      message: 'Enter the next step or leave empty to finish.',
      name: 'installationStep2',
      when: (answers) => answers.installationStep1,
    },
    {
      type: 'input',
      message: 'Enter the next step or leave empty to finish.',
      name: 'installationStep3',
      when: (answers) => answers.installationStep2,
    },
    {
      type: 'input',
      message: 'Enter the next step or leave empty to finish.',
      name: 'installationStep4',
      when: (answers) => answers.installationStep3,
    },    
    {
      type: 'input',
      message: 'Enter the next step or leave empty to finish.',
      name: 'installationStep5',
      when: (answers) => answers.installationStep4,
    },
    {
      type: 'input',
      message: 'Enter the next step or leave empty to finish. Edit the README to add additional steps.',
      name: 'installationStep6',
      when: (answers) => answers.installationStep5,
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
    message: 'Give instructions of an example of use. Associated screenshots can be added next.',
    name: 'usageEx1',
    when: (answers) => answers.usageConfirm,
  },
  {
    type: 'input',
    message: 'Provide alt text and relative path to the supporting image. Use the format: ![alt text](assets/images/screenshot.png)',
    name: 'usageEx1Image',
    when: (answers) => answers.usageConfirm,
  },
  {
    type: 'input',
    message: 'Provide next set of usage instructions or leave blank to add a second image to the previous instructions. Screenshots can be added next.',
    name: 'usageEx2',
    when: (answers) => answers.usageEx1,
  },
  {
    type: 'input',
    message: 'Leave blank to continue or provide image using the following format: ![alt text](assets/images/screenshot.png)',
    name: 'usageEx2Image',
    when: (answers) => answers.usageEx2,
  },
  {
    type: 'input',
    message: 'Provide next set of usage instructions or leave blank to add a second image to the previous instructions. Screenshots can be added next.',
    name: 'usageEx3',
    when: (answers) => answers.usageEx2,
  },
  {
    type: 'input',
    message: 'Leave blank to continue or provide image using the following format: ![alt text](assets/images/screenshot.png)',
    name: 'usageEx3Image',
    when: (answers) => answers.usageEx3,
  },
  {
    type: 'input',
    message: 'Provide next set of usage instructions or leave blank to add a second image to the previous instructions. Screenshots can be added next.',
    name: 'usageEx4',
    when: (answers) => answers.usageEx3,
  },
  {
    type: 'input',
    message: 'Leave blank to continue or provide image using the following format: ![alt text](assets/images/screenshot.png)',
    name: 'usageEx4Image',
    when: (answers) => answers.usageEx4,
  },
  {
    type: 'input',
    message: 'Provide next set of usage instructions or leave blank to add a second image to the previous instructions. Screenshots can be added next.',
    name: 'usageEx5',
    when: (answers) => answers.usageEx4,
  },
  {
    type: 'input',
    message: 'Leave blank to continue or provide image using the following format: ![alt text](assets/images/screenshot.png)',
    name: 'usageEx5Image',
    when: (answers) => answers.usageEx5,
  },
  {
    type: 'input',
    message: 'Provide next set of usage instructions or leave blank to add a second image to the previous instructions. Screenshots can be added next.',
    name: 'usageEx6',
    when: (answers) => answers.usageEx5,
  },
  {
    type: 'input',
    message: 'Leave blank to continue or provide image using the following format: ![alt text](assets/images/screenshot.png). Modify the README to add more examples and images.',
    name: 'usageEx6Image',
    when: (answers) => answers.usageEx6,
  },
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
    message: 'Name a collaborator on your project or leave blank to skip.',
    name: 'creditProfile1',
    when: (answers) => answers.creditsConfirm,
  },
  {
    type: 'input',
    message: "What is this collaborator's GitHub username?",
    name: 'creditProfile1GitUsername',
    when: (answers) => answers.creditProfile1,
  },
  {
    type: 'input',
    message: "What is this collaborator's email address?",
    name: 'creditProfile1Email',
    when: (answers) => answers.creditProfile1,
  },
  {
    type: 'input',
    message: 'Name another collaborator on your project or leave blank to skip',
    name: 'creditProfile2',
    when: (answers) => answers.creditProfile1,
  },
  {
    type: 'input',
    message: "What is this collaborator's GitHub username?",
    name: 'creditProfile2GitUsername',
    when: (answers) => answers.creditProfile2,
  },
  {
    type: 'input',
    message: "What is this collaborator's email address?",
    name: 'creditProfile2Email',
    when: (answers) => answers.creditProfile2,
  },
  {
    type: 'input',
    message: 'List your collaborators with links to their GitHub profiles.',
    name: 'creditProfile3',
    when: (answers) => answers.creditProfile2,
  },
  {
    type: 'input',
    message: "What is this collaborator's GitHub username?",
    name: 'creditProfile3GitUsername',
    when: (answers) => answers.creditProfile3,
  },
  {
    type: 'input',
    message: "What is this collaborator's email address?",
    name: 'creditProfile3Email',
    when: (answers) => answers.creditProfile3,
  },
  {
    type: 'input',
    message: 'List your collaborators with links to their GitHub profiles.',
    name: 'creditProfile4',
    when: (answers) => answers.creditProfile3,
  },
  {
    type: 'input',
    message: "What is this collaborator's GitHub username?",
    name: 'creditProfile4GitUsername',
    when: (answers) => answers.creditProfile4,
  },
  {
    type: 'input',
    message: "What is this collaborator's email address?",
    name: 'creditProfile4Email',
    when: (answers) => answers.creditProfile4,
  },
  {
    type: 'input',
    message: 'List your collaborators with links to their GitHub profiles.',
    name: 'creditProfile5',
    when: (answers) => answers.creditProfile4,
  },
  {
    type: 'input',
    message: "What is this collaborator's GitHub username?",
    name: 'creditProfile5GitUsername',
    when: (answers) => answers.creditProfile5,
  },
  {
    type: 'input',
    message: "What is this collaborator's email address?",
    name: 'creditProfile5Email',
    when: (answers) => answers.creditProfile5,
  },
  {
    type: 'input',
    message: 'List your collaborators with links to their GitHub profiles.',
    name: 'creditProfile6',
    when: (answers) => answers.creditProfile5,
  },
  {
    type: 'input',
    message: "What is this collaborator's GitHub username?",
    name: 'creditProfile6GitUsername',
    when: (answers) => answers.creditProfile6,
  },
  {
    type: 'input',
    message: "What is this collaborator's email address?",
    name: 'creditProfile6Email',
    when: (answers) => answers.creditProfile6,
  },
  {
    type: 'input',
    message: 'If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.',
    name: 'credit3rdPartyAsset1',
    when: (answers) => answers.creditsConfirm,
  },
  {
    type: 'input',
    message: 'If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.',
    name: 'credit3rdPartyAsset2',
    when: (answers) => answers.credit3rdPartyAsset1,
  },
  {
    type: 'input',
    message: 'If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.',
    name: 'credit3rdPartyAsset3',
    when: (answers) => answers.credit3rdPartyAsset2,
  },
  {
    type: 'input',
    message: 'If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.',
    name: 'credit3rdPartyAsset4',
    when: (answers) => answers.credit3rdPartyAsset3,
  },
  {
    type: 'input',
    message: 'If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.',
    name: 'credit3rdPartyAsset5',
    when: (answers) => answers.credit3rdPartyAsset4,
  },
  {
    type: 'input',
    message: 'If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.',
    name: 'credit3rdPartyAsset6',
    when: (answers) => answers.credit3rdPartyAsset5,
  },
  {
    type: 'input',
    message: 'If you followed tutorials, include links to those here.',
    name: 'creditTutorial1',
    when: (answers) => answers.creditsConfirm,
  },
  {
    type: 'input',
    message: 'If you followed tutorials, include links to those here.',
    name: 'creditTutorial2',
    when: (answers) => answers.creditTutorial1,
  },
  {
    type: 'input',
    message: 'If you followed tutorials, include links to those here.',
    name: 'creditTutorial3',
    when: (answers) => answers.creditTutorial2,
  },
  {
    type: 'input',
    message: 'If you followed tutorials, include links to those here.',
    name: 'creditTutorial4',
    when: (answers) => answers.creditTutorial3,
  },
  {
    type: 'input',
    message: 'If you followed tutorials, include links to those here.',
    name: 'creditTutorial5',
    when: (answers) => answers.creditTutorial4,
  },
  {
    type: 'input',
    message: 'If you followed tutorials, include links to those here.',
    name: 'creditTutorial6',
    when: (answers) => answers.creditTutorial5,
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
    type: 'list',
    message: 'Choose a license for your application:',
    name: 'license',
    choices: [
      'MIT License',
      'GNU GPLv3',
      'Apache License 2.0',
      'BSD 3-Clause License',
      'ISC License',
      'Mozilla Public License 2.0',
      'GNU AGPLv3',
      'GNU LGPLv3',
      'Eclipse Public License 2.0',
      'Creative Commons Zero v1.0 Universal',
      'None of the above'
    ],
    when: (answers) => answers.licenseConfirm,
  },
  {
    type: 'input',
    message: 'What license would you like to add?',
    name: 'licenseAlt',
    when: (answers)  => answers.license === 'None of the above',
  },
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
    message: "If you have badges, use the following format: ![ALT_TEXT](https://img.shields.io/YOUR_BADGE_DETAILS)",
    name: 'badge1',
    when: (answers) => answers.badgesConfirm,
  },
  {
    type: 'input',
    message: "If you have badges, use the following format: ![ALT_TEXT](https://img.shields.io/YOUR_BADGE_DETAILS)",
    name: 'badge2',
    when: (answers) => answers.badge1,
  },
  {
    type: 'input',
    message: "If you have badges, use the following format: ![ALT_TEXT](https://img.shields.io/YOUR_BADGE_DETAILS)",
    name: 'badge3',
    when: (answers) => answers.badge2,
  },
  {
    type: 'input',
    message: "If you have badges, use the following format: ![ALT_TEXT](https://img.shields.io/YOUR_BADGE_DETAILS)",
    name: 'badge4',
    when: (answers) => answers.badge3,
  },
  {
    type: 'input',
    message: "If you have badges, use the following format: ![ALT_TEXT](https://img.shields.io/YOUR_BADGE_DETAILS)",
    name: 'badge5',
    when: (answers) => answers.badge4,
  },
  {
    type: 'input',
    message: "If you have badges, use the following format: ![ALT_TEXT](https://img.shields.io/YOUR_BADGE_DETAILS)",
    name: 'badge6',
    when: (answers) => answers.badge5,
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
    message: 'List your 1st feature:',
    name: 'feature1',
    when: (answers) => answers.featuresConfirm,
  },
  {
    type: 'input',
    message: 'List your next feature or leave blank to go to the next section.',
    name: 'feature2',
    when: (answers) => answers.feature1,
  },
  {
    type: 'input',
    message: 'List your next feature or leave blank to go to the next section.',
    name: 'feature3',
    when: (answers) => answers.feature2,
  },
  {
    type: 'input',
    message: 'List your next feature or leave blank to go to the next section.',
    name: 'feature4',
    when: (answers) => answers.feature3,
  },
  {
    type: 'input',
    message: 'List your next feature or leave blank to go to the next section.',
    name: 'feature5',
    when: (answers) => answers.feature4,
  },
  {
    type: 'input',
    message: 'List your next feature or leave blank to go to the next section.',
    name: 'feature6',
    when: (answers) => answers.feature5,
  },
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
    message: "Include contribution guidance. See https://www.contributor-covenant.org/ for more.",
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
    message: 'Include any tests for your application.',
    name: 'test1',
    when: (answers) => answers.testsConfirm,
  },
  {
    type: 'input',
    message: 'Include any tests for your application.',
    name: 'test2',
    when: (answers) => answers.test1,
  },
  {
    type: 'input',
    message: 'Include any tests for your application.',
    name: 'test3',
    when: (answers) => answers.test2,
  }, 
  {
    type: 'input',
    message: 'Include any tests for your application.',
    name: 'test4',
    when: (answers) => answers.test3,
  }, 
  {
    type: 'input',
    message: 'Include any tests for your application.',
    name: 'test5',
    when: (answers) => answers.test4,
  }, 
  {
    type: 'input',
    message: 'Include any tests for your application.',
    name: 'test6',
    when: (answers) => answers.test5,
  },
];

const myContactQuestions = [
  {
    type: 'confirm',
    message: 'Do you want to add your contact information for the section: "Questions"?',
    name: 'myContactConfirm',
    default: false,
  },
  {
    type: 'input',
    message: 'Enter your name or leave blank to skip',
    name: 'myProfile',
    when: (answers) => answers.myContactConfirm,
  },
  {
    type: 'input',
    message: "What is this collaborator's GitHub username?",
    name: 'myProfileGitUsername',
    when: (answers) => answers.myContactConfirm,
  },
  {
    type: 'input',
    message: "What is this collaborator's email address?",
    name: 'myProfileEmail',
    when: (answers) => answers.myContactConfirm,
  },
];


// TODO: Create a function to generate README file content based on user answers
function generateReadmeContent(answers) {
  let content = '# ' + answers.projectTitle + '\n\n';

  // Map to potential badging options
  const licenseBadges = {
    'MIT License': '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
    'GNU GPLv3': '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',
    'Apache License 2.0': '[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
    'BSD 3-Clause License': '[![License: BSD 3-Clause](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)',
    'ISC License': '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)',
    'Mozilla Public License 2.0': '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)',
    'GNU AGPLv3': '[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)',
    'GNU LGPLv3': '[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)',
    'Eclipse Public License 2.0': '[![License: EPL 2.0](https://img.shields.io/badge/License-EPL%202.0-red.svg)](https://www.eclipse.org/legal/epl-2.0/)',
    'Creative Commons Zero v1.0 Universal': '[![License: CC0-1.0](https://img.shields.io/badge/License-CC0%201.0-blue.svg)](https://creativecommons.org/publicdomain/zero/1.0/)',
  };
  // Add additional badging and notes to the top of the README
  if (answers.badgesConfirm) {
    i=1
    while (answers[`badge${i}`] !== undefined && answers[`badge${i}`] !== '') {
      content += `${answers[`badge${i}`]}  `;
      i++;
    }
  }
  content += answers.license === 'None of the above' || answers.licenseConfirm == false ? '\n\n No license badge identified. See [License](#license) section for more details.\n\n' : licenseBadges[answers.license] + '\n\n';
  content += 'You can find a video of this README build [here](http://www.) \n\n'

  // Build the DESCRIPTION section
  if (answers.descriptionConfirm) {
    content += '## Description\n';
    content += answers.motivation ? '#### Motivation:\n' + answers.motivation +'\n\n' : '';
    content += answers.whyBuild ? '#### Why Build:\n' + answers.whyBuild + '\n\n' : '';
    content += answers.problemSolved ? '#### Problem Solved:\n' + answers.problemSolved + '\n\n' : '';
    content += answers.whatWasLearned ? '#### What Was Learned:\n' + answers.whatWasLearned + '\n\n' : '';
  }

  // Create the Table of Contents
  let tableOfContents = [];
  if (answers.installationConfirm) {
    tableOfContents.push('  * [Installation](#installation)');
  }
  if (answers.usageConfirm) {
    tableOfContents.push('  * [Usage](#usage)');
  }
  if (answers.creditsConfirm) {
    tableOfContents.push('  * [Credits](#credits)');
  }
  if (answers.licenseConfirm) {
    tableOfContents.push('  * [License](#license)');
  }
  if (answers.badgesConfirm) {
    tableOfContents.push('  * [Badges](#badges)');
  }
  if (answers.featuresConfirm) {
    tableOfContents.push('  * [Features](#features)');
  }
  if (answers.contributeConfirm) {
    tableOfContents.push('  * [How to Contribute](#how-to-contribute)');
  }
  if (answers.testsConfirm) {
    tableOfContents.push('  * [Tests](#tests)');
  }
  if (answers.myContact) {
    tableOfContents.push('   * [Questions](#questions');
  }
  content += '## Table of Contents\n' + tableOfContents.join('\n') + '\n\n';

  // Build the INSTALLATION section
  if (answers.installationConfirm) {
    content += '## Installation Instructions\n';

    let i = 1;
    while (answers[`installationStep${i}`] !== undefined) {
      content += answers[`installationStep${i}`] !== '' && answers[`installationStep${i}`] !== undefined
        ? `#### Step ${i}:\n${answers[`installationStep${i}`]}\n\n`
        : '';
      i++;
    }
  }

  // Build the USAGE section
  if (answers.usageConfirm) {
    content += '## Usage\n';

    let i = 1;
    while (answers[`usageEx${i}`] !== undefined && answers[`usageEx${i}`] !== '') {
      content += `#### Example ${i}:\n${answers[`usageEx${i}`]}\n\n`;
      if (answers[`usageEx${i}Image`] !== '' && answers[`usageEx${i}Image`] !== undefined) {
        content += answers[`usageEx${i}Image`] + '\n\n';
      }
      i++;
    }
  }


  // Build the CREDITS Section
  if (answers.creditsConfirm) {
    content += '## Credits\n';
    content += answers.creditProfile1 ? '#### Individual Credits:\n' : '';
    // Build Credit Profile Section
    for (let i = 1; i <= 6; i++) {
      if (answers['creditProfile' + i] && answers['creditProfile' + i] !== '') {
        content += '  * ' + answers['creditProfile' + i] + '    \n';
        if (answers['creditProfile' + i + 'GitUsername'] !== '' && answers['creditProfile' + i + 'GitUsername'] !== undefined) {
          content += '    GitHub Username: [' + answers['creditProfile' + i + 'GitUsername'] + '](https://github.com/' + answers['creditProfile' + i + 'GitUsername'] + '/)    \n';
        }
        if (answers['creditProfile' + i + 'Email'] !== undefined && answers['creditProfile' + i + 'Email'] !== '') {
          content += '    Email Address: ' + answers['creditProfile' + i + 'Email'] + '    \n';
        }
        content += '\n\n';
      }
    }

    // Build Credit 3rd Party Asset Section
    content += answers.credit3rdPartyAsset1 ? '#### Third-Party Assets:\n\n' : '';
    i = 1;
    while (answers[`credit3rdPartyAsset${i}`] !== undefined && answers[`credit3rdPartyAsset${i}`] !== '') {
      content += `  * ${answers[`credit3rdPartyAsset${i}`]}\n\n`;
      i++;
    }

    // Build Credit Tutorials Section
    content += answers.creditTutorial1 ? '#### Tutorials Followed:\n\n' : '';
    i = 1;
    while (answers[`creditTutorial${i}`] !== undefined && answers[`creditTutorial${i}`] !== '') {
      content += `  * ${answers[`creditTutorial${i}`]}\n\n`;
      i++;
    }
  }


  // Build the LICENSE section
  content += answers.licenseConfirm ? '## License\n' : '';
  content += answers.license !== 'None of the above' ? answers.license + '\n\n' : '';
  content += answers.license === 'None of the above' ? answers.licenseAlt + '\n\n' : '';


  //Build the BADGES section
  content += answers.badgesConfirm ? '## Badges\n' : '';
  if (answers.licenseConfirm && answers.license !== 'None of the above') {
    content += `  * ${licenseBadges[answers.license]}\n\n`;
  }

  i=1
  while (answers[`badge${i}`] !== undefined && answers[`badge${i}`] !== '') {
    content += `  * ${answers[`badge${i}`]}\n\n`;
    i++;
  }

  //Build the FEATURES section
  content += answers.featuresConfirm ? '## Features\n': '';
  i=1;
  while (answers[`feature${i}`] !== undefined && answers[`feature${i}`] !== '') {
    content += `  * ${answers[`feature${i}`]}\n\n`;
    i++;
  }

  //Build the HOW TO CONTRIBUTE section
  content += answers.contributeConfirm ? '## How to Contribute\n' + answers.contribute + '\n\n' : '';

  //Build the TESTS section
  content += answers.testsConfirm ? '## Tests\n' : '';
  i=1;
  while (answers[`test${i}`] !== undefined && answers[`test${i}`] !== '') {
    content += `  * ${answers[`test${i}`]}\n\n`;
    i++;
  }

  //Build the QUESTIONS section
  if (answers.myContactConfirm) {
    content += '## Questions \n'
    content += 'If you have any questions about the content, instructions, or how to get involved in this project, please contact: \n\n'
    content += answers['myProfile'] ? '  * ' + answers['myProfile'] + '    \n' : '';
    if (answers['myProfileGitUsername'] !== '' && answers['myProfileGitUsername'] !== undefined) {
      content += '    GitHub Username: [' + answers['myProfileGitUsername'] + '](https://github.com/' + answers['myProfileGitUsername'] + '/)    \n';
    }
    if (answers['myProfileEmail'] !== undefined && answers['myProfileEmail'] !== '') {
      content += '    Email Address: ' + answers['myProfileEmail'] + '    \n';
    }
    content += '\n';
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

                  // Prompt for Questions section questions
                  inquirer.prompt(myContactQuestions).then((myContactAnswers) => {
                    console.log('myContact Answers:');
                    console.log(myContactAnswers);

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
                      ...myContactAnswers,
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
});

// // Recursive function to ask a question repeatedly until a blank response -- UNUSED CONCEPT
// function askUntilBlank(question, fieldName, answers) {
//   return inquirer
//     .prompt([
//       {
//         type: 'input',
//         message: question,
//         name: fieldName,
//       },
//     ])
//     .then((response) => {
//       const fieldValue = response[fieldName].trim();
//       if (fieldValue !== '') {
//         // Append the response to the respective field in answers
//         answers[fieldName] += '\n' + fieldValue;
//         return askUntilBlank(question, fieldName, answers);
//       }
//       return answers;
//     });
// }

// Build the INSTALLATION section
  // if (answers.installationConfirm) {
  //   content += '## Installation Instructions' + '\n';
  //   content += '#### Step 1:\n' + answers.installationStep1 + '\n\n';
  //   content += answers.installationStep2 !== '' && answers.installationStep2 !== undefined ? '#### Step 2:\n' + answers.installationStep2 + '\n\n' : '';
  //   content += answers.installationStep3 !== '' && answers.installationStep3 !== undefined ? '#### Step 3:\n' + answers.installationStep3 + '\n\n' : '';
  //   content += answers.installationStep4 !== '' && answers.installationStep4 !== undefined ? '#### Step 4:\n' + answers.installationStep4 + '\n\n' : '';
  //   content += answers.installationStep5 !== '' && answers.installationStep5 !== undefined ? '#### Step 5:\n' + answers.installationStep5 + '\n\n' : '';
  //   content += answers.installationStep6 !== '' && answers.installationStep6 !== undefined ? '#### Step 6:\n' + answers.installationStep6 + '\n\n' : '';
  // }

// // Build the USAGE section
  // if (answers.usageConfirm) {
  //   content += '## Usage\n';
  //   content += '#### Example 1:\n' + answers.usageEx1 + '\n\n';
  //   content += answers.usageEx1Image !== '' && answers.usageEx1Image !== undefined ? answers.usageEx1Image + '\n\n' : '';
  //   content += answers.usageEx2 !== '' && answers.usageEx2 !== undefined ? '#### Example 2:\n' + answers.usageEx2 + '\n\n' : '';
  //   content += answers.usageEx2Image !== '' && answers.usageEx2Image !== undefined ? answers.usageEx2Image + '\n\n' : '';
  //   content += answers.usageEx3 !== '' && answers.usageEx3 !== undefined ? '#### Example 3:\n' + answers.usageEx3 + '\n\n' : '';
  //   content += answers.usageEx3Image !== '' && answers.usageEx3Image !== undefined ? answers.usageEx3Image + '\n\n' : '';
  //   content += answers.usageEx4 !== '' && answers.usageEx4 !== undefined ? '#### Example 4:\n' + answers.usageEx4 + '\n\n' : '';
  //   content += answers.usageEx4Image !== '' && answers.usageEx4Image !== undefined ? answers.usageEx4Image + '\n\n' : '';
  //   content += answers.usageEx5 !== '' && answers.usageEx5 !== undefined ? '#### Example 5:\n' + answers.usageEx5 + '\n\n' : '';
  //   content += answers.usageEx5Image !== '' && answers.usageEx5Image !== undefined ? answers.usageEx5Image + '\n\n' : '';
  //   content += answers.usageEx6 !== '' && answers.usageEx6 !== undefined ? '#### Example 6:\n' + answers.usageEx6 + '\n\n' : '';
  //   content += answers.usageEx6Image !== '' && answers.usageEx6Image !== undefined ? answers.usageEx6Image + '\n\n' : '';
  // }

  // // Build the CREDITS Section
  // if (answers.creditsConfirm) {
  //   content += '## Credits\n';
  //   // Build Credit Profile Section
  //   content += answers.creditProfile1 ? '#### Individual Credits:\n' : '';
  //   content += answers.creditProfile1 !== undefined && answers.creditProfile1 !== '' ? '  * ' + answers.creditProfile1 + '\n\n' : '';
  //   content += answers.creditProfile1GitUsername !== undefined && answers.creditProfile1GitUsername !== '' ? '    GitHub Username: [' + answers.creditProfile1GitUsername + '](https://github.com/' + answers.creditProfile1GitUsername + '/)\n\n' : '';
  //   content += answers.creditProfile1Email !== undefined && answers.creditProfile1Email !== '' ? '    Email Address: ' + answers.creditProfile1Email + '\n': '';
  //   content += '\n\n';

  //   content += answers.creditProfile2 !== undefined && answers.creditProfile2 !== '' ? '  * ' + answers.creditProfile2 + '\n\n' : '';
  //   content += answers.creditProfile2GitUsername !== undefined && answers.creditProfile2GitUsername !== '' ? '    GitHub Username: [' + answers.creditProfile2GitUsername + '](https://github.com/' + answers.creditProfile1GitUsername + '/)\n\n' : '';
  //   content += answers.creditProfile2Email !== undefined && answers.creditProfile2Email !== '' ? '    Email Address: ' + answers.creditProfile2Email + '\n': '';
  //   content += '\n\n';

  //   content += answers.creditProfile3 !== undefined && answers.creditProfile3 !== '' ? '  * ' + answers.creditProfile3 + '\n\n' : '';
  //   content += answers.creditProfile3GitUsername !== undefined && answers.creditProfile3GitUsername !== '' ? '    GitHub Username: [' + answers.creditProfile3GitUsername + '](https://github.com/' + answers.creditProfile3GitUsername + '/)\n\n' : '';
  //   content += answers.creditProfile3Email !== undefined && answers.creditProfile3Email !== '' ? '    Email Address: ' + answers.creditProfile3Email + '\n': '';
  //   content += '\n\n';

  //   content += answers.creditProfile4 !== undefined && answers.creditProfile4 !== '' ? '  * ' + answers.creditProfile4 + '\n\n' : '';
  //   content += answers.creditProfile4GitUsername !== undefined && answers.creditProfile4GitUsername !== '' ? '    GitHub Username: [' + answers.creditProfile4GitUsername + '](https://github.com/' + answers.creditProfile4GitUsername + '/)\n\n' : '';
  //   content += answers.creditProfile4Email !== undefined && answers.creditProfile4Email !== ''  ? '    Email Address: ' + answers.creditProfile4Email + '\n': '';
  //   content += '\n\n';

  //   content += answers.creditProfile5 !== undefined && answers.creditProfile5 !== '' ? '  * ' + answers.creditProfile5 + '\n\n' : '';
  //   content += answers.creditProfile5GitUsername !== undefined && answers.creditProfile5GitUsername !== '' ? '    GitHub Username: [' + answers.creditProfile5GitUsername + '](https://github.com/' + answers.creditProfile5GitUsername + '/)\n\n' : '';
  //   content += answers.creditProfile5Email !== undefined && answers.creditProfile5Email !== '' ? '    Email Address: ' + answers.creditProfile5Email + '\n': '';
  //   content += '\n\n';

  //   content += answers.creditProfile6 !== undefined && answers.creditProfile6 !== '' ? '  * ' + answers.creditProfile6 + '\n\n' : '';
  //   content += answers.creditProfile6GitUsername !== undefined && answers.creditProfile6GitUsername !== '' ? '    GitHub Username: [' + answers.creditProfile6GitUsername + '](https://github.com/' + answers.creditProfile6GitUsername + '/)\n\n' : '';
  //   content += answers.creditProfile6Email !== undefined && answers.creditProfile6Email !== ''  ? '    Email Address: ' + answers.creditProfile6Email + '\n': '';  
  //   content += '\n\n';

  //   content += answers.credit3rdPartyAsset1 ? '#### Third-Party Assets:\n' + '  * ' + answers.credit3rdPartyAsset1 + '\n\n' : '';
  //   content += answers.credit3rdPartyAsset2 ? '  * ' + answers.credit3rdPartyAsset2 + '\n\n' : '';
  //   content += answers.credit3rdPartyAsset3 ? '  * ' + answers.credit3rdPartyAsset3 + '\n\n' : '';
  //   content += answers.credit3rdPartyAsset4 ? '  * ' + answers.credit3rdPartyAsset4 + '\n\n' : '';
  //   content += answers.credit3rdPartyAsset5 ? '  * ' + answers.credit3rdPartyAsset5 + '\n\n' : '';
  //   content += answers.credit3rdPartyAsset6 ? '  * ' + answers.credit3rdPartyAsset6 + '\n\n' : '';
  //   content += answers.creditTutorial1 ? '#### Tutorials Followed:\n' + '  * ' + answers.creditTutorial1 + '\n\n' : '';
  //   content += answers.creditTutorial2 ? '  * ' + answers.creditTutorial2 + '\n\n' : '';
  //   content += answers.creditTutorial3 ? '  * ' + answers.creditTutorial3 + '\n\n' : '';
  //   content += answers.creditTutorial4 ? '  * ' + answers.creditTutorial4 + '\n\n' : '';
  //   content += answers.creditTutorial5 ? '  * ' + answers.creditTutorial5 + '\n\n' : '';
  //   content += answers.creditTutorial6 ? '  * ' + answers.creditTutorial6 + '\n\n' : '';
  // }

  // if (answers.creditsConfirm) {
  //   content += '## Credits\n';
  //   content += answers.creditProfile1 ? '#### Individual Credits:\n\n' : '';
  //   let i = 1;
  //   while (answers[`creditProfile${i}`] !== undefined && answers[`creditProfile${i}`] !== '') {
  //     content += `  * ${answers[`creditProfile${i}`]}\n\n`;
  //     i++;
  //   }