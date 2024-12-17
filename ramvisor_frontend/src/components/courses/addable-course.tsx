import React, {useEffect, useMemo, useState} from "react";
import { BookOpen, Clock2, UserCircle2 } from "lucide-react";
import {AddableCourseCard, Course, Section} from "@components/courses/calendar";
import {CloseOutlined, PlusOutlined} from "@ant-design/icons";
import {Button} from "antd";
import styled from "styled-components";
import {AnimatePresence, motion} from "framer-motion";

export type flattenedCourse = {
    id: string;
    name: string;
    color: string;
}

interface CourseProps {
    course: flattenedCourse;
    section: Section;
    handleAddCourse: (course: flattenedCourse, section: Section) => void;
    handleRemoveCourse: (courseId: string, sectionId: string) => void;
    checkCourseAdded: (course: flattenedCourse, section: Section) => boolean;
}


const IconWrapper = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  position: relative;
  margin-left: 89%;
  top: -10%;
`;

export function getRandomLightColor() {
    // Base colors in HSL format [hue, saturation]
    const baseColors = {
        blue: [240, 70],
        green: [120, 60],
        red: [0, 65],
        yellow: [60, 65],
        orange: [30, 65]
    };

    // Get random color from the base colors
    const colors = Object.entries(baseColors);
    const [colorName, [hue, saturation]] = colors[Math.floor(Math.random() * colors.length)];

    // Generate lightness between 70-90% to ensure light colors
    const lightness = Math.floor(Math.random() * 20) + 70;

    // Convert HSL to hex
    const h = hue / 360;
    const s = saturation / 100;
    const l = lightness / 100;

    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    // Convert to hex
    const toHex = (x: number) => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    const colorCode = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    return { color: colorName, hex: colorCode };
}

const AddableCourse: React.FC<CourseProps> = ({ course, section, handleAddCourse, checkCourseAdded, handleRemoveCourse }) => {
    const color = useMemo(() => getRandomLightColor(), [course.id]);
    const isAdded = checkCourseAdded(course, section);
    const [shouldAnimate, setShouldAnimate] = useState(false);

    useEffect(() => {
        setShouldAnimate(false);
    }, [course.id, section.id]);

    const handleClick = () => {
        setShouldAnimate(true);
        if (isAdded) {
            handleRemoveCourse(course.id, section.id);
        } else {
            handleAddCourse(course, section);
        }
    };

    return (
        <AddableCourseCard color={color.hex.toString()}>
            <div style={{ padding: '4px' }}>
                <ButtonWrapper>
                    <Button
                        style={{
                            backgroundColor: isAdded ? 'lightcoral' : 'lightgreen',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        shape="circle"
                        size="small"
                        onClick={handleClick}
                    >
                        <AnimatePresence mode='wait'>
                            {isAdded ? (
                                <IconWrapper
                                    key="close"
                                    initial={shouldAnimate ? { rotate: 0, opacity: 0 } : undefined}
                                    animate={{ rotate: shouldAnimate ? 180 : 0, opacity: 1 }}
                                    exit={shouldAnimate ? { rotate: 360, opacity: 0 } : undefined}
                                    transition={{ duration: 0.3 }}
                                >
                                    <CloseOutlined />
                                </IconWrapper>
                            ) : (
                                <IconWrapper
                                    key="plus"
                                    initial={shouldAnimate ? { rotate: -180, opacity: 0 } : undefined}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={shouldAnimate ? { rotate: 180, opacity: 0 } : undefined}
                                    transition={{ duration: 0.3 }}
                                >
                                    <PlusOutlined />
                                </IconWrapper>
                            )}
                        </AnimatePresence>
                    </Button>
                </ButtonWrapper>
                {/* Course Code */}
                <div style={{
                    marginBottom: '15px',
                    marginTop: '-12%',
                    fontSize: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                }}>
                    <span style={{ fontWeight: '800', }}>{course.id}</span>
                    <span style={{
                        fontWeight: '400',
                        opacity: 0.7
                    }}>
                        - {section.code}
                    </span>
                </div>

                {/* Course Content */}
                <div style={{marginTop: '-10px'}}>
                    {/* Course Name */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '12px',
                        opacity: 0.8
                    }}>
                        <BookOpen size={18} style={{flexShrink: 0}}/>
                        <span style={{
                            fontSize: '11px',
                            fontWeight: '550',
                            lineHeight: '1.2'
                        }}>
                            {course.name}
                        </span>
                    </div>

                    {/* Professor */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '8px'
                    }}>
                        <UserCircle2 size={16} style={{flexShrink: 0}}/>
                        <span style={{
                            fontSize: '14px',
                            opacity: 0.85
                        }}>
                            {section.professor}
                        </span>
                    </div>

                    {/* Schedule */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <Clock2 size={16} style={{flexShrink: 0}}/>
                        <div style={{fontSize: '14px'}}>
                            <span style={{fontWeight: 500}}>{section.day}</span>
                            <span style={{margin: '0 4px', opacity: 0.5}}>|</span>
                            <span>{section.startTime} - {section.endTime}</span>
                        </div>
                    </div>
                </div>
            </div>
        </AddableCourseCard>
    );
};

export default AddableCourse;