// apps/shell/src/app/app.tsx
import { useState, createContext, useContext } from 'react';
import { 
  Layout, 
  Menu, 
  Form, 
  Input, 
  Button, 
  Card, 
  message, 
  Avatar, 
  Dropdown, 
  Space,
  Typography 
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  LogoutOutlined,
  HomeOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  BarChartOutlined,
  SettingOutlined
} from '@ant-design/icons';
import 'antd/dist/reset.css';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

// Mock User Database
const mockUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    name: 'ผู้ดูแลระบบ',
    role: 'admin',
    department: 'IT',
    permissions: ['q-attendance', 'sales-visitor', 'sales-order', 'purchase-order', 'purchase-invoice', 'purchase-request', 'pivot-sales', 'report-sales', 'pivot-purchase', 'settings']
  },
  {
    id: 2,
    username: 'sales1',
    password: 'sales123',
    name: 'พนักงานขาย 1',
    role: 'sales',
    department: 'Sales',
    permissions: ['sales-visitor', 'sales-order', 'q-attendance']
  },
  {
    id: 3,
    username: 'purchase1',
    password: 'purchase123',
    name: 'พนักงานจัดซื้อ',
    role: 'purchase',
    department: 'Purchase',
    permissions: ['purchase-order', 'purchase-invoice', 'purchase-request', 'q-attendance']
  },
  {
    id: 4,
    username: 'user1',
    password: 'user123',
    name: 'พนักงานทั่วไป',
    role: 'user',
    department: 'General',
    permissions: ['q-attendance']
  }
];

// Types
interface User {
  id: number;
  username: string;
  name: string;
  role: string;
  department: string;
  permissions: string[];
}

interface AppState {
  user: User | null;
  currentProject: string;
  sharedData: any;
  isAuthenticated: boolean;
}

interface AppContextType {
  state: AppState;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateSharedData: (data: any) => void;
  setCurrentProject: (project: string) => void;
  hasPermission: (permission: string) => boolean;
}

const AppContext = createContext<AppContextType | null>(null);

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within AppProvider');
  }
  return context;
};

// Menu Items with Permissions
const menuItems = [
  {
    key: 'home',
    icon: <HomeOutlined />,
    label: 'หน้าหลัก',
    permission: null
  },
  {
    key: 'q-attendance',
    icon: <ClockCircleOutlined />,
    label: 'Q-Attendance',
    permission: 'q-attendance'
  },
  {
    key: 'sales-group',
    icon: <TeamOutlined />,
    label: 'Sales',
    children: [
      { key: 'sales-visitor', label: 'Sales Visit', permission: 'sales-visitor' },
      { key: 'sales-order', label: 'Sales Order', permission: 'sales-order' }
    ]
  },
  {
    key: 'purchase-group',
    icon: <ShoppingCartOutlined />,
    label: 'Purchase',
    children: [
      { key: 'purchase-order', label: 'Purchase Order', permission: 'purchase-order' },
      { key: 'purchase-invoice', label: 'Purchase Invoice', permission: 'purchase-invoice' },
      { key: 'purchase-request', label: 'Purchase Request', permission: 'purchase-request' }
    ]
  },
  {
    key: 'reports-group',
    icon: <BarChartOutlined />,
    label: 'Reports',
    children: [
      { key: 'pivot-sales', label: 'Pivot Sales', permission: 'pivot-sales' },
      { key: 'report-sales', label: 'Report Sales', permission: 'report-sales' },
      { key: 'pivot-purchase', label: 'Pivot Purchase', permission: 'pivot-purchase' }
    ]
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: 'Settings',
    permission: 'settings'
  }
];

