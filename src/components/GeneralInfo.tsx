import { useState } from "react";

interface GeneralInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isEditing: boolean;
}

export default function GeneralInfo() {
  const [generalInfo, setGeneralInfo] = useState<GeneralInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    isEditing: false,
  });

  const handleToggleEdit = () => {
    setGeneralInfo((prev) => ({ ...prev, isEditing: !prev.isEditing }));
  };

  const handleChange = (field: keyof GeneralInfo, value: string) => {
    setGeneralInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {generalInfo.isEditing ? (
        <div className="edit-block">
          <input
            value={generalInfo.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            placeholder="First Name"
          />
          <input
            value={generalInfo.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            placeholder="Last Name"
          />
          <input
            value={generalInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Email"
          />
          <input
            value={generalInfo.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            placeholder="Phone Number"
          />
          <button onClick={handleToggleEdit}>Submit</button>
        </div>
      ) : (
        <div className="preview-block">
          <h3>
            {generalInfo.firstName} {generalInfo.lastName}
          </h3>
          <h3>{generalInfo.email}</h3>
          <h3>{generalInfo.phoneNumber}</h3>
          <button onClick={handleToggleEdit}>Edit</button>
        </div>
      )}
    </>
  );
}
