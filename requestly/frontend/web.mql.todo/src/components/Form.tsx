import Modal from "@leafygreen-ui/modal";
import TextInput from "@leafygreen-ui/text-input";
import styled from '@emotion/styled';
import { Description, Label } from '@leafygreen-ui/typography'
import { Radio, RadioGroup } from "@leafygreen-ui/radio-group"
import Button from "@leafygreen-ui/button";
import { Improvement } from "../types";

import { useState, useEffect } from "react";

type RadioProps = {
    team: string,
    size: string,
    setSize: (newSize: string) => void;
    setTeam: (newTeam: string) => void;
  };

const RadioFormInputs = ({team, setTeam, size, setSize}:RadioProps) => {
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
    </>
    );
}

type FormProps = {
    Submit: (improvement: Improvement, isEdit: boolean) => void;
    editableImprovement?: Improvement;
    setOpen: (open: boolean) => void;
    open: boolean;
  };

const StyledTextInput = styled(TextInput)`
  padding: 10px;
`;

export const Form = ({Submit, editableImprovement, open, setOpen}: FormProps) => {
    const [summary, setSummary] = useState<string>(editableImprovement?.name ?? "");
    const [goal, setGoal] = useState<string>(editableImprovement?.description ?? "");
    const [team, setTeam] = useState<string>(editableImprovement?.team ?? "");
    const [size, setSize] = useState<string>(editableImprovement?.size ?? "");

    const onPressSubmit = () => {
        Submit({
            ...editableImprovement,
            name: summary,
            description: goal,
            team: team,
            size: size,
        }, !!editableImprovement)
        setOpen(false);
      };

    useEffect(() => {
       setSummary(editableImprovement?.name ?? "");
       setGoal(editableImprovement?.description?? "") ;
       setTeam(editableImprovement?.team ?? "");
       setSize(editableImprovement?.size ?? "");
    }, [editableImprovement?.name, editableImprovement?.description, editableImprovement?.team, editableImprovement?.size]);

    return (
        <Modal open={open} setOpen={setOpen} className="form-modal">
            <StyledTextInput 
                label="Summary"
                description="Provide a brief summary of your idea"
                placeholder="Your answer"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
            />
            <StyledTextInput 
                label="Goal"
                description="What are the goals of this project?"
                placeholder="Your answer"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
            />
            <RadioFormInputs team={team} setTeam={setTeam} size={size} setSize={setSize}></RadioFormInputs>
            <Button onClick={ () => setOpen(false) }>Cancel</Button>
            <Button 
            variant="primary"
            onClick={() => onPressSubmit()}
            >
                Submit
            </Button>
        </Modal>
    );
}