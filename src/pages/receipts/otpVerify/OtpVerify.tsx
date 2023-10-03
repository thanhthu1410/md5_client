import React, { useEffect, useRef, useState } from 'react';
import './otpVerify.scss';

type OTPVerificationProp = {
    handleGetReceipt: Function
}

function OTPVerification(props: OTPVerificationProp) {
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [otpValue, setOtpValue] = useState('');

    useEffect(() => {
        const inputs = document.querySelectorAll("input");

        inputs.forEach((input, index1) => {
            input.addEventListener("keyup", (e) => {
                const currentInput = input,
                    nextInput = input.nextElementSibling,
                    prevInput = input.previousElementSibling;

                if (currentInput.value.length > 1) {
                    currentInput.value = "";
                    return;
                }

                if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
                    nextInput.removeAttribute("disabled");
                    (nextInput as HTMLInputElement).focus();
                }

                if (e.key === "Backspace") {
                    inputs.forEach((input, index2) => {
                        if (index1 <= index2 && prevInput) {
                            input.setAttribute("disabled", "true");
                            input.value = "";
                            (prevInput as HTMLInputElement).focus();
                        }
                    });
                }

                const isAllInputsFilled = [...inputs].every(input => input.value !== "");
                setIsButtonActive(isAllInputsFilled);
            });
        });
    }, []);

    const firstInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, []);
    const [inputValues, setInputValues] = useState(['', '', '', '', '', '']);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = e.target.value;
        setInputValues(newInputValues);
    };

    const combinedValue = inputValues.join('');
    console.log("combinedValue",combinedValue);
    

    return (
        <div className="otp-container">
          <div  className="otp-container-chirld">
          <header>
                <i className="bx bxs-check-shield"></i>
            </header>
            <h4>Enter OTP Code</h4>
            <div className='otpForm'>
                <div className="input-field">
                    {inputValues.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            value={value}
                            onChange={(e) => handleInputChange(e, index)}
                            disabled={index !== 0}
                        />
                    ))}
                </div>
                <button
                    className="otpVerify-button"onClick={() => props.handleGetReceipt(combinedValue)}
                    >
                        Verify OTP
                    </button>
                </div>
          </div>
            </div>
        );
    }
    
    export default OTPVerification;