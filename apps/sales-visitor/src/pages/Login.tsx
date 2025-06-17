import React, { useState } from 'react';
import { Form, Input, Button, Typography, message, Select } from 'antd';
import {
  DatabaseOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@q-erp-react/auth';
import { ThemeProvider } from '@q-erp-react/shared';
import logo from '../assets/logo.png';
import styles from './login.module.css';

const { Title, Text } = Typography;
const { Option } = Select;

export const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values: any) => {
    setLoading(true);
    console.log('values', values);

    try {
      const result = await login(values.username, values.password);
      if (result.success) {
        message.success('เข้าสู่ระบบสำเร็จ');
        navigate('/dashboard');
      } else {
        message.error(result.message || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      }
    } catch {
      message.error('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme="sales-visitor">
      <div className={styles.pageContainer}>
        <div className={styles.loginContainer}>
          <div className={styles.loginBox}>
            <div className={styles.logoWrapper}>
              <img src={logo} alt="" className={styles.logo} />
            </div>
            {/* <Title level={3} className={styles.title}>
              Q-ERP
            </Title> */}
            <Form
              name="login"
              className={styles.loginForm}
              onFinish={onFinish}
              size="large"
              layout="vertical"
              initialValues={{
                database: 'QERP',
              }}
            >
              <Form.Item
                label="Database"
                name="database"
                rules={[{ required: true, message: 'กรุณาเลือกฐานข้อมูล' }]}
              >
                <Select
                  placeholder="เลือกฐานข้อมูล"
                  className={styles.input}
                  suffixIcon={<DatabaseOutlined />}
                >
                  <Option value="QERP">QERP</Option>
                  <Option value="ฐานข้อมูล">ฐานข้อมูล</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: 'กรุณากรอกชื่อผู้ใช้หรืออีเมล' },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Enter your username"
                  className={styles.input}
                />
              </Form.Item>

              <Form.Item
                label={
                  <div className={styles.passwordLabel}>
                    <span>Password</span>
                    {/* <Link to="/forgot-password" className={styles.forgotLink}>
                      Forgot password?
                    </Link> */}
                  </div>
                }
                name="password"
                rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน' }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Enter your password"
                  className={styles.input}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  className={styles.loginButton}
                >
                  Log in
                </Button>
              </Form.Item>

              {/* Alternative Login */}
              {/* <div className={styles.divider}>
                <span>or</span>
              </div> */}

              {/* <Button
                block
                className={styles.passKeyButton}
                icon={<LockOutlined />}
              >
                Sign in with a passkey
              </Button> */}
            </Form>

            {/* Register Link */}
            {/* <div className={styles.registerBox}>
              <Text>New to Q-ERP?</Text>{' '}
              <Link to="/register">Create an account</Link>
            </div> */}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};