// Login Component
const LoginComponent = ({ onLogin }: { onLogin: (username: string, password: string) => Promise<boolean> }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const success = await onLogin(values.username, values.password);
      if (!success) {
        message.error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      }
    } catch (error) {
      message.error('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Card 
        style={{ 
          width: 400, 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: '8px'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Title level={2} style={{ color: '#1890ff', marginBottom: '0.5rem' }}>
            ERP System
          </Title>
          <Text type="secondary">เข้าสู่ระบบเพื่อใช้งาน</Text>
        </div>

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'กรุณากรอกชื่อผู้ใช้' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="ชื่อผู้ใช้"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="รหัสผ่าน"
              size="large"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: '1rem' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              block
            >
              เข้าสู่ระบบ
            </Button>
          </Form.Item>
        </Form>

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f6f6f6', borderRadius: '4px' }}>
          <Text strong>ทดสอบบัญชีผู้ใช้:</Text>
          <div style={{ marginTop: '0.5rem', fontSize: '12px' }}>
            <div>• admin / admin123 (ผู้ดูแลระบบ)</div>
            <div>• sales1 / sales123 (พนักงานขาย)</div>
            <div>• purchase1 / purchase123 (พนักงานจัดซื้อ)</div>
            <div>• user1 / user123 (พนักงานทั่วไป)</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// App Provider
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AppState>({
    user: null,
    currentProject: 'home',
    sharedData: {},
    isAuthenticated: false
  });

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.username === username && u.password === password);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      setState(prev => ({
        ...prev,
        user: userWithoutPassword,
        isAuthenticated: true
      }));
      message.success(`ยินดีต้อนรับ ${user.name}!`);
      return true;
    }
    return false;
  };

  const logout = () => {
    setState({
      user: null,
      currentProject: 'home',
      sharedData: {},
      isAuthenticated: false
    });
    message.info('ออกจากระบบเรียบร้อยแล้ว');
  };

  const updateSharedData = (data: any) => {
    setState(prev => ({ 
      ...prev, 
      sharedData: { ...prev.sharedData, ...data }
    }));
  };

  const setCurrentProject = (project: string) => {
    setState(prev => ({ ...prev, currentProject: project }));
  };

  const hasPermission = (permission: string): boolean => {
    return state.user?.permissions.includes(permission) || false;
  };

  return (
    <AppContext.Provider value={{
      state,
      login,
      logout,
      updateSharedData,
      setCurrentProject,
      hasPermission
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Main Content Components
const HomeComponent = () => {
  const { state } = useAppState();
  
  return (
    <div style={{ padding: '2rem' }}>
      <Title level={2}>ยินดีต้อนรับ {state.user?.name}!</Title>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card>
          <Text strong>ข้อมูลผู้ใช้:</Text>
          <div style={{ marginTop: '1rem' }}>
            <div>ชื่อ: {state.user?.name}</div>
            <div>ตำแหน่ง: {state.user?.role}</div>
            <div>แผนก: {state.user?.department}</div>
          </div>
        </Card>

        <Card>
          <Text strong>สิทธิ์การเข้าถึง:</Text>
          <div style={{ marginTop: '1rem' }}>
            {state.user?.permissions.map(permission => (
              <div key={permission} style={{ marginBottom: '0.25rem' }}>
                • {permission}
              </div>
            ))}
          </div>
        </Card>
      </Space>
    </div>
  );
};

const QAttendanceComponent = () => {
  const { state, updateSharedData } = useAppState();
  
  const checkIn = () => {
    const checkInData = {
      timestamp: new Date().toISOString(),
      userId: state.user?.id,
      action: 'check-in'
    };
    updateSharedData({ lastCheckIn: checkInData });
    message.success('เช็คอินสำเร็จ!');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Title level={2}>Q-Attendance System</Title>
      <Card>
        <Button 
          type="primary" 
          onClick={checkIn}
          icon={<ClockCircleOutlined />}
          size="large"
        >
          เช็คอิน
        </Button>
        
        {state.sharedData.lastCheckIn && (
          <div style={{ marginTop: '1rem' }}>
            <Text strong>เช็คอินล่าสุด:</Text>
            <div>เวลา: {new Date(state.sharedData.lastCheckIn.timestamp).toLocaleString('th-TH')}</div>
          </div>
        )}
      </Card>
    </div>
  );
};

const SalesVisitorComponent = () => {
  const { state, updateSharedData } = useAppState();
  
  const addVisit = () => {
    const visitData = {
      timestamp: new Date().toISOString(),
      userId: state.user?.id,
      customerName: 'บริษัท ABC จำกัด',
      purpose: 'นำเสนอผลิตภัณฑ์ใหม่'
    };
    updateSharedData({ 
      visits: [...(state.sharedData.visits || []), visitData] 
    });
    message.success('บันทึกการเยี่ยมลูกค้าสำเร็จ!');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Title level={2}>Sales Visitor System</Title>
      <Card>
        <Button 
          type="primary" 
          onClick={addVisit}
          icon={<TeamOutlined />}
          size="large"
        >
          บันทึกการเยี่ยมลูกค้า
        </Button>
      </Card>
    </div>
  );
};

const NoPermissionComponent = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <Title level={3}>ไม่มีสิทธิ์เข้าถึง</Title>
    <Text>คุณไม่มีสิทธิ์เข้าถึงส่วนนี้ กรุณาติดต่อผู้ดูแลระบบ</Text>
  </div>
);

// Main App Component
const MainApp = () => {
  const { state, logout, setCurrentProject, hasPermission } = useAppState();
  const [collapsed, setCollapsed] = useState(false);

  // Filter menu items based on permissions
  const filterMenuItems = (items: any[]): any[] => {
    return items.filter(item => {
      if (item.permission && !hasPermission(item.permission)) {
        return false;
      }
      if (item.children) {
        const filteredChildren = item.children.filter((child: any) => 
          !child.permission || hasPermission(child.permission)
        );
        if (filteredChildren.length === 0) {
          return false;
        }
        item.children = filteredChildren;
      }
      return true;
    });
  };

  const filteredMenuItems = filterMenuItems([...menuItems]);

  const renderContent = () => {
    const currentItem = state.currentProject;
    
    // Check permission for current page
    if (currentItem !== 'home') {
      const menuItem = menuItems.find(item => 
        item.key === currentItem || 
        item.children?.some((child: any) => child.key === currentItem)
      );
      
      let permission = null;
      if (menuItem?.key === currentItem) {
        permission = menuItem.permission;
      } else if (menuItem?.children) {
        const childItem = menuItem.children.find((child: any) => child.key === currentItem);
        permission = childItem?.permission;
      }
      
      if (permission && !hasPermission(permission)) {
        return <NoPermissionComponent />;
      }
    }

    switch(currentItem) {
      case 'q-attendance':
        return <QAttendanceComponent />;
      case 'sales-visitor':
        return <SalesVisitorComponent />;
      case 'home':
      default:
        return <HomeComponent />;
    }
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
        ออกจากระบบ
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        theme="light"
      >
        <div style={{ 
          height: '64px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
            {collapsed ? 'ERP' : 'ERP System'}
          </Title>
        </div>
        
        <Menu
          mode="inline"
          selectedKeys={[state.currentProject]}
          items={filteredMenuItems}
          onClick={({ key }) => setCurrentProject(key)}
        />
      </Sider>
      
      <Layout>
        <Header style={{ 
          background: '#fff', 
          padding: '0 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <div />
          <Dropdown overlay={userMenu} placement="bottomRight">
            <Space style={{ cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} />
              <span>{state.user?.name}</span>
            </Space>
          </Dropdown>
        </Header>
        
        <Content style={{ margin: 0, overflow: 'auto' }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

// Root App
const App = () => {
  const { state, login } = useAppState();

  if (!state.isAuthenticated) {
    return <LoginComponent onLogin={login} />;
  }

  return <MainApp />;
};

const RootApp = () => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};

export default RootApp;