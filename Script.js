import React, { useState } from 'react';
import { config } from 'dotenv';
config();

import { Configuration, OpenAIApi } from 'openai';

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.API_KEY })
);

function CodeTranslator() {
  const [language, setLanguage] = useState('');
  const [code, setCode] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [translation, setTranslation] = useState('');

  const handleLanguageChange = event => {
    setLanguage(event.target.value);
  };

  const handleCodeChange = event => {
    setCode(event.target.value);
  };

  const handleNewLanguageChange = event => {
    setNewLanguage(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!code) {
      return;
    }

    const prompt =
      '##### Translate this function  from ${language} into ${newLanguage}\n### ${language}\n    \n   ${code}   \n### ${newLanguage}';

    openai
      .createCompletion({
        model: 'text-davinci-003',
        prompt,
        temperature: 0,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ['###'],
      })
      .then(res => {
        setTranslation(res.data.choices[0].text);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <form id='code-form' onSubmit={handleSubmit}>
        <div className='program-select'>
          <label htmlFor='language-select'>Programming Language:</label>
          <select
            id='language-select'
            value={language}
            onChange={handleLanguageChange}
          >
            <option value='javascript'>JavaScript</option>
            <option value='java'>Java</option>
            <option value='python'>Python</option>
            <option value='ruby'>Ruby</option>
            <option value='typscript'>Typescript</option>
            <option value='rust'>Rust</option>
            <option value='c++'>C++</option>
          </select>
        </div>

        <div>
          <label htmlFor='code-input'>Code:</label>
          <textarea
            id='code-input'
            value={code}
            onChange={handleCodeChange}
          ></textarea>
        </div>

        <div className='program-convert'>
          <label htmlfor='language-select'>Programming Into:</label>
          <select
            id='language-select'
            value={newLanguage}
            onChange={handleNewLanguageChange}
          >
            <option value='javascript'>JavaScript</option>
            <option value='java'>Java</option>
            <option value='python'>Python</option>
            <option value='ruby'>Ruby</option>
            <option value='typscript'>Typescript</option>
            <option value='rust'>Rust</option>
            <option value='c++'>C++</option>
          </select>
        </div>

        <button type='submit'>Translate</button>
      </form>

      <div id='translation-output'>
        {translation}
        {/* <textarea id='code-input'></textarea> */}
      </div>
    </div>
  );
}

export default CodeTranslator;
