import styled from 'styled-components';

export const CategoryContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 20px;
    row-gap: 50px;
`;

export const Title = styled.h2`
    font-size: 38px;
    margin-bottom: 25px;
`;