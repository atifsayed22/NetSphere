// src/pages/RegisterPage.jsx
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiPlusCircle, FiBook, FiBriefcase, FiInfo } from "react-icons/fi";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      skills: [""],
      education: [{ school: "", degree: "", fieldOfStudy: "", startYear: "", endYear: "" }],
      experience: [{ position: "", company: "", duration: "" }],
    },
  });

  const { fields: skillFields, append: addSkill } = useFieldArray({ control, name: "skills" });
  const { fields: eduFields, append: addEdu } = useFieldArray({ control, name: "education" });
  const { fields: expFields, append: addExp } = useFieldArray({ control, name: "experience" });

  const navigate = useNavigate();
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const onSubmit = async (data) => {
    setError("");
    setSuccess("");
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/register`, data);
      if (res.status === 201 || res.data.success) {
        setSuccess("✅ Account created! Redirecting to login...");
        reset();
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError("❌ Something went wrong. Try again.");
      }
    } catch (err) {
      const message = err.response?.data?.message || "❌ Registration failed";
      setError(message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 overflow-y-auto py-10">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center text-white mb-2">
          Create Account ✨
        </h2>
        <p className="text-center text-white/70 mb-6 text-sm">
          Fill in your details to get started
        </p>

        {/* Error/Success */}
        {error && (
          <p className="bg-red-500/20 text-red-300 border border-red-400/30 p-2 rounded-md text-sm text-center mb-4">
            {error}
          </p>
        )}
        {success && (
          <p className="bg-green-500/20 text-green-300 border border-green-400/30 p-2 rounded-md text-sm text-center mb-4">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div className="flex items-center bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
            <FiUser className="mr-3 opacity-70" />
            <input {...register("name")} placeholder="Full Name" className="bg-transparent outline-none w-full placeholder-white/60" required />
          </div>

          {/* Email */}
          <div className="flex items-center bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
            <FiMail className="mr-3 opacity-70" />
            <input {...register("email")} type="email" placeholder="Email" className="bg-transparent outline-none w-full placeholder-white/60" required />
          </div>

          {/* Password */}
          <div className="flex items-center bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
            <FiLock className="mr-3 opacity-70" />
            <input {...register("password")} type="password" placeholder="Password" className="bg-transparent outline-none w-full placeholder-white/60" required />
          </div>

          {/* About */}
          <div className="flex items-start bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
            <FiInfo className="mr-3 opacity-70 mt-1" />
            <textarea {...register("about")} placeholder="About you" className="bg-transparent outline-none w-full placeholder-white/60 resize-none" />
          </div>

          {/* Skills */}
          <div>
            <label className="block font-semibold mb-2 text-white/80">Skills</label>
            {skillFields.map((_, index) => (
              <input key={index} {...register(`skills.${index}`)} placeholder="Skill" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/60 mb-2" />
            ))}
            <button type="button" onClick={() => addSkill("")} className="flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium">
              <FiPlusCircle className="mr-1" /> Add Skill
            </button>
          </div>

          {/* Education */}
          <div>
            <label className="block font-semibold mb-2 text-white/80">Education</label>
            {eduFields.map((_, index) => (
              <div key={index} className="space-y-2 mb-3">
                <input {...register(`education.${index}.school`)} placeholder="School" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/60" />
                <input {...register(`education.${index}.degree`)} placeholder="Degree" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/60" />
                <input {...register(`education.${index}.fieldOfStudy`)} placeholder="Field of Study" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/60" />
                <input {...register(`education.${index}.startYear`)} placeholder="Start Year" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/60" />
                <input {...register(`education.${index}.endYear`)} placeholder="End Year" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/60" />
              </div>
            ))}
            <button type="button" onClick={() => addEdu({})} className="flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium">
              <FiPlusCircle className="mr-1" /> Add Education
            </button>
          </div>

          {/* Experience */}
          <div>
            <label className="block font-semibold mb-2 text-white/80">Experience</label>
            {expFields.map((_, index) => (
              <div key={index} className="space-y-2 mb-3">
                <input {...register(`experience.${index}.position`)} placeholder="Position" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/60" />
                <input {...register(`experience.${index}.company`)} placeholder="Company" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/60" />
                <input {...register(`experience.${index}.duration`)} placeholder="Duration" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/60" />
              </div>
            ))}
            <button type="button" onClick={() => addExp({})} className="flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium">
              <FiPlusCircle className="mr-1" /> Add Experience
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 transition-all text-white font-semibold py-2 rounded-lg shadow-lg"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-white/80 mt-6 text-sm">
          Already have an account?{" "}
          <span
            className="text-yellow-300 font-semibold hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
