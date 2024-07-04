import React, { createContext, useContext, useState } from "react";

interface FinacialRecord {
  _id?: string;
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

interface FinancialRecordContextType {
  records: FinacialRecord;
  addRecord: (record: FinacialRecord) => void;
  //   updateRecord: (id: string, newRecord: FinacialRecord) => void;
  //   deleteRecord: (id: string) => void;
}

export const FinancialRecordContext = createContext<
  FinancialRecordContextType | undefined
>(undefined);

export const FinacialRecordProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [records, setRecords] = useState<FinacialRecord[]>([]);

  const addRecord = async (record: FinacialRecord) => {
    const response = await fetch("http://localhost:3001/finacial-records", {
      method: "POST",
      body: JSON.stringify(record),
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log("======rrr",response);
    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) => [...prev, newRecord]);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <FinancialRecordContext.Provider value={{ records, addRecord }}>
      {children}
    </FinancialRecordContext.Provider>
  );
};

export const useFinancialRecords = () => {
  const context = useContext<FinancialRecordContextType | undefined>(
    FinancialRecordContext
  );

  if (!context) {
    throw new Error(
      "useFinancial Records must be used within a FinancialRecordsProvider"
    );
  }

  return context;
};
