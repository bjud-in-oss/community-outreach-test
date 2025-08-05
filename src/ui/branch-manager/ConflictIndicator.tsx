import React from 'react';

interface ConflictIndicatorProps {
  conflict: boolean;
}

const ConflictIndicator: React.FC<ConflictIndicatorProps> = ({ conflict }) => {
  const indicatorStyle = {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: conflict ? 'red' : 'green',
    display: 'inline-block',
    marginLeft: '10px',
  };

  return <div style={indicatorStyle} title={conflict ? 'Conflict' : 'No Conflict'}></div>;
};

export default ConflictIndicator;
