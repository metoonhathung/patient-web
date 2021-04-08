import React from "react";
import { Button } from "react-bootstrap";

export default function Success({ action }) {
  return (
    <div>
      <h1>Congrats! Patient was {action}d.</h1>
      <Button href="/">Go Home</Button>
    </div>
  );
}
