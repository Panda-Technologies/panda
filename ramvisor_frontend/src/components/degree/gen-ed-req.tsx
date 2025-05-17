// import React, { useState, useEffect } from 'react';
// import { Book, Brain, Globe, Calculator, Lightbulb, Microscope, User, PenTool, Smile, Rocket, Database, Languages } from 'lucide-react';
//
// // Types
// interface Course {
//   id: string;
//   name: string;
//   credits: number;
// }
//
// interface Requirement {
//   id: string;
//   name: string;
//   courses: string[];
//   completed: number;
//   required: number;
//   isElective?: boolean;
//   icon?: React.ElementType;
// }
//
// interface CollapsibleRequirement {
//   id: string;
//   name: string;
//   isCollapsible: true;
//   subRequirements: Requirement[];
// }
//
// interface GenEdRequirements {
//   [key: string]: {
//     name: string;
//     icon: React.ElementType;
//     color: string;
//     requirements: (Requirement | CollapsibleRequirement)[];
//   };
// }
//
// interface Semester {
//   id: string;
//   name: string;
//   courses: Course[];
//   credits: number;
// }
//
// interface ApCredits {
//   calculus: boolean;
//   statistics: boolean;
//   microeconomics: boolean;
//   macroeconomics: boolean;
// }
//
// interface GenEdRequirementsProps {
//   semesters: Semester[];
//   handleFindCourses: (requirement: any) => void;
//   preloadedCourses: Course[];
//   apCredits: ApCredits;
//   genEdCourses: {
//     firstYearFoundations: { [key: string]: Course[] };
//     focusCapacities: { [key: string]: Course[] };
//     empiricalInvestigativeLab: Course[];
//     reflectionAndIntegration: { [key: string]: Course[] };
//   };
// }
//
// const genEdRequirements.ts: GenEdRequirements = {
//   firstYearFoundations: {
//     name: 'First Year Foundations',
//     icon: Book,
//     color: 'blue',
//     requirements: [
//       { id: 'writing', name: 'Writing At the Research University', icon: PenTool, courses: ['ENGL105', 'ENGL105i', 'ENGL105H'], completed: 0, required: 1 },
//       { id: 'collegeThriving', name: 'College Thriving', icon: Smile, courses: ['IDST101', 'IDST101i', 'IDST101H'], completed: 0, required: 1 },
//       { id: 'firstYearSeminar', name: 'First Year Seminar or Launch', icon: Rocket, courses: ['COMM88','HIST53', 'COMP50', 'DRAM79', 'ECON54', 'PSYC62'], completed: 0, required: 1 },
//       { id: 'tripleI', name: 'Triple I: Ideas, Information & Inquiry', icon: Brain, courses: ['IDST111', 'IDST112', 'IDST113', 'IDST114', 'IDST115','IDST12'], completed: 0, required: 1 },
//       { id: 'dataLiteracy', name: 'Data Literacy', icon: Database, courses: ['IDST111L', 'IDST112L', 'IDST113L', 'IDST114L', 'IDST115L','IDST126L'], completed: 0, required: 1 },
//       { id: 'globalLanguage', name: 'Global Language Level 3 or Higher', icon: Languages, courses: ['SPAN203', 'FREN203', 'CHIN203', 'GERM203', 'JAPN203'], completed: 0, required: 1 },
//     ]
//   },
//   // ... (include other categories like focusCapacities, empiricalInvestigativeLab, reflectionAndIntegration)
// };
//
// const GenEdRequirementsComponent: React.FC<GenEdRequirementsProps> = ({
//   semesters,
//   handleFindCourses,
//   preloadedCourses,
//   apCredits,
//   genEdCourses
// }) => {
//   const [expandedCategories, setExpandedCategories] = useState<{[key: string]: boolean}>({});
//   const [satisfiedRequirements, setSatisfiedRequirements] = useState<{[key: string]: boolean}>({});
//   const [takenCourses, setTakenCourses] = useState<string[]>([]);
//
//   const flattenGenEdCourses = (genEdCourses: { [key: string]: { [key: string]: Course[] } }) => {
//     const flattened: {[key: string]: Course[]} = {};
//     Object.entries(genEdCourses).forEach(([category, subcategories]) => {
//       if (Array.isArray(subcategories)) {
//         flattened[category] = subcategories;
//       } else {
//         Object.entries(subcategories).forEach(([subcategory, courses]) => {
//           flattened[subcategory] = courses;
//         });
//       }
//     });
//     return flattened;
//   };
//
//   const flattenedGenEdCourses = flattenGenEdCourses(genEdCourses);
//
//   const updateSatisfiedRequirements = () => {
//     const newSatisfiedRequirements: {[key: string]: boolean} = {};
//     Object.entries(genEdRequirements.ts).forEach(([category, { requirements }]) => {
//       requirements.forEach(req => {
//         if ('isCollapsible' in req) {
//           req.subRequirements.forEach(subReq => {
//             newSatisfiedRequirements[subReq.id] = isRequirementSatisfied(subReq);
//           });
//         } else {
//           newSatisfiedRequirements[req.id] = isRequirementSatisfied(req);
//         }
//       });
//     });
//     setSatisfiedRequirements(newSatisfiedRequirements);
//   };
//
//   const updateTakenCourses = () => {
//     const allTakenCourses = [
//       ...semesters.flatMap(semester => semester.courses.map(course => course.id)),
//       ...preloadedCourses.map(course => course.id)
//     ];
//     setTakenCourses(allTakenCourses);
//   };
//
//   useEffect(() => {
//     updateSatisfiedRequirements();
//     updateTakenCourses();
//   }, [semesters, preloadedCourses, apCredits]);
//
//   const isRequirementSatisfied = (requirement: Requirement) => {
//     return requirement.courses.some(courseId => takenCourses.includes(courseId));
//   };
//
//   const toggleCategory = (category: string) => {
//     setExpandedCategories(prev => ({
//       ...prev,
//       [category]: !prev[category]
//     }));
//   };
//
//   const getColorStyle = (color: string, isMain = false): React.CSSProperties => {
//     const baseColors: {[key: string]: {bg: string, text: string}} = {
//       blue: { bg: '#3B82F6', text: '#EFF6FF' },
//       green: { bg: '#10B981', text: '#ECFDF5' },
//       purple: { bg: '#8B5CF6', text: '#F3E8FF' },
//       orange: { bg: '#F59E0B', text: '#FFF7ED' },
//     };
//
//     const lightColors: {[key: string]: {bg: string, text: string}} = {
//       blue: { bg: '#BFDBFE', text: '#1E40AF' },
//       green: { bg: '#A7F3D0', text: '#065F46' },
//       purple: { bg: '#DDD6FE', text: '#5B21B6' },
//       orange: { bg: '#FED7AA', text: '#9A3412' },
//     };
//
//     const colorSet = isMain ? baseColors[color] : lightColors[color];
//     return {
//       backgroundColor: colorSet.bg,
//       color: colorSet.text,
//     };
//   };
//
//   const renderRequirement = (req: Requirement, categoryColor: string) => {
//     const isSatisfied = satisfiedRequirements[req.id];
//     const style: React.CSSProperties = {
//       display: 'flex',
//       alignItems: 'center',
//       padding: '0.5rem',
//       marginBottom: '0.5rem',
//       borderRadius: '0.25rem',
//       cursor: 'pointer',
//       opacity: isSatisfied ? 0.5 : 1,
//       ...getColorStyle(categoryColor),
//     };
//
//     return (
//       <div
//         key={req.id}
//         style={style}
//         onClick={() => handleRequirementClick(req)}
//       >
//         {req.icon && <req.icon style={{ marginRight: '0.5rem' }} size={16} />}
//         <span style={{ fontSize: '0.875rem' }}>{req.name}</span>
//         {isSatisfied && <span style={{ marginLeft: 'auto' }}>✓</span>}
//       </div>
//     );
//   };
//
//   const handleRequirementClick = (requirement: Requirement) => {
//     const availableCourses = flattenedGenEdCourses[requirement.id] || [];
//
//     const takenCoursesForRequirement = availableCourses.filter(
//       course => takenCourses.includes(course.id)
//     );
//
//     handleFindCourses({
//       ...requirement,
//       availableCourses: availableCourses.filter(course => !takenCourses.includes(course.id)),
//       takenCourses: takenCoursesForRequirement
//     });
//   };
//
//   const renderRequirementCategory = (category: string, { name, icon: Icon, color, requirements }: GenEdRequirements[string]) => {
//     const satisfiedCount = requirements.filter(req =>
//       'isCollapsible' in req
//         ? req.subRequirements.every(subReq => satisfiedRequirements[subReq.id])
//         : satisfiedRequirements[req.id]
//     ).length;
//     const progress = (satisfiedCount / requirements.length) * 100;
//
//     const categoryStyle: React.CSSProperties = {
//       marginBottom: '1rem',
//     };
//
//     const headerStyle: React.CSSProperties = {
//       display: 'flex',
//       alignItems: 'center',
//       cursor: 'pointer',
//       padding: '0.5rem',
//       borderRadius: '0.25rem',
//       ...getColorStyle(color, true),
//     };
//
//     const progressBarStyle: React.CSSProperties = {
//       width: '100%',
//       backgroundColor: '#D1D5DB',
//       borderRadius: '9999px',
//       height: '0.625rem',
//       marginTop: '0.5rem',
//     };
//
//     const progressStyle: React.CSSProperties = {
//       width: `${progress}%`,
//       height: '0.625rem',
//       borderRadius: '9999px',
//       transition: 'width 0.3s ease-in-out',
//       ...getColorStyle(color, true),
//     };
//
//     return (
//       <div key={category} style={categoryStyle}>
//         <div
//           style={headerStyle}
//           onClick={() => toggleCategory(category)}
//         >
//           <Icon style={{ marginRight: '0.5rem' }} size={20} />
//           <h3 style={{ fontWeight: 600 }}>
//             {name} ({satisfiedCount}/{requirements.length})
//           </h3>
//           <span style={{ marginLeft: 'auto' }}>{expandedCategories[category] ? '▲' : '▼'}</span>
//         </div>
//         <div style={progressBarStyle}>
//           <div style={progressStyle}></div>
//         </div>
//         {expandedCategories[category] && (
//           <div style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }}>
//             {requirements.map(req =>
//               'isCollapsible' in req
//                 ? req.subRequirements.map(subReq => renderRequirement(subReq, color))
//                 : renderRequirement(req, color)
//             )}
//           </div>
//         )}
//       </div>
//     );
//   };
//
//   return (
//     <div>
//       <h2 style={{
//         fontSize: '1.25rem',
//         fontWeight: 'bold',
//         marginBottom: '1rem',
//         color: '#111827',
//       }}>
//         Gen-Ed Requirements
//       </h2>
//       {Object.entries(genEdRequirements.ts).map(([category, data]) =>
//         renderRequirementCategory(category, data)
//       )}
//     </div>
//   );
// };
//
// export default GenEdRequirementsComponent;