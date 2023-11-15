'use client';
import React from "react";

export const Axioms = () => {
  const [axioms, setAxioms] = React.useState({ 1: "" });

  const onAxiomChange = (number: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAxioms(prev => ({
      ...prev,
      [number]: e.target.value
    }));


  };

  const largestAxiomKey = React.useMemo(() => Object.keys(axioms).length, [axioms]);

  React.useEffect(() => {
    // @ts-expect-error
    if (axioms[String(largestAxiomKey)] !== "") {
      setAxioms(prev => ({
        ...prev,
        [largestAxiomKey + 1]: ""
      }));
    }
  }, [axioms, largestAxiomKey]);

  const [theorums, setTheorums] = React.useState({ 1: "" });

  const onTheorumChange = (number: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheorums(prev => ({
      ...prev,
      [number]: e.target.value
    }));


  };

  const largestTheorumKey = React.useMemo(() => Object.keys(theorums).length, [theorums]);

  React.useEffect(() => {
    // @ts-expect-error
    if (theorums[String(largestTheorumKey)] !== "") {
      setTheorums(prev => ({
        ...prev,
        [largestTheorumKey + 1]: ""
      }));
    }
  }, [theorums, largestTheorumKey]);


  const [question, setQuestion] = React.useState('Are my axioms logically coherent?');

  const promptRef = React.useRef<HTMLDivElement>(null);

  const copyToClipboard = () => {
    if (promptRef.current) {
      window.getSelection()?.selectAllChildren(promptRef.current);
      const selection = window.getSelection();
      navigator.clipboard.writeText(selection?.toString() || '');
    }
  };

  const deleteField = (number: string) => (e: Event) => {
    e.preventDefault();
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div>
        <h2>Axioms:</h2>
        <hr></hr>
      </div>
      <Form>
        {Object.keys(axioms).map(key => {
          return (
            <div key={key} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: "space-between" }}>
              {/* @ts-expect-error */}
              <AxiomInput number={key} value={axioms[key]} onChange={onAxiomChange(key)} style={{ flexGrow: 1 }} />
              {/* @ts-expect-error */}
              {axioms[key] === '' && key !== '1' && key !== String(largestAxiomKey) && <button onClick={deleteField(key)} style={{ border: 'none', padding: 'none', position: 'relative', top: 4 }}>
                <span className="material-symbols-outlined">delete_forever</span>
              </button>}
            </div>
          );
        })}
      </Form>
      <div>
        <h2>Theorums:</h2>
        <hr></hr>
      </div>
      <Form>
        {Object.keys(theorums).map(key => {
          return (
            <div key={key} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: "space-between" }}>
              {/* @ts-expect-error */}
              <AxiomInput number={key} value={theorums[key]} onChange={onTheorumChange(key)} style={{ flexGrow: 1 }} />
              {/* @ts-expect-error */}
              {axioms[key] === '' && key !== '1' && key !== String(largestAxiomKey) && <button onClick={deleteField(key)} style={{ border: 'none', padding: 'none', position: 'relative', top: 4 }}>
                <span className="material-symbols-outlined">delete_forever</span>
              </button>}
            </div>
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
      <div style={{ textAlign: 'right' }}>
        <hr></hr>
        <button onClick={copyToClipboard}>copy to clipboard</button>
      </div>
      <div ref={promptRef}>
        <h3>Axioms:</h3>
        <ol style={{ listStyleType: 'none' }}>
          {/* @ts-expect-error */}
          {Object.keys(axioms).map(key => axioms[key] !== '' && <li key={key}>{key}{')'} {axioms[key]}</li>)}
        </ol>
        <h3>Theorums:</h3>
        <ol style={{ listStyleType: 'none' }}>
          {/* @ts-expect-error */}
          {Object.keys(theorums).map(key => theorums[key] !== '' && <li key={key}>{key}{')'} {theorums[key]}</li>)}
        </ol>
        <p>According to the above axioms and theorums...</p>
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
    <FormControl style={{ flexGrow: 1 }}>
      <label htmlFor={`axiom-${number}`}>Axiom {number}</label>
      <input id={`axiom-${number}`} value={value} onChange={onChange} placeholder={number === '1' ? "Enter your first axiom here" : ''} autoComplete="off" />
    </FormControl>
  );
};

const Form = (props: React.HTMLProps<HTMLFormElement>) => <form {...props} style={{ display: 'flex', flexDirection: 'column', gap: '16px', ...props.style }} />;


const FormControl = (props: React.HTMLProps<HTMLDivElement>) => <div {...props} style={{ display: 'flex', flexDirection: 'column', gap: '4px', ...props.style }} />;