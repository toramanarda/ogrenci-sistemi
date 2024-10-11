"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://nxyataiykdhykwyzdfpj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54eWF0YWl5a2RoeWt3eXpkZnBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc4MDI1MjIsImV4cCI6MjA0MzM3ODUyMn0.r5vHcZWiClscslJLBs41tXNJnV_cUvIwodcR3EggaDk";
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({ first_name: '', last_name: '', not1: '', not2: '', not3: '' });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('students').select('*');
      if (error) console.error('Error fetching data:', error);
      else setData(data);
    };

    fetchData();
  }, []);

  const save = async () => {
    const { data: updatedData, error } = await supabase.from('students').select('*');
    if (error) console.error('Error fetching data:', error);
    else setData(updatedData);
  };

  const addNewStudent = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('students').insert([newStudent]);
    if (error) console.error('Error inserting data:', error);
    else {
      setNewStudent({ first_name: '', last_name: '', not1: '', not2: '', not3: '' });
      closeModal();
      save();
    }
  };

  const updateRecord = async (record) => {
    const { error } = await supabase.from('students').update(record).eq('id', record.id);
    if (error) console.error('Error updating data:', error);
    else save();
  };


  const deleteRecord = async (id) => {
    if (!confirm('Emin misiniz?')) return;
    const { error } = await supabase.from('students').delete().eq('id', id);
    if (error) console.error('Error deleting data:', error);
    else save();
  };


  const handleNewStudentChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  return (
    <div className='container'>
      <h1>Öğrenci Bilgi Sistemi <button onClick={openModal}>yeni</button></h1>
      <div className="studentTable">
        <ul className="studentTableTitles">
          <li>Ad</li>
          <li>Soyad</li>
          <li>Not 1</li>
          <li>Not 2</li>
          <li>Not 3</li>
          <li>Ortalama</li>
          <li>#</li>
        </ul>
        {data.map(student => (
          <StudentRow key={student.id} {...student} updateRecord={updateRecord} deleteRecord={deleteRecord} />
        ))}
      </div>
      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Yeni Öğrenci Ekle</h2>
            <form className="addStudent" onSubmit={addNewStudent}>
              <input type="text" required name='first_name' placeholder="Ad" onChange={handleNewStudentChange} />
              <input type="text" required name='last_name' placeholder="Soyad" onChange={handleNewStudentChange} />
              <input type="number" required name='not1' placeholder="Not 1" onChange={handleNewStudentChange} />
              <input type="number" required name='not2' placeholder="Not 2" onChange={handleNewStudentChange} />
              <input type="number" required name='not3' placeholder="Not 3" onChange={handleNewStudentChange} />
              <button type='submit'>Ekle</button>
              <button type='button' onClick={closeModal}>Kapat</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
  function StudentRow({ id, first_name, last_name, not1, not2, not3, updateRecord, deleteRecord }) {
    const [isEditing, setEditing] = useState(false);

    const calculateAverage = () => {
      const n1 = parseFloat(not1) || 0;
      const n2 = parseFloat(not2) || 0;
      const n3 = parseFloat(not3) || 0;
      return ((n1 + n2 + n3) / 3).toFixed(2); // Ortalama hesaplama ve iki ondalık
    };

    function handleSubmit(e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formObj = Object.fromEntries(formData);
      formObj.id = id;
      updateRecord(formObj);
      setEditing(false);
    }
    return (
      <form className="tableForm" onSubmit={handleSubmit} onDoubleClick={() => setEditing(true)}>
        {isEditing ? (
          <>
            <div className="studentTableCol">
              <input type="text" required name='first_name' defaultValue={first_name} />
            </div>
            <div className="studentTableCol">
              <input type="text" required name='last_name' defaultValue={last_name} />
            </div>
            <div className="studentTableCol">
              <input type="number" required name='not1' defaultValue={not1} />
            </div>
            <div className="studentTableCol">
              <input type="number" required name='not2' defaultValue={not2} />
            </div>
            <div className="studentTableCol">
              <input type="number" required name='not3' defaultValue={not3} />
            </div>
            <div className="studentTableCol">
              <span>{calculateAverage()}</span>
            </div>
            <div className="studentTableCol">
              <button type='button' onClick={() => setEditing(false)}>Vazgeç</button>
              <button className='saveBtn' type='submit'>Kaydet</button>
            </div>
          </>
        ) : (
          <>
            <div className="studentTableCol">{first_name}</div>
            <div className="studentTableCol">{last_name}</div>
            <div className="studentTableCol">{not1}</div>
            <div className="studentTableCol">{not2}</div>
            <div className="studentTableCol">{not3}</div>
            <div className="studentTableCol">{calculateAverage()}</div>
            <div className="studentTableCol">
              <button type='button' onClick={() => setEditing(true)}>Düzenle</button>
              <button className='delBtn' type='button' onClick={() => deleteRecord(id)}>Sil</button>
            </div>
          </>
        )}
      </form>
    );
  }
}

export default App;