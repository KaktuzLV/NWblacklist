import React, { useState } from 'react';
import GetTeamData from './GetTeamData';

function EditedText({ result }) {
    const inputText = result;

    let lines = inputText.split('\n');
    lines = lines.filter(line => line.trim() !== '');
    lines = lines.filter((_, index) => index % 2 === 0);
    lines.shift();
    lines = lines.map(line => {
      const parts = line.split(' ');
      return parts.length > 1 ? parts.slice(0, -1).join(' ') : line;
    });
    const processedText = lines.join('\n');
  
    return (
      <GetTeamData teamInfo={processedText}/>
    );
  };

export default EditedText;
