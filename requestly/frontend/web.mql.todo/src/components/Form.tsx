import Modal from "@leafygreen-ui/modal";
import TextInput from "@leafygreen-ui/text-input";
import styled from '@emotion/styled';
import { Description, Label } from '@leafygreen-ui/typography'
import { Radio, RadioGroup } from "@leafygreen-ui/radio-group"
import Button from "@leafygreen-ui/button";
import Banner from "@leafygreen-ui/banner";

import React, { useState, useRef, useEffect } from "react";


export interface ImprovementReqBody {
    name: string
    description: string
    team: string
    size: string 
}

interface FormProps {
    onSubmit: (req: ImprovementReqBody) => any
}

interface RadioFormProps {
    teamRef: React.MutableRefObject<string>
    sizeRef: React.MutableRefObject<string>
}

const RadioFormInputs = ({teamRef, sizeRef} : RadioFormProps) => {
    const [team, setTeam] = useState("");
    const [size, setSize] = useState("");

    useEffect(() => {
        teamRef.current = team;
        sizeRef.current = size;
    }, [team, size]);

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


export const Form = ({onSubmit} : FormProps) => {
    const [open, setOpen] = useState(false);
    const errors = useRef<string[]>([]);
    const [submitCount, setSubmitCount] = useState(0);
    const summaryRef = useRef<HTMLInputElement>();
    const goalRef = useRef<HTMLInputElement>();
    const teamRef = useRef<string>("");
    const sizeRef = useRef<string>("");

    const handleSubmit = () => {
        const req = {
            name: summaryRef.current!.value,
            description: goalRef.current!.value,
            team: teamRef.current,
            size: sizeRef.current,
        } as ImprovementReqBody
        errors.current = []
        if (req.name == undefined || req.name.length == 0){
            errors.current.push("summary field is required");
        }
        if (req.description == undefined || req.description.length == 0){
            errors.current.push("goal field is required");
        }
        if (req.team == undefined || req.team.length == 0){
            errors.current.push("team field is required");
        }
        if (req.size == undefined || req.size.length == 0){
            errors.current.push("size field is required");
        }
        if(errors.current.length > 0) return false;
        onSubmit(req);
        return true;
    };

    const StyledTextInput = styled(TextInput)`
        padding: 10px;
    `;

    const errorBanners = errors.current.length ? errors.current.map((e, i) => {
            return <Banner key={i} variant="danger">{e}</Banner>
        }) : <></>;
    return (
    <>
        <Button
        variant="primaryOutline"
        size="small"
        onClick={() => setOpen(curr => !curr)}>Create improvement</Button>
        <Modal open={open} setOpen={setOpen} className="form-modal">
            { errorBanners}
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
            <RadioFormInputs teamRef={teamRef} sizeRef={sizeRef}></RadioFormInputs>
            <Button onClick={ () => setOpen(false) }>Cancel</Button>
            <Button 
            variant="primary"
            onClick={ () => {
                setSubmitCount(submitCount + 1);
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