import SyntaxHighlighter from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeSnippet = ({ codeString }: { codeString: string }) => {
  return (
    <div className="max-w-full p-6 bg-gray-900 text-white rounded-md shadow-md">
      <SyntaxHighlighter
        language="javascript"
        style={vscDarkPlus}
        showLineNumbers
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSnippet;
