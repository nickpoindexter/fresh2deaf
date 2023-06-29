import Modal from "@leafygreen-ui/modal";
import { useState } from "react";

export const Form = () => {
    const [open, setOpen] = useState(false);

    return (
    <>
        <button>test</button>
        <Modal open={open} setOpen={setOpen}>
            Test here.
        </Modal>
    </>
    
    )
}