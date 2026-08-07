import { useState, useEffect } from 'react';
import { Table, Tag, Space, Button, Input, message, ConfigProvider } from 'antd';
import type { TableProps } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { VolunteerService } from '../../services/volunteer.service';

const columns: TableProps['columns'] = [
  {
    title: 'Name',
    key: 'name',
    sorter: (a, b) => (a.firstName || '').localeCompare(b.firstName || ''),
    // Combine firstName and lastName for the name column
    render: (_, record) => (
      <a className="fw-semibold text-decoration-none" style={{ color: 'var(--logo-primary)' }}>
        {record.firstName} {record.lastName}
      </a>
    ),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    sorter: (a, b) => (a.email || '').localeCompare(b.email || ''),
  },
  {
    title: 'Phone',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    sorter: (a, b) => (a.phoneNumber || '').localeCompare(b.phoneNumber || '')
  },
  {
    title: 'Interest Area',
    dataIndex: 'interestArea',
    key: 'interestArea',
    sorter: (a, b) => (a.interestArea || '').localeCompare(b.interestArea || ''),
    render: (text) => (
      <Tag color="blue" className="rounded-pill px-3">
        {text}
      </Tag>
    )
  },
  {
    title: 'Action',
    key: 'action',
    width: 220, // Reduced width for the action column
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/volunteer/view/${record.id}`}>
          <Button type="text" className="p-0 text-success"><i className="bi bi-eye"></i> View</Button>
        </Link>
        <Button type="text" className="p-0 text-primary"><i className="bi bi-pencil-square"></i> Edit</Button>
        <Button type="text" danger className="p-0"><i className="bi bi-trash"></i> Delete</Button>
      </Space>
    ),
  },
];

// Removed hardcoded data array

export default function Volunteer() {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]); // State to hold API data
  const [loading, setLoading] = useState<boolean>(true); // State for table loading spinner
  const [searchText, setSearchText] = useState<string>(''); // State for search input

  // Filter the data based on search text
  const filteredData = data.filter(item => {
    if (!searchText) return true;
    const lowercasedFilter = searchText.toLowerCase();
    return Object.keys(item).some(key => {
      const val = item[key];
      if (typeof val === 'string') {
        return val.toLowerCase().includes(lowercasedFilter);
      }
      return false;
    });
  });

  // In React, useEffect with an empty dependency array [] is exactly like ngOnInit() in Angular.
  // It runs once when the component is mounted to the DOM.
  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    setLoading(true);

    try {
      const response = await VolunteerService.getVolunteers();

      setData(response.data.list);
    } catch (error) {
      console.log(error);
      message.error("Failed to load volunteers");
    }

    setLoading(false);
  };

  return (
    <div className="p-4" style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold text-dark mb-1">Volunteer Management</h3>
          <p className="text-muted">Manage all registered volunteers for the foundation.</p>
        </div>
        <div>
          <Button
            type="primary"
            size="large"
            style={{ backgroundColor: 'var(--logo-primary)', borderRadius: '8px' }}
            onClick={() => navigate('/volunteer-form')}
          >
            <i className="bi bi-plus-lg me-2"></i> Add Volunteer
          </Button>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-light ">
            <h5 className="m-0 fw-bold text-muted">Registered Volunteers List</h5>
            <div style={{ width: 300 }}>
              <Input
                size="large"
                placeholder="Search by name, email, or phone..."
                prefix={<i className="bi bi-search text-muted me-2" style={{ fontSize: '1.1rem' }}></i>}
                style={{
                  borderRadius: 24,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  border: '1px solid #eaeaea',
                  paddingLeft: '14px'
                }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
              />
            </div>
          </div>
          <div className="p-3">
            <ConfigProvider
              theme={{
                components: {
                  Table: {
                    headerBg: '#173b30', // Deep forest green (brand primary)
                    headerColor: '#ffffff', // White text
                    borderColor: '#cbc9c9ff', // Makes the gridlines dark
                    headerIconColor: 'rgba(255, 255, 255, 0.6)', // Faded white sorting icon
                    headerIconHoverColor: '#ffffff', // Solid white sorting icon on hover
                    headerSortHoverBg: '#132f26', // Slightly darker green on hover
                    headerSortActiveBg: '#102720', // Darker green when actively sorted
                  },
                },
              }}
            >
              <Table
                columns={columns}
                dataSource={filteredData}
                loading={loading}
                pagination={{ pageSize: 5 }}
                rowClassName="align-middle"
                bordered
                scroll={{ x: 'max-content' }}
              />
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
