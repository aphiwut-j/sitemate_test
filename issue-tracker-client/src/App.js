import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/issues'; // Ensure this URL is correct

function App() {
    const [issues, setIssues] = useState([]);
    const [newIssue, setNewIssue] = useState({ title: '', description: '' });
    const [selectedIssue, setSelectedIssue] = useState(null);

    useEffect(() => {
        fetchIssues();
    }, []);

    const fetchIssues = async () => {
        try {
            const response = await axios.get(API_URL);
            console.log('Fetched issues:', response.data); // Debug log
            setIssues(response.data);
        } catch (error) {
            console.error('There was an error fetching the issues!', error);
        }
    };

    const createIssue = async () => {
        try {
            const response = await axios.post(API_URL, newIssue);
            console.log('Created issue:', response.data); // Debug log
            fetchIssues(); // Fetch the updated issues list
            setNewIssue({ title: '', description: '' }); // Clear the input fields
        } catch (error) {
            console.error('There was an error creating the issue!', error);
        }
    };

    const updateIssue = async (id, updatedIssue) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedIssue);
            console.log('Updated issue:', response.data); // Debug log
            fetchIssues(); // Fetch the updated issues list
        } catch (error) {
            console.error('There was an error updating the issue!', error);
        }
    };

    const deleteIssue = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            console.log('Deleted issue with id:', id); // Debug log
            fetchIssues(); // Fetch the updated issues list
        } catch (error) {
            console.error('There was an error deleting the issue!', error);
        }
    };

    const handleTitleChange = (id, value) => {
        setIssues(prevIssues =>
            prevIssues.map(issue =>
                issue.id === id ? { ...issue, title: value } : issue
            )
        );
    };

    const handleDescriptionChange = (id, value) => {
        setIssues(prevIssues =>
            prevIssues.map(issue =>
                issue.id === id ? { ...issue, description: value } : issue
            )
        );
    };

    const handleReadClick = (id) => {
        setSelectedIssue(id);
    };

    return (
        <div className="App">
            <h1>Issue Tracker</h1>
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    value={newIssue.title}
                    onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newIssue.description}
                    onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                />
                <button onClick={createIssue}>Create Issue</button>
            </div>
            <ul>
                {issues.map(issue => (
                    <li key={issue.id}>
                        <h2>{issue.title}</h2>
                        {selectedIssue === issue.id ? (
                            <p>{issue.description}</p>
                        ) : null}
                        <button onClick={() => handleReadClick(issue.id)}>Read</button>
                        <input
                            type="text"
                            placeholder="New Title"
                            value={issue.title}
                            onChange={(e) => handleTitleChange(issue.id, e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="New Description"
                            value={issue.description}
                            onChange={(e) => handleDescriptionChange(issue.id, e.target.value)}
                        />
                        <button onClick={() => updateIssue(issue.id, issue)}>Update</button>
                        <button onClick={() => deleteIssue(issue.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
