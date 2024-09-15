import {
  FieldValueList,
  withConfiguration,
} from '@pega/cosmos-react-core';

import type { PConnFieldProps } from './PConnProps';
import './create-nonce';
import StyledCustomorgMyLibMulticheckWrapper from './styles';
import { useState } from 'react';

// Interface for props
interface CustomorgMyLibMulticheckProps extends PConnFieldProps {
  formatter: string;
  variant?: any;
}

interface StateProps {
  value: string[];
}

// Main component
function CustomorgMyLibMulticheck(props: CustomorgMyLibMulticheckProps) {
  const {
    getPConnect,
    value = [], // Multi-checkbox values
    disabled = false,
    displayMode,
    readOnly = false,
    required = false,
    label,
    hideLabel = false,
    testId,
    variant = 'inline',
  } = props;

  const [isValid, setIsValid] = useState(false); // To track validation state
  const [touched, setTouched] = useState(false); // To track if field was touched

  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  const stateProps = pConn.getStateProps() as StateProps;
  const propName: any = stateProps.value;

  // Handle checkbox change
  const handleOnChange = (event: any) => {

    
    const { checked, value: checkboxValue } = event.target;
    let updatedValue = [...value];

    

    if (checked) {
      updatedValue.push(checkboxValue);
    } else {
      updatedValue = updatedValue.filter((v) => v !== checkboxValue);
    }

    actions.updateFieldValue(propName, updatedValue);

    // Validate on change
    validateField(updatedValue);
  };

  // Validate the field (required check)
  const validateField = (selectedValues: string[]) => {

    console.log(isValid);
    console.log(selectedValues.length);

    


    if (selectedValues.length === 0) {
      setIsValid(false);
    } else {
      setIsValid(true);

    }
  };

  // Handle on blur (when the user interacts with the field)
  const handleOnBlur = () => {
    setTouched(true); // Set the field as touched
    validateField(value); // Validate on blur
  };

  return (
    <StyledCustomorgMyLibMulticheckWrapper>

      <div className="checkbox-container" onBlur={handleOnBlur}>

       
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
          <label
            key={day}
            className={`checkbox-label ${value.includes(day) ? 'active' : ''}`}
          >
            <input
              type="checkbox"
              value={day}
              checked={value.includes(day)}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              onChange={handleOnChange}
              data-testid={`${testId}-${day}`}
            />
            {day}
          </label>
        ))}
      </div>

      {/* Validation message */}

      {!isValid && (
        <div className="error-message">This field is required</div>
      )}
    </StyledCustomorgMyLibMulticheckWrapper>
  );
}

export default withConfiguration(CustomorgMyLibMulticheck);
