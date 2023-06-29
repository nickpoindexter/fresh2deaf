import Modal from "@leafygreen-ui/modal";
import TextInput from "@leafygreen-ui/text-input";
import { Radio, RadioGroup } from "@leafygreen-ui/radio-group"
import Button from "@leafygreen-ui/button";

import { useState } from "react";

export const Form = () => {
    const [open, setOpen] = useState(false);
    const [summary, setSummary] = useState("");
    const [goal, setGoal] = useState("");
    const [team, setTeam] = useState("");
    const [size, setSize] = useState("");

    const handleSubmit = () => {
        console.log({
            summary,
            goal,
            team,
            size
        });
    };

    return (
    <>
        <button onClick={() => setOpen(curr => !curr)}>test</button>
        <Modal open={open} setOpen={setOpen} className="form-modal">
            <TextInput 
                label="Summary"
                description="Provide a brief summary of your idea"
                placeholder="Your answer"
                value={summary}
                onChange={ (e) => setSummary(e.target.value) }
            />
            <TextInput 
                label="Goal"
                description="What are the goals of this project?"
                placeholder="Your answer"
                value={goal}
                onChange={ (e) => setGoal(e.target.value) }
            />
            <RadioGroup
                className="team-radio-group"
                name="team-radio-group"
                value={team}
                onChange={ (e) => setTeam(e.target.value) }
            >
                <Radio className="carbon-radio" value="carbon">Carbon</Radio>
                <Radio className="oxygen-radio" value="oxygen">Oxygen</Radio>
                <Radio className="both-radio" value="both">Both</Radio>
            </RadioGroup>
        
            <RadioGroup
                className="size-radio-group"
                name="size-radio-group"
                value={size}
                onChange={ (e) => setSize(e.target.value) }
            >
                <Radio className="xtra-small-radio" value="XS">XS</Radio>
                <Radio className="small-radio" value="S">S</Radio>
                <Radio className="medium-radio" value="M">M</Radio>
                <Radio className="large-radio" value="L">L</Radio>
                <Radio className="xtra-large-radio" value="XL">XL</Radio>
                <Radio className="xtra-xtra-large-radio" value="XXL">XXL</Radio>

            </RadioGroup>
            <Button onClick={ () => setOpen(false) }>Cancel</Button>
            <Button 
            variant="primary"
            onClick={ () => {
                handleSubmit();
            }
            }
            >
                Submit
            </Button>
        </Modal>
    </>
    );
}