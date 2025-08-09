// src/pages/RegisterPage.jsx
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      skills: [''],
      education: [{ school: '', degree: '', fieldOfStudy: '', startYear: '', endYear: '' }],
      experience: [{ position: '', company: '', duration: '' }],
    }
  });

  const { fields: skillFields, append: addSkill } = useFieldArray({ control, name: 'skills' });
  const { fields: eduFields, append: addEdu } = useFieldArray({ control, name: 'education' });
  const { fields: expFields, append: addExp } = useFieldArray({ control, name: 'experience' });

  const navigate = useNavigate();
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const onSubmit = async (data) => {
    setError('');
    setSuccess('');
    try {
      const res = await axios.post('http://localhost:8080/api/auth/register', data);
      if (res.status === 201 || res.data.success) {
        setSuccess('✅ Account created! Redirecting to login...');
        reset();
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError('❌ Something went wrong. Try again.');
      }
    } catch (err) {
      const message = err.response?.data?.message || '❌ Registration failed';
      setError(message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Create an Account</h2>

      {error && <p className="text-red-600 mb-3 text-center">{error}</p>}
      {success && <p className="text-green-600 mb-3 text-center">{success}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 shadow-md rounded">
        <input {...register("name")} placeholder="Full Name" className="w-full border px-3 py-2 rounded" required />
        <input {...register("email")} type="email" placeholder="Email" className="w-full border px-3 py-2 rounded" required />
        <input {...register("password")} type="password" placeholder="Password" className="w-full border px-3 py-2 rounded" required />
        <textarea {...register("about")} placeholder="About you" className="w-full border px-3 py-2 rounded" />

        {/* Skills */}
        <div>
          <label className="block font-semibold mb-1">Skills</label>
          {skillFields.map((_, index) => (
            <input key={index} {...register(`skills.${index}`)} placeholder="Skill" className="w-full border px-3 py-2 rounded mb-2" />
          ))}
          <button type="button" onClick={() => addSkill('')} className="text-blue-600 hover:underline text-sm">
            + Add Skill
          </button>
        </div>

        {/* Education */}
        <div>
          <label className="block font-semibold mb-1">Education</label>
          {eduFields.map((_, index) => (
            <div key={index} className="grid grid-cols-2 gap-2 mb-3">
              <input {...register(`education.${index}.school`)} placeholder="School" className="border px-3 py-2 rounded" />
              <input {...register(`education.${index}.degree`)} placeholder="Degree" className="border px-3 py-2 rounded" />
              <input {...register(`education.${index}.fieldOfStudy`)} placeholder="Field of Study" className="border px-3 py-2 rounded" />
              <input {...register(`education.${index}.startYear`)} placeholder="Start Year" className="border px-3 py-2 rounded" />
              <input {...register(`education.${index}.endYear`)} placeholder="End Year" className="border px-3 py-2 rounded" />
            </div>
          ))}
          <button type="button" onClick={() => addEdu({})} className="text-blue-600 hover:underline text-sm">
            + Add Education
          </button>
        </div>

        {/* Experience */}
        <div>
          <label className="block font-semibold mb-1">Experience</label>
          {expFields.map((_, index) => (
            <div key={index} className="grid grid-cols-2 gap-2 mb-3">
              <input {...register(`experience.${index}.position`)} placeholder="Position" className="border px-3 py-2 rounded" />
              <input {...register(`experience.${index}.company`)} placeholder="Company" className="border px-3 py-2 rounded" />
              <input {...register(`experience.${index}.duration`)} placeholder="Duration" className="border px-3 py-2 rounded" />
            </div>
          ))}
          <button type="button" onClick={() => addExp({})} className="text-blue-600 hover:underline text-sm">
            + Add Experience
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p className="text-center mt-4 text-sm">
        Already have an account?{' '}
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => navigate('/login')}
        >
          Log in
        </span>
      </p>
    </div>
  );
};

export default RegisterPage;
