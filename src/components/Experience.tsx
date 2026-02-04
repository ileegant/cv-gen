import { useState } from "react";

interface ExperienceItem {
  id: string;
  companyName: string;
  positionTitle: string;
  responsibilities: string;
  fromDate: string;
  untilDate: string;
  isEditing: boolean;
}

export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);

  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: crypto.randomUUID(),
      companyName: "",
      positionTitle: "",
      responsibilities: "",
      fromDate: "",
      untilDate: "",
      isEditing: true,
    };
    setExperiences([...experiences, newExp]);
  };

  const deleteExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const handleToggleEdit = (id: string) => {
    setExperiences((prevExperiences) => {
      const currentExp = prevExperiences.find((exp) => exp.id === id);

      if (currentExp && currentExp.isEditing) {
        const isEmpty =
          currentExp.companyName.trim() === "" &&
          currentExp.positionTitle.trim() === "" &&
          currentExp.responsibilities.trim() === "" &&
          currentExp.fromDate.trim() === "" &&
          currentExp.untilDate.trim() === "";

        if (isEmpty) {
          return prevExperiences.filter((exp) => exp.id !== id);
        }
      }

      return prevExperiences.map((exp) =>
        exp.id === id ? { ...exp, isEditing: !exp.isEditing } : exp
      );
    });
  };

  const handleChange = (
    id: string,
    field: keyof ExperienceItem,
    value: string
  ) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  return (
    <div className="section">
      <h2>Practical Experience</h2>

      {experiences.map((exp) => (
        <div key={exp.id} className="experience-block">
          {exp.isEditing ? (
            <div className="form-grid">
              <input
                placeholder="Company Name"
                value={exp.companyName}
                onChange={(e) =>
                  handleChange(exp.id, "companyName", e.target.value)
                }
              />
              <input
                placeholder="Position Title"
                value={exp.positionTitle}
                onChange={(e) =>
                  handleChange(exp.id, "positionTitle", e.target.value)
                }
              />
              <textarea
                placeholder="Main Responsibilities"
                value={exp.responsibilities}
                onChange={(e) =>
                  handleChange(exp.id, "responsibilities", e.target.value)
                }
              />
              <div className="dates">
                <input
                  type="date"
                  value={exp.fromDate}
                  onChange={(e) =>
                    handleChange(exp.id, "fromDate", e.target.value)
                  }
                />
                <input
                  type="date"
                  value={exp.untilDate}
                  onChange={(e) =>
                    handleChange(exp.id, "untilDate", e.target.value)
                  }
                />
              </div>
              <button onClick={() => deleteExperience(exp.id)}>Delete</button>
              <button onClick={() => handleToggleEdit(exp.id)}>Submit</button>
            </div>
          ) : (
            <div className="preview-block">
              <h3>
                {exp.positionTitle} at {exp.companyName}
              </h3>
              <p className="date-text">
                {exp.fromDate} — {exp.untilDate}
              </p>
              <p>{exp.responsibilities}</p>
              <button onClick={() => handleToggleEdit(exp.id)}>Edit</button>
            </div>
          )}
        </div>
      ))}

      <button className="add-btn" onClick={addExperience}>
        + Add Experience
      </button>
    </div>
  );
}
