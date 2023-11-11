import styled from "styled-components";

// this will add shadowing and modify css conditionally with props 
export const StyledCell = styled.div`
    width: auto;
    background: rgba(${props => props.color}, 0.8);
    border: ${props => (props.type ===0 ? '0px solid' : '4px solid')};
    border-bottom-color: rgba(${props => props.color}, 0.1);
    border-right-color: rgba(${props => props.color}, 1);
    border-left-color: rgba(${props => props.color}, 0.3);
    border-top-color: rgba(${props => props.color}, 1);
`;
