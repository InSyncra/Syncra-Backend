const CodeSnippet = ({ codeString }: { codeString: string }) => {
  return (
    <div className="max-w-full p-6 bg-gray-900 text-white rounded-md shadow-md">
      {codeString}
    </div>
  );
};

export default CodeSnippet;
