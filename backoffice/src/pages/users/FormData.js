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

const FormData = ({ data, setData, users, mutate, visible, setVisible }) => {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [form] = Form.useForm();
  const isEdit = data.id;
  const title = isEdit ? 'Edit' : 'Create';
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

  const uploadPhoto = async (userId) => {
    let photo = null;

    try {
      const response = await uploadAvatar(userId, selectedFile);
      photo = response.data.photo;
    } catch (e) {
      handleErrors(e);
    }

    return photo;
  };

  const updateUser = (user) => {
    update(user)
      .then(async function (response) {
        let userData = response.data;
        if (selectedFile) {
          userData.photo = await uploadPhoto(userData.id);
        }

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

        successMessage('Updated user successful!');
        closeDrower();
      })
      .catch(function (e) {
        handleErrors(e);
      })
      .finally(function () {
        setLoading(false);
      });
  };

  const createUser = (user) => {
    create(user)
      .then(async function (response) {
        let userData = response.data;
        if (selectedFile) {
          userData.photo = await uploadPhoto(userData.id);
        }

        mutate(users.concat(userData), false);

        successMessage('Registered user successful!');
        closeDrower();
      })
      .catch(function (e) {
        handleErrors(e);
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
            Cancel
          </Button>
          <Button onClick={handleReset} style={{ marginRight: 8 }}>
            Reset
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            form="form"
            loading={loading}
            disabled={loading}
          >
            Save
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
                  disabled={selectedFile && loading}
                  loading={imageLoading || loading}
                >
                  {selectedFile && loading ? 'Sending..' : 'Select Photo'}
                </Button>
              </Upload>
              {(image || selectedFile) && (
                <Popconfirm
                  placement="bottom"
                  title={
                    selectedFile
                      ? 'Do you really want to cancel the photo?'
                      : 'Do you really want to remove it?'
                  }
                  onConfirm={() => handleDeleteImage()}
                  okText="Yes"
                  cancelText="No"
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
              <Col xs={24} sm={12}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true }, { type: 'email' }]}
                >
                  <Input type="email" />
                </Form.Item>
              </Col>
            </Row>
            {isEdit && (
              <>
                <Divider className="mb-0">Change Password</Divider>
                <p className="text-center">
                  Fill in below only if you want to change the password
                </p>
              </>
            )}
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={!isEdit && [{ min: 6 }, { required: true }]}
                >
                  <Input type="password" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="password_confirmation"
                  label="Repeat password"
                  rules={
                    !isEdit && [
                      { required: true },
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }

                          return Promise.reject(
                            'The repeated password is different'
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
