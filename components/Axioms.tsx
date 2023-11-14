'use client';
import React from "react";

export const Axioms = () => {
  const [axioms, setAxioms] = React.useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: ""
  });

  const onChange = (number: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAxioms(prev => ({
      ...prev,
      [number]: e.target.value
    }));
  };

  const [question, setQuestion] = React.useState('Are my axioms logically coherent?');

  const promptRef = React.useRef<HTMLDivElement>(null);

  const copyToClipboard = () => {
    const prompt = promptRef.current;

    if (promptRef.current) {
      window.getSelection()?.selectAllChildren(promptRef.current);
      const selection = window.getSelection();
      console.log();
      navigator.clipboard.writeText(selection?.toString() || '');
    }
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <Form>
        {Object.keys(axioms).map(key => {
          return (
            /* @ts-expect-error */
            <AxiomInput key={key} number={key} value={axioms[key]} onChange={onChange(key)} />
          );
        })}
      </Form>
      <div>
        <h2>Generate AI Prompt:</h2>
        <hr></hr>
      </div>
      <Form>
        <FormControl>
          <label htmlFor="question">Question</label>
          <textarea id="question" rows={4} onChange={e => setQuestion(e.target.value)} value={question} />
        </FormControl>
      </Form>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>AI Prompt:</h3>
          <button onClick={copyToClipboard}>copy to clipboard</button>
        </div>
        <hr></hr>
      </div>
      <div ref={promptRef}>
        <ol>
          {/* @ts-expect-error */}
          {Object.keys(axioms).map(key => <li key={key}>{axioms[key]}</li>)}
        </ol>
        <p>According to the above axioms...</p>
        <p>{question}</p>
      </div>
    </div>
  );
};

interface AxiomInputProps {
  number: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
const AxiomInput = ({ number, value, onChange }: AxiomInputProps) => {
  return (
    <FormControl>
      <label htmlFor={`axiom-${number}`}>Axiom {number}</label>
      <input id={`axiom-${number}`} value={value} onChange={onChange} placeholder={number === '1' ? "Enter your first axiom here" : ''} />
    </FormControl>
  );
};

const Form = (props: React.HTMLProps<HTMLFormElement>) => <form {...props} style={{ display: 'flex', flexDirection: 'column', gap: '16px', ...props.style }} />;


const FormControl = (props: React.HTMLProps<HTMLDivElement>) => <div {...props} style={{ display: 'flex', flexDirection: 'column', gap: '4px', ...props.style }} />;