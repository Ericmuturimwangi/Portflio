import React, { useState, useEffect, useRef } from "react";

interface CommandHistoryItem {
  type: "input" | "output" | "error";
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
  const [currentSection, setCurrentSection] = useState<string>("home");
  const [commandHistory, setCommandHistory] = useState<CommandHistoryItem[]>([
    {
      type: "output",
      text: `Hi! I'm Eric Mwangi, a Software Developer & Creative Problem Solver. Welcome to my portfolio! Type "help" for available commands.`,
    },
  ]);
  const [currentCommand, setCurrentCommand] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const sections: Sections = {
    home: {
      title: "Home",
      content: `
╔════════════════════════════════════════╗
║ WELCOME TO Eric's PORTFOLIO ║
╚════════════════════════════════════════╝
Hi! I'm Eric Mwangi,
Software Developer & Creative Problem Solver
Type 'ls' to see available sections
Type 'cd <section>' to navigate
Type 'help' for all commands
      `,
    },
    about: {
      title: "About Me",
      content: `
╔════════════════════════════════════════╗
║              ABOUT ME                  ║
╚════════════════════════════════════════╝
I'm a passionate developer with a love for creating elegant solutions to complex problems.
- Focus: Software Development and Application Security
- Location: Kenya
- Email: <a href="mailto:ericmwangi837@gmail.com" class="underline text-blue-400">ericmwangi837@gmail.com</a>
- GitHub: <a href="https://github.com/Ericmuturimwangi" target="_blank" class="underline text-blue-400">github.com/Ericmuturimwangi</a>
<b>Active Projects:</b><br />
• <a href="https://kasms.vercel.app" target="_blank" class="underline text-blue-400">SmartCampus Platform</a><br />
• <a href="https://github.com/Ericmuturimwangi/Unit-Management-System" target="_blank" class="underline text-blue-400">Employee and Operations Management Platform</a><br />
• <a href="https://truckops.ericmwangi.dev" target="_blank" class="underline text-blue-400">Interstate Truck Drivers Platform</a><br />
I am open to new opportunities.
      `
    },
    skills: {
      title: 'Skills',
      content: `
╔════════════════════════════════════════╗
║                 SKILLS                 ║
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
║               EDUCATION                ║
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
  ✓ <a href="https://www.credly.com/badges/f9d18d5f-0613-47eb-aa77-843100ea5628/linked_in_profile" target="_blank" class="underline text-blue-400">Africahackon Cybersecurity</a>
  ✓ Huawei Global Training Center – Computer Systems Networking and Telecommunications (2025
      `
    },
    experience: {
      title: 'Experience',
      content: `
╔════════════════════════════════════════╗
║               EXPERIENCE               ║
╚════════════════════════════════════════╝
Software Developer
theDifference Developers | 2024 - Present
• Academic Core Services: Designed and implemented a scalable, multi-tenant school management platform
automating operations across 13 independent schools under one organization.
• Cross-Platform API Layer: Engineered RESTful APIs for a unified digital ecosystem supporting a web
dashboard, mobile access, and upcoming parent, supervisor portals—enabling seamless integration and future
scalability.
• Notifications and Messaging: Built centralized communication features enabling automated announcements,
performance alerts, discipline notices, and fee reminders through email and SMS
Software Developer
Freelance | 2022 - 2024
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
║              PROJECTS                  ║
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
    },
    resume: {
      title: "Resume",
      content: `
╔════════════════════════════════════════╗
║               RESUME                   ║
╚════════════════════════════════════════╝
Download my resume to learn more about my qualifications and experience.
Commands:
  → Type 'download resume' to download my CV
  → Type 'view resume' to open in new tab
File: Eric_Mwangi_Resume.pdf
      `,
    },
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Eric_Mwangi_Resume.pdf";
    link.download = "Eric_Mwangi_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const viewResume = () => {
    window.open("/Eric_Mwangi_Resume.pdf", "_blank");
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory: CommandHistoryItem[] = [
      ...commandHistory,
      { type: "input", text: `eric@portfolio:~/${currentSection}$ ${cmd}` },
    ];

    if (trimmedCmd === "") {
      setCommandHistory(newHistory);
      return;
    }

    if (trimmedCmd === "help") {
      newHistory.push({
        type: "output",
        text: `
Available commands:
  ls - List all sections
  cd <section> - Navigate to a section
  clear - Clear terminal
  help - Show this help message
  whoami - Display current section
  download resume - Download my resume (PDF)
  view resume - View resume in new tab
        `,
      });
    } else if (trimmedCmd === "ls") {
      newHistory.push({
        type: "output",
        text: `Available sections:\n ${Object.keys(sections).join("\n ")}`,
      });
    } else if (trimmedCmd === "clear") {
      setCommandHistory([]);
      setCurrentCommand("");
      return;
    } else if (trimmedCmd === "whoami") {
      newHistory.push({
        type: "output",
        text: `Current section: ${currentSection}`,
      });
    } else if (trimmedCmd === "download resume") {
      downloadResume();
      newHistory.push({
        type: "output",
        text: `Downloading resume: Eric_Mwangi_Resume.pdf`,
      });
    } else if (trimmedCmd === "view resume") {
      viewResume();
      newHistory.push({
        type: "output",
        text: `Opening resume in new tab...`,
      });
    } else if (trimmedCmd.startsWith("cd ")) {
      const target = trimmedCmd.substring(3).trim();
      if (sections[target]) {
        setCurrentSection(target);
        newHistory.push({
          type: "output",
          text: sections[target].content,
        });
      } else {
        newHistory.push({
          type: "error",
          text: `cd: ${target}: No such section. Type 'ls' to see available sections.`,
        });
      }
    } else {
      newHistory.push({
        type: "error",
        text: `Command not found: ${trimmedCmd}. Type 'help' for available commands.`,
      });
    }
    setCommandHistory(newHistory);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const partial = currentCommand.toLowerCase();
      if (partial.startsWith("cd ")) {
        const sectionPartial = partial.substring(3);
        const matches = Object.keys(sections).filter((s) =>
          s.startsWith(sectionPartial)
        );
        if (matches.length === 1) setCurrentCommand(`cd ${matches[0]}`);
      }
    } else if (e.key === "Enter") {
      executeCommand(currentCommand);
      setCurrentCommand("");
    }
  };

  return (
    <>
      {/* Added Navbar - Centered & pushes content down */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-5 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-green-400 tracking-wider">
            Eric Mwangi Portfolio
          </h1>
          <p className="text-gray-500 text-sm mt-1">Type help for commands</p>
        </div>
      </nav>

      {/* Main content starts lower because of fixed navbar */}
      <div className="min-h-screen bg-gray-900 text-green-400 font-mono pt-28 pb-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row gap-8 items-start">
          {/* Terminal */}
          <div className="w-full md:w-3/4 bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
            <div className="bg-gray-700 px-4 py-2 flex items-center gap-2 border-b border-gray-600">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="ml-4 text-gray-300 text-sm">
                eric_portfolio@terminal: ~/{currentSection}
              </span>
            </div>

            <div
              ref={terminalRef}
              className="p-6 h-[800px] overflow-y-auto bg-gray-900"
              onClick={() => inputRef.current?.focus()}
            >
              {commandHistory.map((item, index) => (
                <div key={index} className="mb-2">
                  {item.type === "input" && (
                    <div className="text-green-400">{item.text}</div>
                  )}
                  {item.type === "output" && (
                    <pre
                      className="text-gray-300 whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: item.text }}
                    />
                  )}
                  {item.type === "error" && (
                    <div className="text-red-400">{item.text}</div>
                  )}
                </div>
              ))}
              <div className="flex items-center">
                <span className="text-green-400 mr-2">
                  eric@portfolio:~/{currentSection}$
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

          {/* Profile Image */}
          <div className="w-full md:w-1/4 flex justify-center">
            <img
              src="/1756889777461.png"
              alt="Eric Mwangi"
              className="rounded-xl shadow-lg border border-gray-700 w-64 h-64 object-cover"
            />
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          Tip: Press Tab for autocomplete • Type 'download resume'
        </div>
      </div>
    </>
  );
}