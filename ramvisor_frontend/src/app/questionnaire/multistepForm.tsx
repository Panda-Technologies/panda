import React, { useState } from 'react';
import { Select, Button, Input, Upload, Switch } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const { Option } = Select;

// GraphQL mutation to mark the questionnaire as completed
const MARK_QUESTIONNAIRE_COMPLETED = gql`
    mutation MarkQuestionnaireCompleted($userId: ID!) {
        updateUser(id: $userId, input: { questionnaireCompleted: true }) {
            id
            questionnaireCompleted
        }
    }
`;

// Function to mark the questionnaire as completed
const markQuestionnaireAsCompleted = async (userId: string)=> {
    try {
        await client.mutate({
            mutation: MARK_QUESTIONNAIRE_COMPLETED,
            variables: { userId },
        });
        console.log("Questionnaire marked as completed.");
    } catch (error) {
        console.error("Error updating questionnaire status:", error);
        throw new Error("Unable to update questionnaire status.");
    }
}

const MultiStepForm: React.FC = () => {
    const [step, setStep] = useState(1);
    const router = useRouter();

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    // Inline styles with CSSProperties type
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        backgroundColor: '#f0f2f5',
        padding: '20px',
    };

    const formStepStyle = (isActive: boolean): React.CSSProperties => ({
        width: '100%',
        maxWidth: '600px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '30px',
        opacity: isActive ? 1 : 0,
        transform: isActive ? 'translateX(0)' : 'translateX(100%)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        position: 'absolute',
    });

    const nextButtonStyle: React.CSSProperties = {
        display: 'inline-block',
        backgroundColor: '#1890ff',
        color: 'white',
        padding: '10px 20px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        position: 'absolute',
        bottom: '30px',
        right: '30px',
        transition: 'background-color 0.3s ease',
    };

    const previousButtonStyle: React.CSSProperties = {
        ...nextButtonStyle,
        backgroundColor: '#d9d9d9',
        color: 'black',
        left: '30px',
    };

    const inputFieldStyle: React.CSSProperties = {
        marginBottom: '20px',
    };

    const uploadAreaStyle: React.CSSProperties = {
        marginTop: '20px',
    };

    const comparisonTableStyle: React.CSSProperties = {
        marginTop: '20px',
        width: '100%',
        borderCollapse: 'collapse',
    };

    const tableCellStyle: React.CSSProperties = {
        border: '1px solid #d9d9d9',
        padding: '10px',
        textAlign: 'center',
    };

    const premiumStyle: React.CSSProperties = {
        color: '#52c41a',
    };

    const standardStyle: React.CSSProperties = {
        color: '#f5222d',
    };

    // Function to handle form submission and navigate to the dashboard
    const handleSubmit = async () => {
        const userId = "currentUserId"; // Replace with logic to retrieve the current user's ID

        try {
            // Mark the questionnaire as completed in the backend
            await markQuestionnaireAsCompleted(userId);

            // Redirect to the dashboard after form completion
            router.push('/dashboard');
        } catch (error) {
            console.error("Failed to mark questionnaire as completed:", error);
            // Handle error (optional: show an alert or notification to the user)
        }
    };

    return (
        <div style={containerStyle}>
            {/* Step 1: Institution, Majors, Minor */}
            <div style={formStepStyle(step === 1)}>
                <h2>Select Institution and Major</h2>
                <div style={inputFieldStyle}>
                    <Select defaultValue="Select institution" style={{ width: '100%' }}>
                        <Option value="unc">University of North Carolina at Chapel Hill</Option>
                    </Select>
                </div>
                <div style={inputFieldStyle}>
                    <Select
                        mode="multiple"
                        placeholder="Select up to 2 majors"
                        maxTagCount={2}
                        style={{ width: '100%' }}
                    >
                        <Option value="cs">Computer Science</Option>
                        <Option value="biology">Biology</Option>
                    </Select>
                </div>
                <div style={inputFieldStyle}>
                    <Select placeholder="Select a minor" style={{ width: '100%' }}>
                        <Option value="math">Mathematics</Option>
                    </Select>
                </div>
                <Button style={nextButtonStyle} onClick={nextStep}>
                    Next
                </Button>
            </div>

            {/* Step 2: Graduation Semester, GPA, File Upload */}
            <div style={formStepStyle(step === 2)}>
                <h2>Graduation and GPA</h2>
                <div style={inputFieldStyle}>
                    <Select placeholder="Expected Graduation Semester" style={{ width: '100%' }}>
                        <Option value="fall2024">Fall 2024</Option>
                        <Option value="spring2025">Spring 2025</Option>
                    </Select>
                </div>
                <div style={inputFieldStyle}>
                    <Input placeholder="Enter your GPA" />
                </div>
                <div style={uploadAreaStyle}>
                    <Upload>
                        <Button icon={<UploadOutlined />}>Upload Transcript</Button>
                    </Upload>
                </div>
                <Button style={previousButtonStyle} onClick={prevStep}>
                    Previous
                </Button>
                <Button style={nextButtonStyle} onClick={nextStep}>
                    Next
                </Button>
            </div>

            {/* Step 3: Premium Feature Comparison */}
            <div style={formStepStyle(step === 3)}>
                <h2>Are you interested in Panda AI Premium?</h2>
                <div style={inputFieldStyle}>
                    <Switch defaultChecked={false} />
                </div>
                <h3>Comparison of Features</h3>
                <table style={comparisonTableStyle}>
                    <thead>
                    <tr>
                        <th style={tableCellStyle}>Feature</th>
                        <th style={tableCellStyle}>Standard</th>
                        <th style={tableCellStyle}>Premium</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td style={tableCellStyle}>Reports per Month</td>
                        <td style={{ ...tableCellStyle, ...standardStyle }}>5</td>
                        <td style={{ ...tableCellStyle, ...premiumStyle }}>Unlimited</td>
                    </tr>
                    <tr>
                        <td style={tableCellStyle}>AI Insights</td>
                        <td style={{ ...tableCellStyle, ...standardStyle }}>Basic</td>
                        <td style={{ ...tableCellStyle, ...premiumStyle }}>Advanced</td>
                    </tr>
                    <tr>
                        <td style={tableCellStyle}>Support</td>
                        <td style={{ ...tableCellStyle, ...standardStyle }}>Standard</td>
                        <td style={{ ...tableCellStyle, ...premiumStyle }}>Priority</td>
                    </tr>
                    </tbody>
                </table>
                <Button style={previousButtonStyle} onClick={prevStep}>
                    Previous
                </Button>
                <Button style={nextButtonStyle} onClick={handleSubmit}>
                    Done
                </Button>
            </div>
        </div>
    );
};

export default MultiStepForm;
