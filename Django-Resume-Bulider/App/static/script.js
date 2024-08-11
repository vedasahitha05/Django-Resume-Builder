const buildResume = (state) => {
  const styleText = `
    @import url('https://fonts.googleapis.com/css?family=Poppins:400,600&display=swap');

    body {
      font-family: 'Poppins', sans-serif;
      background: #fafafa;
      color: rgba(0,0,0,0.75);
    }

    h1 {
      color: rgba(0,0,0,0.9);
    }

    h1, p {
      box-sizing: border-box;
      margin: 0px;
      padding: 0px 24px;
    }

    .line-break {
      width: 100%;
      height: 1px;
      margin: 16px auto;
      border-bottom: 1px solid #eee;
    }

    .resume {
      border-radius: 8px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      max-width: 800px;
      margin: 48px auto;
      padding: 16px 0px;
      background: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02), 0 1px 2px rgba(0, 0, 0, 0.14);
    }

    .resume-group {
      box-sizing: border-box;
      padding: 8px 0px;
      width: 100%;
      display: flex;
      border-left: 3px solid transparent;
      transition: 0.2s;
    }

    .resume-group:hover {
      border-left: 3px solid #64FFDA;
    }

    .left-col {
      width: 35%;
    }

    .right-col {
      width: 65%;
    }

    .instructions {
      opacity: 0.5;
      text-align: center;
      font-size: 0.8rem;
      margin: 16px auto;
    }
  `;

  // Function to create a resume group element
  const createGroup = (left, right) => {
    const group = document.createElement('div');
    group.classList.add('resume-group');

    const leftCol = document.createElement('div');
    leftCol.classList.add('left-col');
    leftCol.innerHTML = `<p>${left}</p>`;
    group.appendChild(leftCol);

    const rightCol = document.createElement('div');
    rightCol.classList.add('right-col');
    rightCol.innerHTML = `<p>${right}</p>`;
    group.appendChild(rightCol);

    return group;
  };

  // Creating the resume structure
  const resumeContainer = document.createElement('div');
  resumeContainer.classList.add('resume');

  const styleTag = document.createElement('style');
  styleTag.innerHTML = styleText;
  document.head.appendChild(styleTag);

  const titleTag = document.createElement('title');
  titleTag.textContent = `${state.name}'s Resume`;
  document.head.appendChild(titleTag);

  const h1Tag = document.createElement('h1');
  h1Tag.textContent = state.name;
  resumeContainer.appendChild(h1Tag);

  const emailTag = document.createElement('p');
  emailTag.textContent = state.email;
  resumeContainer.appendChild(emailTag);

  const phoneTag = document.createElement('p');
  phoneTag.textContent = state.phone;
  resumeContainer.appendChild(phoneTag);

  const addressTag = document.createElement('p');
  addressTag.textContent = state.address;
  resumeContainer.appendChild(addressTag);

  const lineBreak = document.createElement('div');
  lineBreak.classList.add('line-break');
  resumeContainer.appendChild(lineBreak);

  // Adding resume sections
  resumeContainer.appendChild(createGroup('ABOUT ME', state.about));
  resumeContainer.appendChild(createGroup('CAREER OBJECTIVES', state.career));
  resumeContainer.appendChild(createGroup('EDUCATION', state.education));

  // Adding job experiences dynamically
  for (let i = 1; i <= 3; i++) {
    const job = state[`job${i}`];
    if (job.date.start && job.date.end && job.details) {
      resumeContainer.appendChild(createGroup(`${job.date.start} to ${job.date.end}`, job.details));
    }
  }

  // Adding references section
  resumeContainer.appendChild(createGroup('REFERENCES', state.references));

  document.body.innerHTML = '';
  document.body.appendChild(resumeContainer);

  const instructions = document.createElement('div');
  instructions.classList.add('instructions');
  instructions.textContent = 'Right click the page and "Save As..." to make a copy of this resume';
  document.body.appendChild(instructions);
};
