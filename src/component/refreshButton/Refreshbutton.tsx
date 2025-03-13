import { RefreshButtonProps } from "../../types/dataDisplay.types";


function Refreshbutton({refresh}:RefreshButtonProps) {
  return (
    <div>
      <button onClick={refresh}>Refreshbutton</button>
    </div>
  );
}

export default Refreshbutton;
