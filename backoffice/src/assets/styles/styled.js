import styled from 'styled-components';

export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #001528;

  .ant-image.logo {
    display: block;
    margin-bottom: 50px;
    img {
      height: 25px;
    }
  }
`;

export const Box = styled.div`
  width: 20vw;
  flex: 0;
  min-width: 320px;
  background: #fff;
  text-align: center;
  border-radius: 15px;
  border: 1px solid #e0e6ed;
  -webkit-box-shadow: 0 4px 6px 0 rgba(85, 85, 85, 0.09019607843137255),
    0 1px 20px 0 rgba(0, 0, 0, 0.08), 0px 1px 11px 0px rgba(0, 0, 0, 0.06);
  -moz-box-shadow: 0 4px 6px 0 rgba(85, 85, 85, 0.09019607843137255),
    0 1px 20px 0 rgba(0, 0, 0, 0.08), 0px 1px 11px 0px rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 6px 0 rgba(85, 85, 85, 0.09019607843137255),
    0 1px 20px 0 rgba(0, 0, 0, 0.08), 0px 1px 11px 0px rgba(0, 0, 0, 0.06);

  .label label {
    margin-bottom: 0px;
    letter-spacing: 1px;
    font-size: 0.7rem;
    font-weight: 500;
    color: #3b3f5c;
    text-transform: uppercase;
  }

  .ant-col-rtl .login-form-forgot {
    float: left;
  }

  .login-form-forgot .ant-checkbox-wrapper {
    float: left;
  }

  .login-form-forgot a {
    float: right;
  }

  .ant-form-item-explain {
    text-align: left;
  }
`;

export const BoxBody = styled.div`
  padding: 24px;
`;

export const BoxHeader = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
`;

export const BoxTitle = styled.h1`
  padding: 0px 24px;
  font-size: 1.1em;
  text-transform: uppercase;
  text-align: left;
  margin: 0;
`;

export const Divider = styled.div`
  display: block;
  margin-top: 50px;
`;

export const BoxFooter = styled.div`
  span {
    color: #999;
  }

  p {
    margin-top: 15px;
    font-size: 0.8rem;
  }
`;
