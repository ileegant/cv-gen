import { useState } from "react";

interface EducationItem {
  id: string;
  schoolName: string;
  titleOfStudy: string;
  dateOfStudy: string;
  isEditing: boolean;
}

export default function Education() {
  const [educations, setEducations] = useState<EducationItem[]>([]);

  const addEducation = () => {
    const newEdu: EducationItem = {
      id: crypto.randomUUID(),
      schoolName: "",
      titleOfStudy: "",
      dateOfStudy: "",
      isEditing: true,
    };
    setEducations([...educations, newEdu]);
  };

  const deleteEducation = (id: string) => {
    setEducations(educations.filter((edu) => edu.id !== id));
  };

  const handleToggleEdit = (id: string) => {
    setEducations((prev) => {
      const current = prev.find((edu) => edu.id === id);

      if (current && current.isEditing) {
        const isEmpty =
          current.schoolName.trim() === "" &&
          current.titleOfStudy.trim() === "" &&
          current.dateOfStudy.trim() === "";

        if (isEmpty) {
          return prev.filter((edu) => edu.id !== id);
        }
      }

      return prev.map((edu) =>
        edu.id === id ? { ...edu, isEditing: !edu.isEditing } : edu
      );
    });
  };

  const handleChange = (
    id: string,
    field: keyof EducationItem,
    value: string | boolean
  ) => {
    setEducations((prev) =>
      prev.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  return (
    <div className="section">
      <h2>Education</h2>

      {educations.map((edu) => (
        <div key={edu.id} className="education-block">
          {edu.isEditing ? (
            <div className="form-grid">
              <input
                placeholder="School Name"
                value={edu.schoolName}
                onChange={(e) =>
                  handleChange(edu.id, "schoolName", e.target.value)
                }
              />
              <input
                placeholder="Title of Study"
                value={edu.titleOfStudy}
                onChange={(e) =>
                  handleChange(edu.id, "titleOfStudy", e.target.value)
                }
              />
              <input
                type="date"
                value={edu.dateOfStudy}
                onChange={(e) =>
                  handleChange(edu.id, "dateOfStudy", e.target.value)
                }
              />
              <div className="button-group">
                <button onClick={() => deleteEducation(edu.id)}>Delete</button>
                <button onClick={() => handleToggleEdit(edu.id)}>Submit</button>
              </div>
            </div>
          ) : (
            <div className="preview-block">
              <h3>{edu.titleOfStudy}</h3>
              <p>{edu.schoolName}</p>
              <p className="date-text">{edu.dateOfStudy}</p>
              <button onClick={() => handleToggleEdit(edu.id)}>Edit</button>
            </div>
          )}
        </div>
      ))}

      <button className="add-btn" onClick={addEducation}>
        + Add Education
      </button>
    </div>
  );
}
