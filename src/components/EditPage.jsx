import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PatientService from "../services/PatientService";
import InputForm from "./InputForm";
import Confirm from "./Confirm";
import Success from "./Success";

export default function EditPage({ action }) {
  const [state, setState] = useState({
    id: "",
    name: "",
    gender: "",
    age: "",
    email: "",
    phone: "",
  });
  const [step, setStep] = useState(1);
  const params = useParams();
  useEffect(() => {
    if (action === "Update") {
      PatientService.read(params.id)
        .then((res) => setState(res.data))
        .catch((err) => alert(err));
    }
  }, [action, params]);

  let display;
  switch (step) {
    case 1:
      display = (
        <InputForm
          state={state}
          setState={setState}
          action={action}
          setStep={setStep}
        />
      );
      break;
    case 2:
      display = <Confirm state={state} action={action} setStep={setStep} />;
      break;
    case 3:
      display = <Success action={action} />;
      break;
    default:
      display = null;
  }
  return <Container className="text-center">{display}</Container>;
}
