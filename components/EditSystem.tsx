'use client';
import React from "react";

export const EditSystem = () => {
  const [axiomsTheorums, setAxiomsTheorums] = React.useState({ axioms: { 1: "" }, theorums: { 1: "" } });

  const largestAxiomKey = React.useMemo(() => Object.keys(axiomsTheorums.axioms).length, [axiomsTheorums]);
  const largestTheorumKey = React.useMemo(() => Object.keys(axiomsTheorums.theorums).length, [axiomsTheorums]);

  React.useEffect(() => {
    if (axiomsTheorums.axioms[String(largestAxiomKey) as '1'] !== "") {
      setAxiomsTheorums(prev => ({
        ...prev,
        axioms: {
          ...prev.axioms,
          [largestAxiomKey + 1]: ""
        }
      }));
    }

    if (axiomsTheorums.theorums[String(largestTheorumKey) as '1'] !== "") {
      setAxiomsTheorums(prev => ({
        ...prev,
        theorums: {
          ...prev.theorums,
          [largestTheorumKey + 1]: ""
        }
      }));
    }

    if (axiomsTheorums.axioms[String(largestAxiomKey) as '1'] === "" && axiomsTheorums.axioms[String(largestAxiomKey - 1) as '1'] === "") {
      setAxiomsTheorums(prev => {
        const tmp = { ...prev };
        // @ts-expect-error
        delete tmp.axioms[String(largestAxiomKey)];

        return tmp;
      });
    };

    if (axiomsTheorums.theorums[String(largestTheorumKey) as '1'] === "" && axiomsTheorums.theorums[String(largestTheorumKey - 1) as '1'] === "") {
      setAxiomsTheorums(prev => {
        const tmp = { ...prev };
        // @ts-expect-error
        delete tmp.theorums[String(largestTheorumKey)];

        return tmp;
      });
    };

  }, [axiomsTheorums, largestAxiomKey, largestTheorumKey]);


  const handleAxiomTheorumChange = (number: string) => (type: AxiomTheorum) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAxiomsTheorums(prev => ({
      ...prev,
      [`${type}s`]: {
        ...prev[`${type}s`],
        [number]: e.target.value
      }
    }));
  };


  const [perspective, setPerspective] = React.useState('friend');
  const [perspectiveOther, setPerspectiveOther] = React.useState('');
  const [question, setQuestion] = React.useState('Is the axiomatic system logically coherent?');
  const [questionOther, setQuestionOther] = React.useState('');

  const promptRef = React.useRef<HTMLDivElement>(null);

  const copyToClipboard = () => {
    if (promptRef.current) {
      window.getSelection()?.selectAllChildren(promptRef.current);
      const selection = window.getSelection();
      navigator.clipboard.writeText(selection?.toString() || '');
    }
  };

  const deleteField = (number: string) => (type: AxiomTheorum): React.MouseEventHandler<HTMLButtonElement> => (e) => {
    e.preventDefault();

    setAxiomsTheorums(prev => {
      const tmp = { ...prev };

      // @ts-expect-error
      delete tmp[`${type}s`][String(number)];

      let newTmp = { ...tmp };

      Object.keys(tmp[`${type}s`]).forEach((key, index) => {
        newTmp = {
          ...newTmp,
          [`${type}s`]: {
            ...newTmp[`${type}s`],
            // @ts-expect-error
            [String(index + 1)]: tmp[`${type}s`][key]
          }
        };
      });

      return newTmp;
    });
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <h2>Axioms:</h2>

      <FormGroup>
        {Object.keys(axiomsTheorums.axioms).map(key => <SystemInput
          key={key}
          label="axiom"
          number={key}
          value={axiomsTheorums.axioms[key as '1']}
          onChange={handleAxiomTheorumChange(key)('axiom')}
          showDelete={axiomsTheorums.axioms[key as '1'] === '' && key !== '1' && key !== String(largestAxiomKey)}
          deleteFn={deleteField(key)('axiom')}
        />)}
      </FormGroup>

      <h2>Theorums:</h2>

      <FormGroup>
        {Object.keys(axiomsTheorums.theorums).map(key => <SystemInput
          key={key}
          label="theorum"
          number={key}
          value={axiomsTheorums.theorums[key as '1']}
          onChange={handleAxiomTheorumChange(key)('theorum')}
          showDelete={axiomsTheorums.theorums[key as '1'] === '' && key !== '1' && key !== String(largestTheorumKey)}
          deleteFn={deleteField(key)('theorum')}
        />)}
      </FormGroup>

      <h2>Ask AI:</h2>

      <FormControl>
        <label htmlFor="perspective">{"AI's perspective"}</label>
        <select id="perspective" onChange={e => setPerspective(e.target.value)} value={perspective}>
          {personaOptions.map(option => <option key={option}>{option}</option>)}
        </select>
      </FormControl>

      {perspective === "other" && <FormControl>
        <label htmlFor="perspective-other">Other perspective:</label>
        <textarea id="perspective-other" onChange={e => setPerspectiveOther(e.target.value)} value={perspectiveOther} />
      </FormControl>}

      <p>According to the above axiomatic system...</p>
      <FormControl>

        <label htmlFor="question">Question</label>
        <select id="question" onChange={e => setQuestion(e.target.value)} value={question}>
          {questionOptions.map(option => <option key={option}>{option}</option>)}
        </select>
      </FormControl>

      {question === "other" && <FormControl>
        <label htmlFor="question-other">Other question:</label>
        <textarea id="question-other" onChange={e => setQuestionOther(e.target.value)} value={questionOther} />
      </FormControl>}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <h3>Prompt to paste:</h3>

        <button onClick={copyToClipboard} className="icon-button">
          <span className="material-symbols-outlined">
            content_copy
          </span>
        </button>
      </div>

      <div ref={promptRef} style={{ border: `1px dashed var(--default-color)`, padding: '0px 16px' }}>
        <h4>Axioms:</h4>

        <ol style={{ listStyleType: 'none' }}>
          {/* @ts-expect-error */}
          {Object.keys(axiomsTheorums.axioms).map(key => axiomsTheorums.axioms[key] !== '' && <li key={key}>{key}{')'} {axiomsTheorums.axioms[key]}</li>)}
        </ol>

        <h4>Theorums:</h4>

        <ol style={{ listStyleType: 'none' }}>
          {/* @ts-expect-error */}
          {Object.keys(axiomsTheorums.theorums).map(key => axiomsTheorums.theorums[key] !== '' && <li key={key}>{key}{')'} {axiomsTheorums.theorums[key]}</li>)}
        </ol>

        <br></br>

        <p>Please answer from the perspective of a {perspective === "other" ? perspectiveOther : perspective}.</p>
        <p>According to the above axiomatic system...</p>
        <p>{question}</p>

      </div>
    </div>
  );
};

