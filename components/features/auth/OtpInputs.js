import { useEffect, useRef } from "react";
import styles from "./OtpInputs.module.css";

export default function OtpInputs({ otp, setOtp }) {
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length == 1) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (index < 4) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key == "Backspace") {
      if (otp[index] == "" && index > 0) {
        const updatedOtp = [...otp];
        updatedOtp[index - 1] = "";
        setOtp(updatedOtp);

        inputRefs.current[index - 1].focus();
      } else {
        const updatedOtp = [...otp];
        updatedOtp[index] = "";
        setOtp(updatedOtp);
      }
    }
  };

  return (
    <div className={styles.otpInputWrapper}>
      <input
        type="text"
        className={styles.otpInput}
        inputMode="numeric"
        maxLength={1}
        ref={(el) => (inputRefs.current[0] = el)}
        onChange={(e) => handleChange(e, 0)}
        onKeyDown={(e) => handleBackspace(e, 0)}
        value={otp[0]}
      />
      <input
        type="text"
        className={styles.otpInput}
        inputMode="numeric"
        maxLength={1}
        ref={(el) => (inputRefs.current[1] = el)}
        onChange={(e) => handleChange(e, 1)}
        onKeyDown={(e) => handleBackspace(e, 1)}
        value={otp[1]}
      />
      <input
        type="text"
        className={styles.otpInput}
        inputMode="numeric"
        maxLength={1}
        ref={(el) => (inputRefs.current[2] = el)}
        onChange={(e) => handleChange(e, 2)}
        onKeyDown={(e) => handleBackspace(e, 2)}
        value={otp[2]}
      />
      <input
        type="text"
        className={styles.otpInput}
        inputMode="numeric"
        maxLength={1}
        ref={(el) => (inputRefs.current[3] = el)}
        onChange={(e) => handleChange(e, 3)}
        onKeyDown={(e) => handleBackspace(e, 3)}
        value={otp[3]}
      />
      <input
        type="text"
        className={styles.otpInput}
        inputMode="numeric"
        maxLength={1}
        ref={(el) => (inputRefs.current[4] = el)}
        onChange={(e) => handleChange(e, 4)}
        onKeyDown={(e) => handleBackspace(e, 4)}
        value={otp[4]}
      />
    </div>
  );
}
