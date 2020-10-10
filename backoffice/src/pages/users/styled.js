import styled from 'styled-components';

export const AvatarBase = styled.div`
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;

  .ant-avatar {
    line-height: normal !important;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    img {
      max-width: auto;
    }
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;