type AxiomTheorum = "axiom" | "theorum";

interface SystemInputProps {
  label: AxiomTheorum;
  number: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  showDelete: boolean;
  deleteFn: React.MouseEventHandler<HTMLButtonElement>;
}
const SystemInput = ({ label, number, value, onChange, showDelete, deleteFn }: SystemInputProps) => {
  const displayLabel = React.useMemo(() => label.charAt(0).toUpperCase() + label.slice(1), [label]);

  return (
    <div style={{ display: 'flex', width: '100%', alignItems: 'flex-end', justifyContent: "space-between", gap: '4px' }}>
      <FormControl style={{ flexGrow: 1 }}>
        <label htmlFor={`${label}-${number}`}>{displayLabel} {number}</label>
        <textarea id={`${label}-${number}`} value={value} onChange={onChange} placeholder={number === '1' ? `Enter your first ${label} here` : ''} autoComplete="off" />
      </FormControl>
      {showDelete && <button onClick={deleteFn} className="icon-button">
        <span className="material-symbols-outlined">delete_forever</span>
      </button>}
    </div>
  );
};

const FormGroup = (props: React.HTMLProps<HTMLDivElement>) => <div {...props} style={{ display: 'flex', flexDirection: 'column', gap: '16px', ...props.style }} />;

const FormControl = (props: React.HTMLProps<HTMLDivElement>) => <div {...props} style={{ display: 'flex', flexDirection: 'column', gap: '4px', ...props.style }} />;

const questionOptions = [
  "Is the axiomatic system logically coherent?",
  "Which axioms might be perceived as controversial?",
  "Which axioms need improved?",
  "Which theorums need improved?",
  "How would you rewrite the system to be more logically coherent?",
  "How would you rewrite the system to be less controversial?",
  "other"
];

const personaOptions = [
  "biologist",
  "friend",
  "mathematician",
  "philosopher",
  "physicist",
  "other"
]

