import { useState } from "react";
import styles from "./App.module.css";
import InvoiceCaptureForm from "./components/invoiceCaptureForm";
import { api } from "./utils/api";
import { InvoiceDepartment, InvoiceParams } from "./types/invoiceTypes";

const checkMarkButton = "✅";
const crossMarkButton = "❌";

const App = () => {
  const intialParams: InvoiceParams = {
    amount: 1000,
    department: InvoiceDepartment.Finance,
    requiresManagerApproval: true,
  };

  const [amount, setAmount] = useState(intialParams.amount);
  const [department, setDepartment] = useState(intialParams.department);
  const [requiresManagerApproval, setRequiresManagerApproval] = useState(
    intialParams.requiresManagerApproval
  );
  const [serverMessage, setServerMessage] = useState("");

  const callWorkflowAPI = async () => {
    const workflowParams: InvoiceParams = {
      amount,
      department,
      requiresManagerApproval,
    };
    try {
      const workflowResponse = await api(
        "workflow",
        "process-invoice",
        "POST",
        workflowParams
      );

      if (workflowResponse.message) {
        setServerMessage(`${checkMarkButton} ${workflowResponse.message}`);
      } else {
        setServerMessage(`${crossMarkButton} An error occurred while processing the invoice.`);
        console.error("Workflow API error:", workflowResponse.error);
      }
    } catch (error) {
      setServerMessage(`${crossMarkButton} An unexpected error occurred.`);
      console.error("Error calling workflow API:", error);
    }
  };

  return (
    <div className={styles.appContainer}>
      <h1>Light Challenge</h1>
      <div className={styles.formContainer}>
        <InvoiceCaptureForm
          setAmount={setAmount}
          setDepartment={setDepartment}
          setRequiresManagerApproval={setRequiresManagerApproval}
          onSendClick={callWorkflowAPI}
          amount={amount}
          department={department}
          requiresManagerApproval={requiresManagerApproval}
        />
        <div
          style={{ marginTop: "20px" }}
        >{serverMessage}</div>
      </div>
    </div>
  );
};

export default App;
