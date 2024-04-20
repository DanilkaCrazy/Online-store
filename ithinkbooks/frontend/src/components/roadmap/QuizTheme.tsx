import React, { useState } from 'react';
import { useQuiz } from '../hooks/QuizProvider';
import { DropdownField } from '../ui/FormFields';
import themes from '../mock/themes.json';
import { Link } from 'react-router-dom';

const QuizTheme: React.FC<{}> = () => {
  const {updateTheme} = useQuiz();
  const [theme, setTheme] = useState<string>(themes[0].shortName);

  const onThemeSelect = (eventKey: string | null) => {
    const foundTheme = themes.find((t) => t.shortName === eventKey);

    if (!foundTheme) {
      return;
    }

    setTheme(foundTheme.shortName);
  };

  const onThemeSubmit = () => {
    const foundTheme = themes.find((t) => t.shortName === theme);
    updateTheme(!foundTheme ? themes[0] : foundTheme);
  };

  return (
    <>
      <h2>Тест для построения роадмапа</h2>
      <div className='quiz-inner-page quiz-theme'>
        <h3 className='normal-h3'>Для построения роадмапа необходимо пройти тест. 
          Сначала выберите заинтересовавшее Вас направление IT.</h3>

        <DropdownField
          fieldHeader=''
          options={themes.map((t) => t.shortName)}
          placeholder={theme}
          onOptionSelect={onThemeSelect}/>
        
        <div className='buttons-group'>
          <Link className='main-button' to='/quiz/questions' onClick={onThemeSubmit}>Начать тест</Link>
        </div>
      </div>
    </>
  );
};

export default QuizTheme;
