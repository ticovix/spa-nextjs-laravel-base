import React, { useState } from 'react';
import { Layout, Container } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import { Form, Button, Input, Upload, Avatar, Popconfirm } from 'antd';
import useAuth from 'contexts/auth';
import InputMask from 'react-input-mask';
import { changeProfile, uploadAvatar, deleteAvatar } from 'services/account';
import { handleErrors, successMessage, getBase64 } from 'utils';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';
import { AvatarBase } from 'pages/users/styled.js';

const User = () => {
  const { user, updateUser } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(user.photo);
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const routes = [
    {
      breadcrumbName: 'Minha Conta',
      path: '/user',
    },
  ];

  const handleSubmit = (values) => {
    setLoading(true);
    changeProfile(values)
      .then((response) => {
        uploadPhoto();
        updateUser({ ...user, ...values });
        successMessage('Perfil alterado com sucesso!');
      })
      .catch((e) => {
        handleErrors(e.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const uploadPhoto = () => {
    if (selectedFile) {
      uploadAvatar(selectedFile)
        .then((response) => {
          const photo = response.data.photo;
          updateUser({ photo });
        })
        .catch((e) => {
          handleErrors(e.response.data);
        });
    }
  };

  const beforeUpload = (file) => {
    setSelectedFile(file);
  };

  const handleImageChange = (info) => {
    switch (info.file.status) {
      case 'uploading':
        setImageLoading(true);
        break;
      case 'done':
        getBase64(info.file.originFileObj, (imageUrl) => {
          setImage(imageUrl);
          setImageLoading(false);
        });
        break;
      default:
        setImage(user.photo);
        break;
    }
  };

  const handleDeleteImage = () => {
    if (selectedFile) {
      setSelectedFile(null);
      setImage(user.photo);
    } else if (image) {
      setImage(null);
      deleteAvatar(user.id);
      updateUser({ ...user, photo: null });
    }
  };

  return (
    <Layout>
      <PageHeader title="Minha Conta" breadcrumb={{ routes }} />
      <Container>
        <Form
          initialValues={user}
          labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
          wrapperCol={{ xs: { span: 24 }, sm: { span: 8 } }}
          onFinish={handleSubmit}
          id="form"
        >
          <AvatarBase className="mb-5">
            <Upload
              accept=".png,.jpg,.jpeg"
              onChange={handleImageChange}
              beforeUpload={beforeUpload}
              showUploadList={false}
              multiple={false}
            >
              <Avatar size={128} icon={<UserOutlined />} src={image} />
              <Button
                type="primary"
                className="mt-2"
                size="small"
                loading={imageLoading || loading}
              >
                {loading ? 'Enviando..' : 'Selecionar Foto'}
              </Button>
            </Upload>
            {(image || selectedFile) && (
              <Popconfirm
                placement="bottom"
                title={
                  selectedFile
                    ? 'Deseja realmente cancelar a foto?'
                    : 'Deseja realmente remover?'
                }
                onConfirm={() => handleDeleteImage()}
                okText="Sim"
                cancelText="Não"
                key={1}
              >
                <Button
                  type="text"
                  className="text-danger"
                  size="small"
                  disabled={imageLoading || (selectedFile && loading)}
                >
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            )}
          </AvatarBase>

          <Form.Item
            name="name"
            label="Nome"
            rules={[{ required: true, message: 'Digite o nome' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              { required: true, message: 'Digite o e-mail' },
              {
                type: 'email',
                message: 'E-mail inválido',
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item name="phone" label="Telefone">
            <InputMask
              mask="(99) 9999-99999"
              maskChar={null}
              className="ant-input"
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              disabled={loading}
              loading={loading}
            >
              Salvar
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </Layout>
  );
};

export default User;
