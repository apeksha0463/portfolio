// ---------------------------------------------------------------------------
// Personal information for the portfolio.
//
// This is the ONE place to edit your details. Every section of the site and
// the "Ask About Apeksha" chatbot read from this file (and projects.js), so
// a change here shows up everywhere.
//
// Values that still say YOUR_..._HERE are treated as "not added yet" and are
// hidden from the page and the chatbot.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Apeksha',
  headline: 'BTech Digital Transformation | Data Science Minor',
  intro:
    'I am a Digital Transformation student with a minor in Data Science, interested in building practical solutions using software development, data, and emerging technologies.',

  about: [
    'I am pursuing a BTech in Digital Transformation with a Minor in Data Science.',
    'I am interested in data science and machine learning, and in software and web development — especially AI-powered applications and full-stack projects that solve real problems.',
    'I build projects to gain practical technical experience, from chatbots and booking platforms to machine learning experiments.',
  ],

  interests: [
    'Data Science',
    'Machine Learning',
    'Artificial Intelligence',
    'Software Development',
    'Web Development',
    'Full-Stack Development',
    'Building practical technology solutions',
  ],

  education: {
    degree: 'BTech',
    major: 'Digital Transformation',
    minor: 'Data Science',
    // Optional — leave empty ('') to keep them hidden.
    college: '',
    graduationYear: '',
  },

  // Keep this list truthful: only add what you have actually used.
  skills: [
    {
      category: 'Programming',
      items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'HTML', 'CSS', 'SQL'],
    },
    {
      category: 'Data Science & Machine Learning',
      items: [
        'Pandas',
        'NumPy',
        'Scikit-learn',
        'TensorFlow / Keras',
        'Machine Learning',
        'Data Preprocessing',
        'Model Training',
        'Model Evaluation',
        'Anomaly Detection',
        'NLP',
        'TF-IDF',
        'Sentiment Analysis',
        'Matplotlib / Seaborn',
      ],
    },
    {
      category: 'Development',
      items: [
        'React',
        'Node.js',
        'Express.js',
        'MongoDB',
        'Mongoose',
        'REST APIs',
        'Flask',
        'Spring Boot',
        'JWT Authentication',
        'Docker',
      ],
    },
    {
      category: 'Tools',
      items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Jupyter Notebook'],
    },
  ],

  experience: [
    {
      title: 'Machine Learning Training / Internship',
      // Add organisation and dates here when you want them shown, e.g.
      // organization: 'Company name', period: 'Jun 2025 – Aug 2025'
      organization: '',
      period: '',
      summary:
        'Hands-on training in applying machine learning with Python, from preparing data to building and evaluating models.',
      areas: [
        'Machine Learning with Python',
        'Data preprocessing',
        'Model training',
        'Model evaluation',
        'Practical implementation of ML concepts',
      ],
      relatedProject: 'fraud-detection',
    },
  ],

  contact: {
    github: 'https://github.com/apeksha0463',
    email: 'YOUR_EMAIL_HERE',
    linkedin: 'YOUR_LINKEDIN_URL_HERE',
  },

  // To show a "Resume" button: put your PDF at public/resume.pdf and set
  // this to '/resume.pdf'. Leave it empty to hide the button.
  resumeUrl: '',
}

// True when a value has been filled in (not empty and not a placeholder).
export function isSet(value) {
  return Boolean(value) && !/^YOUR_.*_HERE$/.test(value)
}
