

import { useState, useEffect } from "react";

export default function Schedule() {
  const classOptions = ["6th", "7th", "8th", "9th", "10th"];

  const [schedules, setSchedules] = useState([]);
  const [tickets, setTickets] = useState([]);

  const [subject, setSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [classesPerWeek, setClassesPerWeek] = useState("");
  const [filterClass, setFilterClass] = useState("");

  // Load
  useEffect(() => {
    setSchedules(JSON.parse(localStorage.getItem("schedules")) || []);
    setTickets(JSON.parse(localStorage.getItem("tickets")) || []);
  }, []);

  // Save
  useEffect(() => {
    localStorage.setItem("schedules", JSON.stringify(schedules));
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }, [schedules, tickets]);

  const handleAddSchedule = () => {
    if (!subject || !selectedClass || !classesPerWeek) return;

    const newSchedule = {
      subject,
      class: selectedClass,
      classesPerWeek,
    };

    const newTickets = [];
    for (let i = 1; i <= classesPerWeek; i++) {
      newTickets.push({
        id: Date.now() + i,
        class: selectedClass,
        subject,
        ticketNo: i,
      });
    }

    setSchedules([...schedules, newSchedule]);
    setTickets([...tickets, ...newTickets]);

    setSubject("");
    setSelectedClass("");
    setClassesPerWeek("");
  };

  const handleDeleteSchedule = (index) => {
    const removed = schedules[index];

    setSchedules(schedules.filter((_, i) => i !== index));

    setTickets(
      tickets.filter(
        (t) =>
          !(t.class === removed.class && t.subject === removed.subject)
      )
    );
  };

  const filteredSchedules = filterClass
    ? schedules.filter((s) => s.class === filterClass)
    : schedules;

  return (
    <div className="min-h-screen bg-white text-black p-6">

      {/* BACK BUTTON */}
      <button
        onClick={() => window.history.back()}
        className="border-2 border-black px-4 py-1 mb-4 rounded hover:bg-black hover:text-white transition"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6 border-b-2 border-black pb-2">
        Class Scheduler (Ticket System)
      </h1>

      {/* ADD FORM */}
      <div className="border-2 border-black p-4 rounded mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border-2 border-black p-2"
          />

          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border-2 border-black p-2"
          >
            <option value="">Select Class</option>
            {classOptions.map((cls) => (
              <option key={cls}>{cls}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Classes / Week"
            value={classesPerWeek}
            onChange={(e) => setClassesPerWeek(e.target.value)}
            className="border-2 border-black p-2"
          />

          <button
            onClick={handleAddSchedule}
            className="bg-black text-white border-2 border-black"
          >
            Add
          </button>
        </div>
      </div>

      {/* SCHEDULE TABLE */}
      <div className="border-2 border-black p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Schedules</h2>
        <table className="w-full border-2 border-black">
          <thead>
            <tr>
              <th className="border-2 border-black">Class</th>
              <th className="border-2 border-black">Subject</th>
              <th className="border-2 border-black">Per Week</th>
              <th className="border-2 border-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchedules.map((s, i) => (
              <tr key={i}>
                <td className="border-2 border-black text-center">{s.class}</td>
                <td className="border-2 border-black text-center">{s.subject}</td>
                <td className="border-2 border-black text-center">
                  {s.classesPerWeek}
                </td>
                <td className="border-2 border-black text-center">
                  <button
                    onClick={() => handleDeleteSchedule(i)}
                    className="border-2 border-black px-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TICKETS */}
      <div className="border-2 border-black p-4">
        <h2 className="text-xl font-semibold mb-2">Generated Tickets</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {tickets.map((t) => (
            <div
              key={t.id}
              className="border-2 border-black p-3 text-center"
            >
              <p className="font-bold">
                {t.class} - {t.subject}
              </p>
              <p>Ticket #{t.ticketNo}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
