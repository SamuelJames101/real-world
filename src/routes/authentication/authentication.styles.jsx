import styled from 'styled-components';

const size = {
    mobile: "320px",
    tablet: "768px",
    laptop: "1024px",
    desktop: "2560px",
  }

export const mobile = (inner) => css`
  @media (max-width: ${size.mobile}) {
    ${inner};
  }
`;
export const tablet= (inner) => css`
  @media (max-width: ${size.tablet}) {
    ${inner};
  }
`;
export const desktop= (inner) => css`
  @media (max-width: ${size.desktop}) {
    ${inner};
  }
`;
export const laptop= (inner) => css`
  @media (max-width: ${size.laptop}) {
    ${inner};
  }
`;

export const AuthenticationContainer = styled.div`
    display: flex;
    width: 900px;
    justify-content: space-between;
    margin: 90px auto;

    ${mobile(css`
        flex-direction: column;
        width: 340px;
   `)};
`;