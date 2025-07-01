const instructions = [
  {
    title: "Header1",
    format: "# Header1",
  },
  {
    title: "Heading 2",
    format: "## Heading 2",
  },
  {
    title: "list",
    format: "- list1",
  },
  {
    title: "Bold",
    format: "**bold**",
  },
  {
    title: "Italic",
    format: "*italic*",
  },
  {
    title: "Link",
    format: "[Link text](https://example.com)",
  },
  {
    title: "Numbered list",
    format: "1. First",
  },
  {
    title: "Bold Italic",
    format: "***bold italic***",
  },
];

const MarkDownInstructions = () => {
  return (
    <div
      className={
        "flex flex-row gap-4 flex-wrap p-3 border border-gray-300 rounded-lg"
      }
    >
      {instructions.map(({ title, format }, index) => (
        <div key={index} className={"flex flex-row gap-1"}>
          <p className="text-xs font-semibold">{title}</p>
          <p className="text-xs">({format})</p>
        </div>
      ))}
    </div>
  );
};

export default MarkDownInstructions;
