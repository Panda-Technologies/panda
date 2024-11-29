"use client";

import React, { useState, useCallback } from 'react';
import { Select, Button, Input, Upload, Switch } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useUpdate } from "@refinedev/core";
import { MARK_QUESTIONNAIRE_COMPLETED } from "@graphql/mutations";

const { Option } = Select;

const Page: React.FC = () => {
    const [step, setStep] = useState(1);
    const router = useRouter();

    const { mutate: questionnaireCompleted } = useUpdate();

    const nextStep = useCallback(() => {
        console.log("Next button clicked");
        setStep((prevStep) => prevStep + 1);
    }, []);

    const prevStep = useCallback(() => {
        console.log("Previous button clicked");
        setStep((prevStep) => prevStep - 1);
    }, []);

    const handleSubmit = async (): Promise<void> => {
        console.log("Submit button clicked.");
        const userId = "currentUserId"; // Replace with logic to retrieve the current user's ID

        try {
            await markQuestionnaireAsCompleted(userId);
            console.log("Navigating to dashboard...");
            router.push('/');
        } catch (error) {
            console.error("Failed to mark questionnaire as completed:", error);
        }
    };

    const markQuestionnaireAsCompleted = async (userId: string) => {
        console.log("Marking questionnaire as completed...");
        try {
            await questionnaireCompleted({
                resource: 'user',
                id: userId,
                values: { userId, questionnaireCompleted: true },
                meta: { gqlQuery: MARK_QUESTIONNAIRE_COMPLETED },
            });
            console.log("Questionnaire marked successfully.");
        } catch (error) {
            console.error("Error updating questionnaire status:", error);
            throw new Error("Unable to update questionnaire status.");
        }
    };

    const progress = step === 1 ? 0 : step === 2 ? 33 : step === 3 ? 66 : 100;

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#ffffff',
        padding: '20px',
    };

    const progressBarContainerStyle: React.CSSProperties = {
        width: '100%',
        maxWidth: '800px',
        marginBottom: '20px',
        textAlign: 'center',
    };

    const progressBarStyle: React.CSSProperties = {
        width: '100%',
        height: '4px',
        backgroundColor: '#333333',
        borderRadius: '2px',
        overflow: 'hidden',
    };

    const progressFillStyle: React.CSSProperties = {
        width: `${progress}%`,
        height: '100%',
        backgroundColor: '#22c55e',
        transition: 'width 0.5s ease-in-out',
    };

    const formStepStyle = (isActive: boolean): React.CSSProperties => ({
        display: isActive ? 'block' : 'none',
        width: '100%',
        maxWidth: '800px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        padding: '60px', // Expanded the question box
        marginTop: '20px',
        border: '2px solid #22c55e', // Green outline for the question box
        position: 'relative',
    });

    const buttonContainerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'flex-end', // Align buttons to the bottom right
        position: 'absolute',
        bottom: '10px', // Move buttons further down
        right: '20px',
        gap: '10px', // Add space between the buttons
    };

    const buttonBaseStyle: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        padding: '10px 24px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        fontWeight: '500',
        width: '120px',
        textAlign: 'center',
    };

    const nextButtonStyle: React.CSSProperties = {
        ...buttonBaseStyle,
        backgroundColor: '#22c55e',
    };

    const previousButtonStyle: React.CSSProperties = {
        ...buttonBaseStyle,
        backgroundColor: '#333333',
    };

    const [selectedPlan, setSelectedPlan] = useState("standard");

    return (
        <div style={containerStyle}>
            <div style={progressBarContainerStyle}>
                <div style={progressBarStyle}>
                    <div style={progressFillStyle}/>
                </div>
                <div style={{marginTop: '8px', fontSize: '14px', color: '#333333'}}>
                    Progress: {Math.round(progress)}%
                </div>
            </div>

            <div style={formStepStyle(step === 1)}>
                <h2>Select Institution and Major</h2>
                <Select defaultValue="Select institution" style={{width: '100%'}}>
                    <Option value="unc">University of North Carolina at Chapel Hill</Option>
                </Select>
                <Select
                    mode="multiple"
                    placeholder="Select up to 2 majors"
                    maxTagCount={2}
                    style={{width: '100%', marginTop: '16px'}}
                >
                    <Option value="cs">Computer Science</Option>
                    <Option value="biology">Biology</Option>
                </Select>
                <Select placeholder="Select a minor" style={{width: '100%', marginTop: '16px'}}>
                    <Option value="math">Mathematics</Option>
                </Select>
                <div style={buttonContainerStyle}>
                    <Button style={nextButtonStyle} onClick={nextStep}>Next</Button>
                </div>
            </div>

            <div style={formStepStyle(step === 2)}>
                <h2>Graduation and GPA</h2>
                <Select placeholder="Expected Graduation Semester" style={{width: '100%'}}>
                    <Option value="fall2024">Fall 2024</Option>
                    <Option value="spring2025">Spring 2025</Option>
                </Select>
                <Input placeholder="Enter your GPA" style={{width: '100%', marginTop: '16px'}}/>
                <Upload style={{marginTop: '32px'}}> {/* Adjusted spacing */}
                    <Button icon={<UploadOutlined/>}>Upload Transcript</Button>
                </Upload>
                <div style={buttonContainerStyle}>
                    <Button style={previousButtonStyle} onClick={prevStep}>Previous</Button>
                    <Button style={nextButtonStyle} onClick={nextStep}>Next</Button>
                </div>
            </div>


            <div style={formStepStyle(step === 3)}>
                <h2 style={{
                    textAlign: 'center',
                    color: '#000000',
                    marginBottom: '16px',
                    marginTop: '-30px'
                }}> {/* Adjusted spacing */}
                    Choose The Plan for You
                </h2>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '24px',
                    marginTop: '8px'
                }}> {/* Adjusted spacing */}
                    {/* Standard Plan Card */}
                    <div
                        onClick={() => setSelectedPlan("standard")}
                        style={{
                            border: selectedPlan === "standard" ? '2px solid #22c55e' : '1px solid #d1d5db',
                            borderRadius: '12px',
                            padding: '24px',
                            width: '300px',
                            textAlign: 'left',
                            backgroundColor: '#f9fafb',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer',
                        }}
                    >
                        <h3 style={{
                            color: '#111827',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            marginBottom: '16px',
                            textAlign: 'center'
                        }}>
                            Standard Plan
                        </h3>
                        <ul style={{paddingLeft: '20px', color: '#4b5563', fontSize: '16px', marginBottom: '16px'}}>
                            <li>5 Reports per Month</li>
                            <li>Basic AI Insights</li>
                            <li>Standard Support</li>
                        </ul>
                        <p style={{
                            color: '#111827',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginBottom: '8px'
                        }}>
                            Free
                        </p>
                    </div>

                    {/* Premium Plan Card */}
                    <div
                        onClick={() => setSelectedPlan("premium")}
                        style={{
                            border: selectedPlan === "premium" ? '2px solid #22c55e' : '1px solid #d1d5db',
                            borderRadius: '12px',
                            padding: '24px',
                            width: '300px',
                            textAlign: 'left',
                            backgroundColor: '#ffffff',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            cursor: 'pointer',
                        }}
                    >
                        <h3 style={{
                            color: '#22c55e',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            marginBottom: '16px',
                            textAlign: 'center'
                        }}>
                            Premium Plan
                        </h3>
                        <ul style={{paddingLeft: '20px', color: '#4b5563', fontSize: '16px', marginBottom: '16px'}}>
                            <li>Unlimited Reports</li>
                            <li>Advanced AI Insights</li>
                            <li>Priority Support</li>
                        </ul>
                        <p style={{
                            color: '#111827',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginBottom: '8px'
                        }}>
                            $9.99/month
                        </p>
                    </div>
                </div>
                <div style={buttonContainerStyle}>
                    <Button style={previousButtonStyle} onClick={prevStep}>
                        Previous
                    </Button>
                    <Button style={nextButtonStyle} onClick={handleSubmit}
                            disabled={!selectedPlan}> {/* Disabled until a plan is selected */}
                        Done
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default Page;
