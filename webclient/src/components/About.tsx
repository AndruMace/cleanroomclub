
export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-emerald-500">
      <div className="max-w-xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-semibold text-emerald-800 mb-4">About the Developer</h2>
        <p className="text-gray-600 text-md mb-4">
          Hello! I'm <strong>Andru</strong>, a passionate full-stack developer. Most of my professional experience is with <strong>React</strong>, <strong>TypeScript</strong>, <strong>PostgreSQL</strong>, and <strong>Python</strong>, but I'm always happy to learn something new! I'm currently job hunting, so if I sound like I'd be a good fit for your team feel free to contact me! 
          <br/><br/>
          I designed the Clean Room Club to enhance living spaces through technology, promoting mental wellness and community engagement.
        </p>
        <div className="flex flex-col items-center justify-center space-y-4">
          <a href="https://www.linkedin.com/in/andru-mace-5964812b2/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-900 transition duration-300">Connect with me on LinkedIn</a>
          <a href="mailto:amacedeveloper@gmail.com" className="text-emerald-700 hover:text-emerald-900 transition duration-300">Email: amacedeveloper@gmail.com</a>
          <a href="https://github.com/AndruMace/cleanroomclub" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-900 transition duration-300">View the Project on GitHub</a>
        </div>
      </div>
    </div>
  );
}