import { useState } from "react";
import Button from '@mui/material/Button';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 class="text-center font-bold">StockVision</h1>
      <Button variant="contained">Let's go</Button>
    </>
  );
}

export default App;
