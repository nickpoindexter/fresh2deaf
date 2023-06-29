import Modal from "@leafygreen-ui/modal";
import TextInput from "@leafygreen-ui/text-input";
import styled from '@emotion/styled';
import { Description, H3, Label } from '@leafygreen-ui/typography'
import { Radio, RadioGroup } from "@leafygreen-ui/radio-group"
import Button from "@leafygreen-ui/button";

import { useState, useRef } from "react";

export const Form = () => {
    const [open, setOpen] = useState(false);
    const summaryRef = useRef();
    const goalRef = useRef();
    const teamRef = useRef();
    const [team, setTeam] = useState("");
    const [size, setSize] = useState("");

    const handleSubmit = () => {
        console.log({
            'summary': summaryRef.current.value,
            'goal': goalRef.current.value,
            team,
            size
        });
        return true;
    };

    const StyledTextInput = styled(TextInput)`
        padding: 10px;
    `;

    const StyledRadioGroup = styled(RadioGroup)`
        padding: 10px;
        padding-bottom: 15px;
        flex-direction: ${props => props.className !== "size-radio-group" ? 'row' : 'column' } !important
    `;

    const StyledLabel = styled(Label)`
        padding: 10px;
    `

    const StyledDescription = styled(Description)`
        padding-left: 10px;
    `

    return (
    <>
        <button onClick={() => setOpen(curr => !curr)}>test</button>
        <Modal open={open} setOpen={setOpen} className="form-modal">
            <StyledTextInput 
                label="Summary"
                description="Provide a brief summary of your idea"
                placeholder="Your answer"
                ref={summaryRef}
            />
            <StyledTextInput 
                label="Goal"
                description="What are the goals of this project?"
                placeholder="Your answer"
                ref={goalRef}
            />
            <StyledLabel>Team</StyledLabel>
            <StyledDescription>Which team would own this?</StyledDescription>
            <StyledRadioGroup
                className="team-radio-group"
                name="team-radio-group"
                value={team}
                onChange={ (e) => setTeam(e.target.value) }
            >
                <Radio className="carbon-radio" value="carbon">Carbon</Radio>
                <Radio className="oxygen-radio" value="oxygen">Oxygen</Radio>
                <Radio className="both-radio" value="both">Both</Radio>
            </StyledRadioGroup>
            <StyledLabel>Size</StyledLabel> 
            <StyledRadioGroup
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

            </StyledRadioGroup>
            <Button onClick={ () => setOpen(false) }>Cancel</Button>
            <Button 
            variant="primary"
            onClick={ () => {
                if(handleSubmit()){
                    setOpen(false);
                }
                
            }
            }
            >
                Submit
            </Button>
        </Modal>
    </>
    );
}