import React from 'react';
import './style.css';

interface JSONPrinterProps {
  data: any;
  indent?: number;
}

const JSONPrinter: React.FC<JSONPrinterProps> = ({ data, indent = 2 }) => {
  const renderValue = (value: any): JSX.Element => {
    if (value === null) {
      return <span className="json-null">null</span>;
    }

    if (typeof value === 'boolean') {
      return <span className="json-boolean">{value.toString()}</span>;
    }

    if (typeof value === 'number') {
      return <span className="json-number">{value}</span>;
    }

    if (typeof value === 'string') {
      return <span className="json-string">"{value}"</span>;
    }

    if (Array.isArray(value)) {
      return (
        <span className="json-array">
          [
          {value.length > 0 ? (
            <>
              <div className="json-indent">
                {value.map((item, index) => (
                  <div key={index}>
                    {renderValue(item)}
                    {index < value.length - 1 && <span className="json-comma">,</span>}
                  </div>
                ))}
              </div>
            </>
          ) : null}
          ]
        </span>
      );
    }

    if (typeof value === 'object') {
      return renderObject(value);
    }

    return <span>{String(value)}</span>;
  };

  const renderObject = (obj: Record<string, any>): JSX.Element => {
    const entries = Object.entries(obj);
    
    return (
      <span className="json-object">
        {'{'}
        {entries.length > 0 ? (
          <div className="json-indent">
            {entries.map(([key, value], index) => (
              <div key={key} className="json-property">
                <span className="json-key">"{key}"</span>
                <span className="json-colon">: </span>
                {renderValue(value)}
                {index < entries.length - 1 && <span className="json-comma">,</span>}
              </div>
            ))}
          </div>
        ) : null}
        {'}'}
      </span>
    );
  };

  return (
    <pre className="json-printer">
      {renderValue(data)}
    </pre>
  );
};

export default JSONPrinter;
