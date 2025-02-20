import {Input, Popover, Form, Select, TimePicker, InputNumber, Button} from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import {courseFilter} from "@components/courses/calendar";

interface FilterPopoverProps {
    open: boolean;
    onClose: () => void;
    onFilterChange: (filters?: courseFilter) => void; // You can type this more strictly
}

const CourseFilterPopover: React.FC<FilterPopoverProps> = ({
                                                               open,
                                                               onClose,
                                                               onFilterChange
                                                           }) => {
    const [form] = Form.useForm();

    const handleApply = () => {
        const values = form.getFieldsValue(true);
        onFilterChange(values);
        onClose();
    };

    const handleTimeChange = (time: any) => {
        form.setFieldsValue({ time });
    };

    const handleReset = () => {
        form.resetFields();
        onFilterChange(undefined);
    };

    const filterContent = (
        <div>
            <Form
                form={form}
                layout="vertical"
                style={{ width: 250 }}
                onValuesChange={(_, allValues) => {
                }}
            >
                <Form.Item name="dayOfWeek" label="Day">
                    <Select mode={"multiple"} placeholder={"Select multiple options"}>
                        <Select.Option value="Monday">Monday</Select.Option>
                        <Select.Option value="Tuesday">Tuesday</Select.Option>
                        <Select.Option value="Wednesday">Wednesday</Select.Option>
                        <Select.Option value="Thursday">Thursday</Select.Option>
                        <Select.Option value="Friday">Friday</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item name="time" label="Time">
                    <TimePicker.RangePicker
                        use12Hours
                        format="hh:mm A"
                        onChange={(time) => {
                            const formattedTime = {
                                startTime: time?.[0]?.format('HH:mm') || '',
                                endTime: time?.[1]?.format('HH:mm') || ''
                            };
                            form.setFieldsValue(formattedTime);
                        }}
                        onOk={handleTimeChange}
                    />
                </Form.Item>

                <Form.Item name="rating" label="Minimum Professor Rating">
                    <InputNumber min={1} max={5} step={0.5} />
                </Form.Item>

                <Form.Item name="credits" label="Credits">
                    <Select>
                        <Select.Option value={1}>1</Select.Option>
                        <Select.Option value={3}>3</Select.Option>
                        <Select.Option value={4}>4</Select.Option>
                    </Select>
                </Form.Item>
            </Form>

            <div style={{
                borderTop: '1px solid #f0f0f0',
                padding: '8px 0 0',
                marginTop: '8px',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '8px'
            }}>
                <Button size="small" onClick={handleReset}>
                    Reset
                </Button>
                <Button size="small" type="primary" onClick={handleApply}>
                    Apply
                </Button>
            </div>
        </div>
    );

    return (
        <Popover
            open={open}
            content={filterContent}
            destroyTooltipOnHide={false}
            title="Filter Courses"
            trigger="click"
            placement="bottomRight"
            onOpenChange={(visible) => {
                if (!visible) {
                    onClose();
                }
            }}
        >
            <div />
        </Popover>



    );
};

export default CourseFilterPopover;