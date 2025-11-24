import React, { useState, useEffect, useRef } from 'react';

interface CommandHistoryItem {
  type: 'input' | 'output' | 'error';
  text: string;
}

interface Section {
  title: string;
  content: string;
}

interface Sections {
  [key: string]: Section;
}

export default function TerminalPortfolio() {
  const [currentSection, setCurrentSection] = useState<string>('home');
  const [commandHistory, setCommandHistory] = useState<CommandHistoryItem[]>([
    { type: 'output', text: 'Welcome to my portfolio! Type "help" for available commands.' }
  ]);
  const [currentCommand, setCurrentCommand] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const sections: Sections = {
    home: {
      title: 'Home',
      content: `
╔════════════════════════════════════════╗
║     WELCOME TO Eric's PORTFOLIO        ║
╚════════════════════════════════════════╝

Hi! I'm Eric Mwangi,
a
Software Developer & Creative Problem Solver

Type 'ls' to see available sections
Type 'cd <section>' to navigate
Type 'help' for all commands
      `
    },
    about: {
      title: 'About Me',
      content: `
╔════════════════════════════════════════╗
║            ABOUT ME                    ║
╚════════════════════════════════════════╝

I'm a passionate developer with a love for creating
elegant solutions to complex problems.

- Focus: Software Development and Application Security
- Location: Kenya
- Email: ericmwangi837@gmail.com
- I am Open to opportunities
      `
    },
    skills: {
      title: 'Skills',
      content: `
╔════════════════════════════════════════╗
║            SKILLS                      ║
╚════════════════════════════════════════╝

Frontend:
  → Vue.js, TypeScript, Tailwind CSS
  → HTML5, CSS3, JavaScript (ES6+)

Backend:
  → Python, Django
  → RESTful APIs, GraphQL

Database:
  → MongoDB, PostgreSQL, MySQL

DevOps & Tools:
  → Git, Docker, CI/CD, Cloud Hosting

Application Security:
  → Input validation & sanitization
  → Protection against common vulnerabilities (XSS, CSRF, SQLi)
  → Secure API development
  → Encryption & key management
  → Vulnerability scanning & testing

Soft & Professional Skills:
  → Problem-solving & debugging complex issues
  → Rapid prototyping and MVP development
  → Full stack development from frontend to backend
  → Project management for small-scale apps
  → Continuous learning and tech exploration
      `
    },
    education: {
      title: 'Education',
      content: `
╔════════════════════════════════════════╗
║           EDUCATION                    ║
╚════════════════════════════════════════╝

Bachelor of Science in Computer Science
Chuka University | 2017 - 2021


Relevant Coursework:
  • Data Structures & Algorithms
  • Web Development
  • Database Management
  • Software Engineering
  • Application Security

Certifications:
  ✓ Africahackon Cybersecurity
  ✓ Huawei Global Training Center – Computer Systems Networking and Telecommunications (2025
      `
    },
    experience: {
      title: 'Experience',
      content: `
╔════════════════════════════════════════╗
║          EXPERIENCE                    ║
╚════════════════════════════════════════╝

Software Developer
theDifference Developers  | 2024 - Present
• Academic Core Services: Designed and implemented a scalable, multi-tenant school management platform
automating operations across 13 independent schools under one organization.
• Cross-Platform API Layer: Engineered RESTful APIs for a unified digital ecosystem supporting a web
dashboard, mobile access, and upcoming parent, supervisor portals—enabling seamless integration and future
scalability.
• Notifications and Messaging: Built centralized communication features enabling automated announcements,
performance alerts, discipline notices, and fee reminders through email and SMS

Software Developer
Freelance  | 2022 - 2024
• Ecommerce Platform: Built the platform using Django, with clear separation of cart, payment, product and
store modules, providing maintainability and scalability for future enhancements.
• Interstate Truck Drivers Platform: Built an application that accepts trip details from drivers (origin,
destination, load, timing) and computes optimal route instructions using trip-planner logic, enhancing driver
efficiency.
• Employee and Operations Management Platform: System manages personnel, roles, teams, and reporting
structures while enabling task assignment, progress tracking, and activity monitoring

Intern Software Developer
MindTech Solutions | 2021 - 2022 
• AWS Cloud Deployment and Management: Deploying and managing scalable applications across AWS
environment, ensuring high availability and reliability.
• Serverless and Infrastructure Automation: AWS Lambda and AWS CloudFormation to implement serverless
functions and automate infrastructure provisioning.
• Managing Databases and Virtualization: Amazon RDS and OS virtualization to provide secure, optimized,
and maintainable computing environments.

      `
    },
    projects: {
      title: 'Projects',
      content: `
╔════════════════════════════════════════╗
║           PROJECTS                     ║
╚════════════════════════════════════════╝

1. SmartCampus Platform
   Tech: React, Django, PostgreSQL
   → Multi-tenant academic operations platform managing students, staff, classes, grading,
attendance, payments, and analytics.

2. Interstate Truck Drivers Platform
   Tech: Django
   → Route and operations management system with trip planning and driver activity
logging

3. Employee and Operations Management Platform
   Tech: Vue.js, Django, PostgreSQL
   → Personnel and operations management with role-based access
control, task tracking, and reporting dashboards

4. Job Portfolio
   Tech: Django, Bootstrap
   → Real-time Job listing & application platform with advanced search and filtering

Type 'cd home' to return to main menu
      `
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const executeCommand = (cmd: string): void => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory: CommandHistoryItem[] = [...commandHistory, { type: 'input', text: `visitor@portfolio:~/${currentSection}$ ${cmd}` }];

    if (trimmedCmd === '') {
      setCommandHistory(newHistory);
      return;
    }

    if (trimmedCmd === 'help') {
      newHistory.push({
        type: 'output',
        text: `
Available commands:
  ls                 - List all sections
  cd <section>       - Navigate to a section
  clear              - Clear terminal
  help               - Show this help message
  whoami             - Display current section

Available sections: home, about, skills, education, experience, projects
        `
      });
    } else if (trimmedCmd === 'ls') {
      newHistory.push({
        type: 'output',
        text: `Available sections:\n  ${Object.keys(sections).join('\n  ')}`
      });
    } else if (trimmedCmd === 'clear') {
      setCommandHistory([]);
      setCurrentCommand('');
      return;
    } else if (trimmedCmd === 'whoami') {
      newHistory.push({
        type: 'output',
        text: `Current section: ${currentSection}`
      });
    } else if (trimmedCmd.startsWith('cd ')) {
      const target = trimmedCmd.substring(3).trim();
      if (sections[target]) {
        setCurrentSection(target);
        newHistory.push({
          type: 'output',
          text: sections[target].content
        });
      } else {
        newHistory.push({
          type: 'error',
          text: `cd: ${target}: No such section. Type 'ls' to see available sections.`
        });
      }
    } else {
      newHistory.push({
        type: 'error',
        text: `Command not found: ${trimmedCmd}. Type 'help' for available commands.`
      });
    }

    setCommandHistory(newHistory);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const partial = currentCommand.toLowerCase();
      if (partial.startsWith('cd ')) {
        const sectionPartial = partial.substring(3);
        const matches = Object.keys(sections).filter(s => s.startsWith(sectionPartial));
        if (matches.length === 1) {
          setCurrentCommand(`cd ${matches[0]}`);
        }
      }
    } else if (e.key === 'Enter') {
      executeCommand(currentCommand);
      setCurrentCommand('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono p-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
          {/* Terminal Header */}
          <div className="bg-gray-700 px-4 py-2 flex items-center gap-2 border-b border-gray-600">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center gap-2 ml-4 text-gray-300 text-sm">
              <span>⚡ eric_portfolio@terminal: ~/{currentSection}</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalRef}
            className="p-4 h-[600px] overflow-y-auto bg-gray-900"
            onClick={() => inputRef.current?.focus()}
          >
            {commandHistory.map((item, index) => (
              <div key={index} className="mb-2">
                {item.type === 'input' && (
                  <div className="text-green-400">{item.text}</div>
                )}
                {item.type === 'output' && (
                  <pre className="text-gray-300 whitespace-pre-wrap">{item.text}</pre>
                )}
                {item.type === 'error' && (
                  <div className="text-red-400">{item.text}</div>
                )}
              </div>
            ))}

            {/* Command Input */}
            <div className="flex items-center">
              <span className="text-green-400 mr-2">
                visitor@portfolio:~/{currentSection}$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-green-400 caret-green-400"
                autoFocus
                spellCheck="false"
              />
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-4 text-center text-gray-500 text-sm">
          💡 Tip: Press Tab for autocomplete • Click anywhere in the terminal to focus
        </div>
      </div>
    </div>
  );
}