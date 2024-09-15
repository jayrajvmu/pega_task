import {
  withConfiguration,
} from '@pega/cosmos-react-core';

import type { PConnFieldProps } from './PConnProps';
import './create-nonce';
import StyledCustomorgMyLibMulticheckWrapper from './styles';
import { useState } from 'react';

// Interface for props
interface CustomorgMyLibMulticheckProps extends PConnFieldProps {

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
    readOnly = false,
    required = false,
    testId,
  } = props;

  const [isValid, setIsValid] = useState(false); // To track validation state
  const validateField = (selectedValues: string[]) => {
    if (selectedValues.length === 0) {
      setIsValid(false);
    } else {
      setIsValid(true);

    }
  };
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


  // Handle on blur (when the user interacts with the field)
  const handleOnBlur = () => {
    validateField(value); // Validate on blur
  };
 

  return (
    <StyledCustomorgMyLibMulticheckWrapper>

      <div className="container-title">Scheduled Day(s)</div>

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
