import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useCallback, useState } from 'react';
import Button from './library/Button';

const Tiptap = () => {
  const [generatedCode, setGeneratedCode] = useState('');
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      console.log(json);
    },
  });

  const generateCode = useCallback(async () => {
    if (!editor) {
      return;
    }
    const content = editor.getHTML();
    const response = await fetch('/api/editor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
    const data = await response.json();
    setGeneratedCode(data.code || data.message);
  }, [editor]);

  return (
    <div>
      <EditorContent editor={editor} />
      <Button onClick={generateCode}>Generate Code</Button>
      {generatedCode && (
        <pre
          style={{
            background: '#f5f5f5',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginTop: '1rem',
          }}
        >
          {generatedCode}
        </pre>
      )}
    </div>
  );
};

export default Tiptap;
