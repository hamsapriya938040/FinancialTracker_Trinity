import { createContext, useState } from "react";

export const LoanContext = createContext();

export default function LoanProvider({ children }) {
  const [loans, setLoans] = useState([
    {
      id: "l1",
      bank: "SBI",
      branch: "Kalangiri",
      type: "Home Loan",
      interest: "8.5%",
    },
    {
      id: "l2",
      bank: "HDFC",
      branch: "MG Road",
      type: "Car Loan",
      interest: "10.1%",
    }
  ]);

  const [emis, setEmis] = useState([
    {
      id: "e1",
      bank: "ICICI",
      branch: "Main Branch",
      type: "Personal Loan EMI",
      monthlyAmount: 5000,
      yearsLeft: 1,
      monthsLeft: 4,
    }
  ]);

  // 👉 Add Loan
  const addLoan = (loan) => {
    setLoans((prev) => [...prev, loan]);
  };

  // 👉 Add EMI
  const addEmi = (emi) => {
    setEmis((prev) => [...prev, emi]);
  };

  // 👉 Delete Loan
  const deleteLoan = (id) => {
    setLoans((prev) => prev.filter((loan) => loan.id !== id));
  };

  // 👉 Delete EMI
  const deleteEmi = (id) => {
    setEmis((prev) => prev.filter((emi) => emi.id !== id));
  };

  return (
    <LoanContext.Provider
      value={{
        loans,
        emis,
        addLoan,
        addEmi,
        deleteLoan,
        deleteEmi,
      }}
    >
      {children}
    </LoanContext.Provider>
  );
}
