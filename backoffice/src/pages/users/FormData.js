import React, { useState } from 'react';
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Divider,
  Upload,
  Avatar,
  Popconfirm,
} from 'antd';
import { useEffect } from 'react';
import { AvatarBase } from './styled.js';
import { getBase64, successMessage, handleErrors } from 'utils';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';
import { update, create, uploadAvatar, deleteAvatar } from 'services/user';
import useAuth from 'contexts/auth';
import InputMask from 'react-input-mask';

const FormData = ({ data, setData, users, mutate, visible, setVisible }) => {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [form] = Form.useForm();
  const isEdit = data.id;
  const title = isEdit ? 'Editar' : 'Adicionar';
  const { user: authUser, updateUser: updateAuthUser } = useAuth();

  const closeDrower = () => {
    setData({});
    setVisible(false);
    setSelectedFile(null);
    setLoading(false);
    setImageLoading(false);
  };

  const handleReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    if (visible) {
      form.resetFields();
      setImage(data.photo);
    }
  }, [data, visible]);

  const handleSubmit = (values) => {
    let formData = Object.assign(data, values);

    setLoading(true);
    if (formData.id) {
      updateUser(formData);
    } else {
      createUser(formData);
    }
  };

  const uploadPhoto = (userId) => {
    if (!selectedFile) {
      return false;
    }

    uploadAvatar(userId, selectedFile)
      .then(function (response) {
        const photo = response.data.photo;
        mutate(
          users.map((item) => {
            if (item.id === userId) {
              return { ...item, photo };
            }

            return item;
          }),
          false
        );

        if (userId === authUser.id) {
          updateAuthUser({ photo });
        }
      })
      .catch(function (e) {
        handleErrors(e);
      });
  };

  const updateUser = (user) => {
    update(user)
      .then(function (response) {
        let userData = response.data;

        uploadPhoto(userData.id);

        if (userData.id === authUser.id) {
          updateAuthUser(user);
        }

        mutate(
          users.map((item) => {
            if (item.id === userData.id) {
              return userData;
            }

            return item;
          }),
          false
        );

        successMessage('Usuário editado com sucesso!');
        closeDrower();
      })
      .catch(function (e) {
        handleErrors(e);
      })
      .finally(function () {
        setLoading(false);
      });
  };

  const createUser = async (user) => {
    create(user)
      .then(function (response) {
        let userData = response.data;
        let userId = userData.id;
        mutate(users.concat(userData), false);
        uploadPhoto(userId);

        successMessage('Usuário cadastrado com sucesso!');
        closeDrower();
      })
      .catch(function (e) {
        handleErrors(response.data);
      })
      .finally(function () {
        setLoading(false);
      });
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
        setImage(data.photo);
        break;
    }
  };

  const handleDeleteImage = () => {
    if (selectedFile) {
      setSelectedFile(null);
      setImage(data.photo);
    } else if (image) {
      mutate(
        users.map((item) => {
          if (item.id === data.id) {
            return { ...item, photo: null };
          }

          return item;
        }),
        false
      );
      setImage(null);
      deleteAvatar(data.id);
      if (data.id === authUser.id) {
        updateAuthUser(data);
      }
    }
  };

  return (
    <Drawer
      title={title}
      width={800}
      onClose={closeDrower}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={closeDrower} style={{ marginRight: 8 }}>
            Cancelar
          </Button>
          <Button onClick={handleReset} style={{ marginRight: 8 }}>
            Resetar
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            form="form"
            loading={loading}
            disabled={loading}
          >
            Salvar
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={data}
        onFinish={handleSubmit}
        id="form"
      >
        <Row gutter={16}>
          <Col xs={24} md={5}>
            <AvatarBase>
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
                    disabled={imageLoading || loading}
                  >
                    <DeleteOutlined />
                  </Button>
                </Popconfirm>
              )}
            </AvatarBase>
          </Col>
          <Col sm={24} md={19}>
            <Row gutter={16}>
              <Col xs={24} sm={8}>
                <Form.Item
                  name="name"
                  label="Nome"
                  rules={[{ required: true, message: 'Digite o nome' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
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
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item name="phone" label="Telefone">
                  <InputMask
                    mask="(99) 9999-99999"
                    maskChar={null}
                    className="ant-input"
                  />
                </Form.Item>
              </Col>
            </Row>
            {isEdit && (
              <>
                <Divider className="mb-0">Alterar Senha</Divider>
                <p className="text-center">
                  Preencha abaixo somente se desejar alterar a senha
                </p>
              </>
            )}
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label="Senha"
                  rules={
                    !isEdit && [
                      {
                        min: 6,
                      },
                      {
                        required: true,
                        message: 'Digite a senha',
                      },
                    ]
                  }
                >
                  <Input type="password" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="password_confirmation"
                  label="Repita a Senha"
                  rules={
                    !isEdit && [
                      {
                        required: true,
                        message: 'Repita a senha',
                      },
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }

                          return Promise.reject(
                            'A senha repetida está diferente'
                          );
                        },
                      }),
                    ]
                  }
                >
                  <Input type="password" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default FormData;
