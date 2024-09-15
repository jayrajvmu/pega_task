import styled from 'styled-components';

// Styles for the multi-checkbox component
const StyledCustomorgMyLibMulticheckWrapper = styled.div`
  .checkbox-container {
    display: flex;
  }

  .checkbox-label {



    display: inline-block;
    padding: 10px 20px;
    border: 1px solid #d1d1d1;
    background-color: #ffffff;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;


    &:first-child {
       border-top-left-radius:5px;
       border-bottom-left-radius:5px 
 
    }

     &:last-child {
       border-top-right-radius:5px;
       border-bottom-right-radius:5px 
 
    }

    input {
      display: none;
    }

    &:hover {
      background-color: #e0e0e0;
    }

    &.active {
      background-color: #007bff;
      color: white;
      border-color: #007bff;
    }

    &:not(.active) {
      color: #333;
    }

    &:disabled {
      background-color: #e0e0e0;
      cursor: not-allowed;
    }
  }

  .error-message {
    color: #ff4d4f;
    font-size: 14px;
    margin-top: 5px;
  }
`;

export default StyledCustomorgMyLibMulticheckWrapper;
