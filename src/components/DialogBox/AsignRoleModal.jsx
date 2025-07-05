/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from 'react';
import { Modal, Select, Button } from 'antd';


const { Option } = Select;

const ROLE_CHOICES = [
    { value: 1, label: "System Admin" },
    { value: 2, label: "System User" },
    { value: 3, label: "Pending" },
    { value: 4, label: "Accountant" },
    { value: 5, label: "Saccos Accountant" },
    { value: 6, label: "Chairperson" },
    { value: 7, label: "Secretary" }
];

const AssignRoleModal = ({ visible, onOk, onCancel, user, selectedRole, setSelectedRole }) => {
    return (
        <Modal
            title="Sasisha Wadhifa"
            open={visible}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={onOk}>
                    Save
                </Button>
            ]}
        >
            {user && (
                <div>
                    <p>Jina: {user.name}</p>
                    <Select
                        value={selectedRole}
                        onChange={(value) => setSelectedRole(value)}
                        style={{ width: '100%' }}
                    >
                        {ROLE_CHOICES.map(role => (
                            <Option key={role.value} value={role.value}>{role.label}</Option>
                        ))}
                    </Select>
                </div>
            )}
        </Modal>
    );
};

export default AssignRoleModal;
