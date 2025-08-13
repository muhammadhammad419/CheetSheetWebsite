import { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

interface SyntaxHighlighterProps {
  code: string;
  language: string;
  title?: string;
}

interface TokenProps {
  type: "keyword" | "string" | "comment" | "number" | "text";
  children: ReactNode;
}

const Token = ({ type, children }: TokenProps) => {
  const getClassName = () => {
    switch (type) {
      case "keyword":
        return "text-blue-400 font-semibold";
      case "string":
        return "text-green-400";
      case "comment":
        return "text-gray-500 italic";
      case "number":
        return "text-orange-400";
      default:
        return "text-gray-300";
    }
  };

  return <span className={getClassName()}>{children}</span>;
};

export const SyntaxHighlighter = ({
  code,
  language,
  title,
}: SyntaxHighlighterProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const highlightSyntax = (code: string, lang: string): ReactNode[] => {
    const lines = code.split("\n");

    // Keywords for different languages
    const keywords: Record<string, string[]> = {
      javascript: [
        "const",
        "let",
        "var",
        "function",
        "if",
        "else",
        "for",
        "while",
        "return",
        "import",
        "export",
        "class",
        "extends",
        "async",
        "await",
        "try",
        "catch",
        "new",
        "this",
        "true",
        "false",
        "null",
        "undefined",
      ],
      python: [
        "def",
        "class",
        "if",
        "else",
        "elif",
        "for",
        "while",
        "return",
        "import",
        "from",
        "as",
        "try",
        "except",
        "finally",
        "with",
        "True",
        "False",
        "None",
        "and",
        "or",
        "not",
        "in",
      ],
      react: [
        "import",
        "export",
        "const",
        "let",
        "function",
        "return",
        "useState",
        "useEffect",
        "useContext",
        "React",
        "JSX",
      ],
      typescript: [
        "interface",
        "type",
        "extends",
        "implements",
        "public",
        "private",
        "protected",
        "readonly",
        "enum",
        "namespace",
      ],
      css: [
        "display",
        "flex",
        "grid",
        "position",
        "color",
        "background",
        "margin",
        "padding",
        "border",
        "width",
        "height",
        "font-size",
        "text-align",
      ],
      c: [
        "int",
        "float",
        "double",
        "char",
        "void",
        "if",
        "else",
        "for",
        "while",
        "do",
        "switch",
        "case",
        "break",
        "continue",
        "return",
        "const",
        "static",
        "extern",
        "auto",
        "register",
        "sizeof",
        "typedef",
        "struct",
        "union",
        "enum",
        "include",
        "define",
        "printf",
        "scanf",
      ],
      cpp: [
        "int",
        "float",
        "double",
        "char",
        "void",
        "bool",
        "class",
        "public",
        "private",
        "protected",
        "virtual",
        "override",
        "namespace",
        "using",
        "template",
        "typename",
        "if",
        "else",
        "for",
        "while",
        "do",
        "switch",
        "case",
        "break",
        "continue",
        "return",
        "const",
        "static",
        "extern",
        "auto",
        "new",
        "delete",
        "this",
        "true",
        "false",
        "nullptr",
        "std",
        "cout",
        "cin",
        "endl",
      ],
      csharp: [
        "int",
        "float",
        "double",
        "char",
        "string",
        "bool",
        "void",
        "class",
        "public",
        "private",
        "protected",
        "internal",
        "static",
        "readonly",
        "const",
        "virtual",
        "override",
        "abstract",
        "sealed",
        "interface",
        "namespace",
        "using",
        "if",
        "else",
        "for",
        "while",
        "do",
        "foreach",
        "switch",
        "case",
        "break",
        "continue",
        "return",
        "new",
        "this",
        "base",
        "true",
        "false",
        "null",
        "var",
        "async",
        "await",
        "try",
        "catch",
        "finally",
        "throw",
      ],
      java: [
        "int",
        "float",
        "double",
        "char",
        "boolean",
        "void",
        "String",
        "class",
        "public",
        "private",
        "protected",
        "static",
        "final",
        "abstract",
        "interface",
        "extends",
        "implements",
        "package",
        "import",
        "if",
        "else",
        "for",
        "while",
        "do",
        "switch",
        "case",
        "break",
        "continue",
        "return",
        "new",
        "this",
        "super",
        "true",
        "false",
        "null",
        "try",
        "catch",
        "finally",
        "throw",
        "throws",
      ],
      nextjs: [
        "import",
        "export",
        "default",
        "const",
        "let",
        "var",
        "function",
        "return",
        "if",
        "else",
        "for",
        "while",
        "async",
        "await",
        "try",
        "catch",
        "useState",
        "useEffect",
        "useContext",
        "NextRequest",
        "NextResponse",
        "React",
        "Component",
        "props",
        "state",
      ],
      html: [
        "html",
        "head",
        "body",
        "title",
        "meta",
        "link",
        "script",
        "style",
        "div",
        "span",
        "p",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "a",
        "img",
        "ul",
        "ol",
        "li",
        "table",
        "tr",
        "td",
        "th",
        "form",
        "input",
        "button",
        "textarea",
        "select",
        "option",
        "label",
        "header",
        "footer",
        "nav",
        "main",
        "section",
        "article",
        "aside",
        "figure",
        "figcaption",
      ],
    };

    const langKeywords = keywords[lang] || keywords.javascript;

    return lines.map((line, lineIndex) => {
      const tokens: ReactNode[] = [];
      let currentIndex = 0;

      // Process the line character by character
      while (currentIndex < line.length) {
        let matched = false;

        // Check for comments first (highest priority)
        if (
          line.slice(currentIndex, currentIndex + 2) === "//" ||
          (line.slice(currentIndex, currentIndex + 1) === "#" &&
            lang === "python")
        ) {
          tokens.push(
            <Token key={`comment-${lineIndex}-${currentIndex}`} type="comment">
              {line.slice(currentIndex)}
            </Token>,
          );
          break;
        }

        // Check for multi-line comment start (basic handling)
        if (line.slice(currentIndex, currentIndex + 2) === "/*") {
          const commentEnd = line.indexOf("*/", currentIndex + 2);
          const commentText =
            commentEnd !== -1
              ? line.slice(currentIndex, commentEnd + 2)
              : line.slice(currentIndex);
          tokens.push(
            <Token key={`comment-${lineIndex}-${currentIndex}`} type="comment">
              {commentText}
            </Token>,
          );
          currentIndex += commentText.length;
          matched = true;
        }

        // Check for strings
        if (
          !matched &&
          (line[currentIndex] === '"' ||
            line[currentIndex] === "'" ||
            line[currentIndex] === "`")
        ) {
          const quote = line[currentIndex];
          let stringEnd = currentIndex + 1;

          // Find the end of the string
          while (stringEnd < line.length && line[stringEnd] !== quote) {
            if (line[stringEnd] === "\\") stringEnd++; // Skip escaped characters
            stringEnd++;
          }

          if (stringEnd < line.length) stringEnd++; // Include closing quote

          const stringText = line.slice(currentIndex, stringEnd);
          tokens.push(
            <Token key={`string-${lineIndex}-${currentIndex}`} type="string">
              {stringText}
            </Token>,
          );
          currentIndex = stringEnd;
          matched = true;
        }

        // Check for numbers
        if (!matched && /\d/.test(line[currentIndex])) {
          let numberEnd = currentIndex;
          while (numberEnd < line.length && /[\d.]/.test(line[numberEnd])) {
            numberEnd++;
          }

          const numberText = line.slice(currentIndex, numberEnd);
          tokens.push(
            <Token key={`number-${lineIndex}-${currentIndex}`} type="number">
              {numberText}
            </Token>,
          );
          currentIndex = numberEnd;
          matched = true;
        }

        // Check for keywords
        if (!matched && /[a-zA-Z_]/.test(line[currentIndex])) {
          let wordEnd = currentIndex;
          while (wordEnd < line.length && /[a-zA-Z0-9_]/.test(line[wordEnd])) {
            wordEnd++;
          }

          const word = line.slice(currentIndex, wordEnd);
          const isKeyword = langKeywords.includes(word);

          tokens.push(
            <Token
              key={`word-${lineIndex}-${currentIndex}`}
              type={isKeyword ? "keyword" : "text"}
            >
              {word}
            </Token>,
          );
          currentIndex = wordEnd;
          matched = true;
        }

        // If nothing matched, add the current character as text
        if (!matched) {
          tokens.push(
            <Token key={`char-${lineIndex}-${currentIndex}`} type="text">
              {line[currentIndex]}
            </Token>,
          );
          currentIndex++;
        }
      }

      return (
        <div key={`line-${lineIndex}`}>
          {tokens}
          {lineIndex < lines.length - 1 && "\n"}
        </div>
      );
    });
  };

  return (
    <motion.div
      className="relative bg-gray-900 rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {title && (
        <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
          <span className="text-sm font-medium text-gray-300">{title}</span>
          <span className="text-xs text-gray-500 uppercase">{language}</span>
        </div>
      )}

      <div className="relative">
        <Button
          onClick={copyToClipboard}
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2 z-10 text-gray-400 hover:text-white"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>

        <pre className="p-4 overflow-x-auto text-sm">
          <code className="text-gray-300 font-mono leading-relaxed">
            {highlightSyntax(code, language)}
          </code>
        </pre>
      </div>
    </motion.div>
  );
};

export default SyntaxHighlighter;
