import { useState, useEffect, ChangeEvent } from 'react';
import { hexToRgb, isValidHex } from '../utils/colorUtils';

function ColorConverter() {
  const [value, setValue] = useState<string>('#9921ff');
  const [error, setError] = useState<boolean>(false);
  const [rgb, setRgb] = useState<string>('rgb(153, 33, 255)');
  const [bgColor, setBgColor] = useState<string>('#9921ff');

  useEffect(() => {
    if (value.length === 7 && isValidHex(value)) {
      setBgColor(value);
    }
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setValue(input);

    if (input.length === 7) {
      if (isValidHex(input)) {
        setError(false);
        setRgb(hexToRgb(input));
      } else {
        setError(true);
        setRgb('');
      }
    } else {
      setError(false);
      setRgb('');
    }
  };

  return (
    <div
      className="app-wrapper"
      style={{
        backgroundColor: bgColor,
        minHeight: '100vh',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div className="container">
        <h1 className="title">Конвертер цветов HEX → RGB</h1>
        <p className="subtitle">Введите HEX-код цвета (например, #ff0000)</p>
        <label className="input-group">
          <input
            type="text"
            className="input-field"
            id="colorInput"
            placeholder="#ff0000"
            value={value}
            onChange={handleChange}
            maxLength={7}
          />
          <span className={`result${error ? ' error' : ''}`} id="result">
            {error
              ? 'Ошибка! Неверный HEX-код'
              : value.length < 7
                ? 'Введите 7 символов, включая #'
                : rgb}
          </span>
        </label>
      </div>
    </div>
  );
}

export default ColorConverter;