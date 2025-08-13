import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

interface SyntaxHighlighterProps {
  code: string;
  language: string;
  title?: string;
}

export const SyntaxHighlighter = ({ code, language, title }: SyntaxHighlighterProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Simple syntax highlighting (could be enhanced with a proper library)
  const highlightSyntax = (code: string, lang: string) => {
    let highlighted = code;
    
    // Keywords for different languages
    const keywords: Record<string, string[]> = {
      javascript: ['const', 'let', 'var', 'function', 'if', 'else', 'for', 'while', 'return', 'import', 'export', 'class', 'extends', 'async', 'await', 'try', 'catch'],
      python: ['def', 'class', 'if', 'else', 'elif', 'for', 'while', 'return', 'import', 'from', 'as', 'try', 'except', 'finally', 'with'],
      react: ['import', 'export', 'const', 'let', 'function', 'return', 'useState', 'useEffect', 'useContext'],
      typescript: ['interface', 'type', 'extends', 'implements', 'public', 'private', 'protected', 'readonly'],
      css: ['display', 'flex', 'grid', 'position', 'color', 'background', 'margin', 'padding', 'border', 'width', 'height']
    };

    const langKeywords = keywords[lang] || keywords.javascript;

    // Highlight keywords
    langKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      highlighted = highlighted.replace(regex, `<span class="text-blue-400 font-semibold">${keyword}</span>`);
    });

    // Highlight strings
    highlighted = highlighted.replace(/"([^"]*)"/g, '<span class="text-green-400">"$1"</span>');
    highlighted = highlighted.replace(/'([^']*)'/g, '<span class="text-green-400">\'$1\'</span>');
    highlighted = highlighted.replace(/`([^`]*)`/g, '<span class="text-green-400">`$1`</span>');

    // Highlight comments
    highlighted = highlighted.replace(/\/\/.*$/gm, '<span class="text-gray-500 italic">$&</span>');
    highlighted = highlighted.replace(/#.*$/gm, '<span class="text-gray-500 italic">$&</span>');
    highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, '<span class="text-gray-500 italic">$&</span>');

    // Highlight numbers
    highlighted = highlighted.replace(/\b\d+\.?\d*\b/g, '<span class="text-orange-400">$&</span>');

    return highlighted;
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
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
        
        <pre className="p-4 overflow-x-auto text-sm">
          <code 
            className="text-gray-300 font-mono leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: highlightSyntax(code, language) 
            }}
          />
        </pre>
      </div>
    </motion.div>
  );
};

export default SyntaxHighlighter;
